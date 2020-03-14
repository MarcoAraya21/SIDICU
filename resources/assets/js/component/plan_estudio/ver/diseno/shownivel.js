import React, { Component } from 'react'
import Panel from '../../../utiles/Panel'
import Edit from './edit'

export default class shownivel extends Component {
    constructor (props) {
        super(props)
        
    }

    render() {
        return (
            <Panel key={'Nivel-' + this.props.nivelAsignatura.nombre} titulo={'Semestre ' + this.props.nivelAsignatura.nombre} border={true} collapse={true} expand={true}>
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
                            />
                            <div className="border-top my-4"></div>
                        </React.Fragment>
                    )
                :
                    'No existen asignaturas en este nivel'
                           
            }
            </Panel>
        );
    }
}