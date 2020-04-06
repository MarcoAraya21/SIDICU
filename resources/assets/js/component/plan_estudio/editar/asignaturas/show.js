import React, { Component } from 'react'
import Edit from './edit'

export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editandoasignaturas: false
        }
        
        this.habilitareditasignaturas = this.habilitareditasignaturas.bind(this);

    }

    habilitareditasignaturas(estado){
        this.setState({editandoasignaturas: estado});
    }
 
    render() {
        return (
            <div className="border p-3 mb-3">
                <div className="col ui-sortable-disabled">
                    <legend>Asignaturas del Semestre {this.props.nivelAsignatura.nombre}</legend>
                    {
                        this.props.asignaturas && 
                        this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0 ?
                            this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).map( (asignatura,i) =>
                                <Edit
                                    key={i}
                                    asignatura={asignatura}
                                    asignaturas={this.props.asignaturas}
                                    niveles={this.props.niveles}
                                    dominios={this.props.dominios}
                                    handleUpdate = {this.props.handleUpdate}
                                    handleInputArraysAsignatura = {this.props.handleInputArraysAsignatura}
                                    handleAddElement = {this.props.handleAddElement}
                                    handleAddElementAsignatura = {this.props.handleAddElementAsignatura}
                                    borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                                    habilitarGeneral = {this.props.habilitarGeneral}
                                    habilitadogeneral = {this.props.habilitadogeneral}
                                    habilitareditasignaturas = {this.habilitareditasignaturas}
                                    addNotification = {this.props.addNotification}
                                    addNotificationAlert = {this.props.addNotificationAlert}
                                />
                            )
                        :
                            'No existen asignaturas en este nivel'
                    }
                </div>
                {
                    this.props.ultimoNivel &&
                    <div className="col-12 text-right mt-2">
                        <button type="button" disabled={!this.state.deshabilitado && this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0} className="btn btn-danger p-5 m-l-5"
                            onClick={() => {
                                if (window.confirm('¿Estas Seguro?'))
                                    this.props.borrarElemento('niveles', this.props.nivelAsignatura.id, this.props.addNotification)
                            }}>
                            <i className="fas fa-times p-r-10"></i>Eliminar Nivel</button>
                    </div>
                }
            </div>     
        );
    }
}