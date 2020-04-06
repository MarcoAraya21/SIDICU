import React, { Component } from 'react'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

export default class show extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        return (
            !this.props.nivel_generica_asignatura ?
                <List>
                    <React.Fragment>
                        <ListItem button>
                            <ListItemText primary={this.props.nivel_competencia_asignatura.asignatura.nombre || 'Sin Nombre'} />
                            <div className="mt-2 mb-1">
                                <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-danger m-l-10"
                                    onClick={() => {
                                        let requisitos = this.props.asignaturas.filter(asignatura => asignatura.requisitos.some(requisito =>
                                            requisito.requisito.id == this.props.nivel_competencia_asignatura.asignatura_id
                                        ))
                                        if(requisitos.length > 0 )
                                        {
                                            let texto = "";
                                            requisitos.map(requisito =>
                                                requisito[requisito.length-1] == requisito ?
                                                texto = texto + requisito.nombre
                                                :
                                                texto = texto + requisito.nombre + "\n"
                                                )
                                            alert('No puede el eliminarse al ser requisito de:\n' + texto)
                                        }
                                        else
                                        {
                                            if (window.confirm('¿Estas Seguro?')) {
                                                let asignaturaAsociada = this.props.asignaturas.find(asignatura => asignatura.id == this.props.nivel_competencia_asignatura.asignatura.id)
                                                if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length > 1) {
                                                    this.props.borrarElemento('nivel_competencia_asignaturas', this.props.nivel_competencia_asignatura.id, this.props.addNotification, this.props.addNotificationAlert)
                                                }
                                                else {
                                                    if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length == 1) {
                                                        if (window.confirm('Si elimina esta asociación, tambien se eliminara la asignatura \n ¿Estas Seguro?'))
                                                            this.props.borrarElemento('asignaturas', asignaturaAsociada.id, this.props.addNotification, this.props.addNotificationAlert)
                                                    }
                                                }
                                            }
                                        }
                                    }}>
                                    <i className="fas fa-times p-r-5" ></i>Eliminar Asociación
                                </button>
                            </div>
                        </ListItem >
                        <Divider />
                    </React.Fragment>                    
                </List>                           
            :
                <List>
                    <React.Fragment>
                        <ListItem button>
                            <ListItemText primary={this.props.plan_generica_asignatura.nombre || 'Sin Nombre'}/>
                            <div className="mt-2 mb-1">
                                <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-danger m-l-10"
                                    onClick={() => {
                                        let requisitos = this.props.asignaturas.filter(asignatura => asignatura.requisitos.some(requisito =>
                                                requisito.requisito.id == this.props.plan_generica_asignatura.id
                                            ))
                                        // if(this.props.asignaturas.)
                                        if (window.confirm('¿Estas Seguro?')) {
                                            let asignaturaAsociada = this.props.asignaturas.find(asignatura => asignatura.id == this.props.plan_generica_asignatura.id)
                                            if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length > 1) {
                                                this.props.borrarElemento('nivel_generica_asignaturas', this.props.nivel_generica_asignatura.id, this.props.addNotification, this.props.addNotificationAlert)
                                            }
                                            else {
                                                if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length == 1) {
                                                    if (window.confirm('Si elimina esta asociación, tambien se eliminara la asignatura \n ¿Estas Seguro?'))
                                                        this.props.borrarElemento('asignaturas', asignaturaAsociada.id, this.props.addNotification, this.props.addNotificationAlert)
                                                }
                                            }
                                        }
                                    }}>
                                    <i className="fas fa-times p-r-5" ></i>Eliminar Asociación
                                </button>
                            </div>
                        </ListItem >
                        <Divider />
                    </React.Fragment>                    
                </List>    
        );
    }
}