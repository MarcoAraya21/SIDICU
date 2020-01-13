import React, { Component } from 'react'
import Edit from './edit';
import Panel from '../../../../utiles/Panel'

export default class showcompetencias extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editandocompetencias: false
        }

        this.habilitareditcompetencias = this.habilitareditcompetencias.bind(this);

    }

    habilitareditcompetencias(estado){
        this.setState({editandocompetencias: estado});
    }

    addElemento(variable){
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
            ,
            body: JSON.stringify(
                {competencia_id:  this.props.competencia.id}
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
         .then( data => this.props.handleAddElement(variable, data));
         
        
    }
    
    render() {
        return (
            !this.props.competencia_generica
            ?
                <Panel key = {'competencia-' + this.props.competencia.id} titulo={this.props.competencia.descripcion} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandocompetencias)}>
                {
                    this.props.competencia.nivel_competencias && this.props.competencia.nivel_competencias.length > 0 ?
                    this.props.competencia.nivel_competencias.map((nivel_competencia,i) =>
                        <Edit key={nivel_competencia.id}
                        nivel_competencia = {nivel_competencia}
                        asignaturas={this.props.asignaturas}
                        i={i}
                        handleInputArrays = {this.props.handleInputArrays}
                        borrarElemento = {this.props.borrarElemento}
                        handleAddElement = {this.props.handleAddElement}
                        habilitarGeneral = {this.props.habilitarGeneral}
                        habilitadogeneral = {this.props.habilitadogeneral}
                        habilitareditcompetencias = {this.habilitareditcompetencias}
                        addNotification = {this.props.addNotification}/>
                        )
                    :
                    <p>No posee ningun nivel de competencia</p>
                }
                </Panel>
                
            :
                <Panel key = {'competencia-generica-' + this.props.competencia_generica.id} titulo={this.props.competencia_generica.sigla + ": " + this.props.competencia_generica.descripcion} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandocompetencias)}>
                {
                    this.props.competencia_generica.nivel_competencias.map((nivel_competencia_generica,i) =>
                        <Edit key={nivel_competencia_generica.id}
                        nivel_competencia_generica = {nivel_competencia_generica}
                        asignaturas={this.props.asignaturas}
                        i={i}
                        handleInputArrays = {this.props.handleInputArrays}
                        borrarElemento = {this.props.borrarElemento}
                        handleAddElement = {this.props.handleAddElement}
                        habilitarGeneral = {this.props.habilitarGeneral}
                        habilitadogeneral = {this.props.habilitadogeneral}
                        habilitareditcompetencias = {this.habilitareditcompetencias}
                        addNotification = {this.props.addNotification}/>
                    )
                }
                </Panel>
        );
    }
}