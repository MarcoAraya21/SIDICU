import React, { Component } from 'react'
import ShowCompetencias from './showcompetencias';
import Panel from '../../../utiles/Panel';


export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
    }

    render() {
        return (
            <div className="border p-3 mb-3">
                <div className="col ui-sortable-disabled">
                    <legend>Competencias {this.props.competencias_genericas && 'Genericas'}</legend>
                    <React.Fragment>
                        {
                            !this.props.competencias_genericas
                            ?
                            this.props.dominio &&  this.props.dominio.competencias &&
                                 this.props.dominio.competencias.length > 0 ?
                                    this.props.dominio.competencias.map((competencia,i) =>
                                        <ShowCompetencias
                                            key={i}
                                            competencia={competencia}
                                            asignaturas={this.props.asignaturas}
                                            handleInputArrays = {this.props.handleInputArrays}
                                            handleAddElement = {this.props.handleAddElement}
                                            borrarElemento={this.props.borrarElemento}
                                            habilitarGeneral = {this.props.habilitarGeneral}
                                            habilitadogeneral = {this.props.habilitadogeneral}
                                            addNotification = {this.props.addNotification}
                                        />
                                    )
                                :
                                'No Posee Competencias en este dominio'
                            :
                            this.props.competencias_genericas.map((competencia_generica,i) =>
                                    <ShowCompetencias
                                        key={i}
                                        competencia_generica={competencia_generica}
                                        asignaturas={this.props.asignaturas}
                                        plan_genericas={this.props.plan_genericas}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleAddElement = {this.props.handleAddElement}
                                        borrarElemento={this.props.borrarElemento}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}
                                    />
                            )
                        }
                    </React.Fragment>
                </div>  
            </div>
        );
    }
}