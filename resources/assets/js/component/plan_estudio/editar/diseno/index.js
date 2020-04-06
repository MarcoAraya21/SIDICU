import React, { Component } from 'react'
import ShowNivel from './shownivel'
import Malla from './visualizacion/malla';
import Diseño from './visualizacion/diseño';

export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            openDiseño:false,
            openMalla:false,
        }

        this.handleOpenDiseño = this.handleOpenDiseño.bind(this);
        this.handleCloseDiseño = this.handleCloseDiseño.bind(this);        
        this.handleOpenMalla = this.handleOpenMalla.bind(this);
        this.handleCloseMalla = this.handleCloseMalla.bind(this);
        
    }

    handleOpenDiseño() {
        this.setState({ openDiseño: true });
    }
    handleCloseDiseño() {
        this.setState({ openDiseño: false });
    }
    handleOpenMalla() {
        this.setState({ openMalla: true });
    }
    handleCloseMalla() {
        this.setState({ openMalla: false });
    }
    
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
                                handleUpdate = {this.props.handleUpdate}
                                handleAddElement={this.props.handleAddElement}
                                borrarElemento={this.props.borrarElemento}
                                handleInputArraysAsignatura = {this.props.handleInputArraysAsignatura}
                                handleAddElementAsignatura = {this.props.handleAddElementAsignatura}
                                borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                                habilitarGeneral={this.props.habilitarGeneral}
                                habilitadogeneral={this.props.habilitadogeneral}
                                addNotification={this.props.addNotification}
                                addNotificationAlert={this.props.addNotificationAlert}
                                ultimoNivel={nivelAsignatura.id == this.props.niveles[this.props.niveles.length - 1].id}
                            />

                            
                        )
                    }           
                </div>  



                <div className="col-12 text-right t-2">
                    <div className="btn-group">
                        <a href="#" onClick={()=> this.handleOpenDiseño(this.setState({openDiseño:true}))} className="btn btn-primary"><i className="fas fa-eye fa-fw"></i> Ver Diseño del Plan de Estudio</a>
                    </div>
                

                <Diseño  id={this.props.id}
                                nombre={this.props.nombre}
                                asignaturas={this.props.asignaturas}
                                openDiseño = {this.state.openDiseño}
                                handleCloseDiseño = {this.handleCloseDiseño}
                />
                </div>




                <div className="col-12 text-right t-2">
                    <div className="btn-group">
                        <a href="#" onClick={()=> this.handleOpenMalla(this.setState({openMalla:true}))} className="btn btn-primary"><i className="fas fa-eye fa-fw"></i> Ver Malla Curricular</a>
                    </div>
                

                <Malla  id={this.props.id}
                                nombre={this.props.nombre}
                                asignaturas={this.props.asignaturas}
                                openMalla = {this.state.openMalla}
                                handleCloseMalla = {this.handleCloseMalla}
                />
                </div>

            </div>
        );
    }
}