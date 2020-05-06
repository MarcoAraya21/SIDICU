import React, { Component } from 'react'
import Panel from '../../../utiles/Panel'
import Edit from './edit'

export default class shownivel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editandoasignatura: false
        }

        this.habilitareditasignaturas = this.habilitareditasignaturas.bind(this);

        
    }

    habilitareditasignaturas(estado){
        this.setState({editandoasignatura: estado});
    }
    
    
    render() {
        return (
            <Panel key={'Nivel-' + this.props.nivelAsignatura.nombre} titulo={'Semestre ' + this.props.nivelAsignatura.nombre} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandoasignatura)}>
            {

                                this.props.asignaturas && 
                                this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0 ?
                                    this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).map( (asignatura,i) =>
                                        <React.Fragment key={i}>
                                            <Edit key={'asignatura-' + asignatura.id}
                                                nivelAsignatura={this.props.nivelAsignatura}
                                                niveles = {this.props.niveles}
                                                asignatura = {asignatura}
                                                asignaturas={this.props.asignaturas}
                                                handleUpdate = {this.props.handleUpdate}
                                                handleAddElement={this.props.handleAddElement}
                                                borrarElemento={this.props.borrarElemento}
                                                handleInputArraysAsignatura = {this.props.handleInputArraysAsignatura}
                                                handleAddElementAsignatura = {this.props.handleAddElementAsignatura}
                                                borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                                                habilitarGeneral={this.props.habilitarGeneral}
                                                habilitadogeneral={this.props.habilitadogeneral}
                                                habilitareditasignaturas = {this.habilitareditasignaturas}
                                                addNotification={this.props.addNotification}
                                                addNotificationAlert={this.props.addNotificationAlert}
                                            />
                                            <div className="border-top my-4"></div>
                                        </React.Fragment>
                                    )
                                :
                                    'No existen asignaturas en este nivel'
                           
            }
            {
                (this.props.ultimoNivel && this.props.nivelAsignatura.nombre > 1)  &&
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={!this.state.deshabilitado && this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0} className="btn btn-danger p-5 m-l-5"
                        onClick={() => {
                            if (window.confirm('¿Estas Seguro?'))
                                this.props.borrarElemento('niveles', this.props.nivelAsignatura.id, this.props.addNotification, this.props.addNotificationAlert)
                        }}>
                        <i className="fas fa-times p-r-10"></i>Eliminar Nivel</button>
                </div>
            }
            </Panel>
        );
    }
}