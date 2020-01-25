import React, { Component } from 'react'
import ShowNivel from './shownivel'

export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
        // this.addElemento = this.addElemento.bind(this);

    }

    // addElemento(variable){
    //     //e.preventDefault();
    //     fetch(`/api/${variable}/`, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type':'application/json'
    //         }
    //         ,
    //         body: JSON.stringify(
    //             {plan_estudio_id:  this.props.id,
    //             tipo_dominio_id: 1}
    //         )
    //     })
    //     .then(function(response) {
    //         if(response.ok) {
    //             return response.json();
    //         } else {
    //             throw "Error en la llamada Ajax";
    //         }
         
    //      })
    //     .then(data => {[this.props.handleAddElement(variable, data),this.props.addNotification()]} )
    //     .catch(function(error) {
    //         console.log('Hubo un problema con la petición Fetch:' + error.message);
    //     })
         
        
    // }
    

    
    render() {
        return (
            <div className="container py-4">
                <div className="col-12">
                    <legend>Diseño del Plan de Estudios</legend>
                    {
                        this.props.niveles.map((nivelAsignatura, i) =>
                            <ShowNivel
                                key={i}
                                i={i}
                                nivelAsignatura={nivelAsignatura}
                                niveles = {this.props.niveles}
                                asignaturas={this.props.asignaturas}
                                handleInputArrays = {this.props.handleInputArrays}
                                handleAddElement={this.props.handleAddElement}
                                borrarElemento={this.props.borrarElemento}
                                handleInputArraysAsignatura = {this.props.handleInputArraysAsignatura}
                                handleAddElementAsignatura = {this.props.handleAddElementAsignatura}
                                borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                                habilitarGeneral={this.props.habilitarGeneral}
                                habilitadogeneral={this.props.habilitadogeneral}
                                addNotification={this.props.addNotification}
                            />
                        )
                    }           
                </div>  
            </div>
        );
    }
}