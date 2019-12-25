import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Edit from './edit';
import ShowCompetencias from './showcompetencias';
import Panel from '../../../../utiles/Panel';

export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
    }


    

    
    render() {
        return (
            <div className="border p-3 mb-3">
                
                <div className="col-12">
                    <legend>Competencias</legend>
                    <React.Fragment>
                        {
                            !this.props.competencias_genericas
                            ?
                            this.props.dominio &&  this.props.dominio.competencias && this.props.dominio.competencias.map((competencia,i) =>
                                <Panel key = {i} titulo={competencia.descripcion}>
                                    <ShowCompetencias
                                        competencia={competencia}
                                        asignaturas={this.props.asignaturas}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleAddElement = {this.props.handleAddElement}
                                        borrarElemento={this.props.borrarElemento}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}
                                    />
                                </Panel>
                            )
                            :
                            this.props.competencias_genericas.map((competencia_generica,i) =>
                                <Panel key = {i} titulo={competencia_generica.sigla + ": " + competencia_generica.descripcion}>
                                    <ShowCompetencias
                                        competencia_generica={competencia_generica}
                                        asignaturas={this.props.asignaturas}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleAddElement = {this.props.handleAddElement}
                                        borrarElemento={this.props.borrarElemento}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}
                                    />
                                </Panel>
                            )
                        }
                    </React.Fragment>
                </div>  
            </div>
        );
    }
}