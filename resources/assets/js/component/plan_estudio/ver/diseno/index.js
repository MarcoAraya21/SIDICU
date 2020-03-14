import React, { Component } from 'react'
import ShowNivel from './shownivel'

export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
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
                                ultimoNivel={nivelAsignatura.id == this.props.niveles[this.props.niveles.length - 1].id}
                            />

                            
                        )
                    }           
                </div>  
            </div>
        );
    }
}