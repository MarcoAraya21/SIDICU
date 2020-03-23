import React, { Component } from 'react'
import Edit from './edit'

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
                    <legend>Asignaturas del Nivel {this.props.nivelAsignatura.nombre}</legend>
                    {
                        this.props.asignaturas && 
                        this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0 ?
                            this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).map( (asignatura,i) =>
                                <Edit
                                    key={i}
                                    asignatura={asignatura}
                                    asignaturas={this.props.asignaturas}
                                    niveles={this.props.niveles}
                                />
                            )
                        :
                            'No existen asignaturas en este nivel'
                    }
                </div>
            </div>     
        );
    }
}