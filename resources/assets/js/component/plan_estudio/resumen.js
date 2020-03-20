import React, { Component } from 'react'
export default class resumen extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        

    }

    render() {
        return (
            <div className="container py-4">
                <div className="col-12">
                    <legend>Resumen del Plan de Estudios</legend>
                    <ul>
                        <li>
                            N° de Dominios: 
                            {this.props.dominios.length}
                        </li>
                        <li>N° de Competencias: 
                            {this.props.dominios.reduce((previous, current) => {
                                return previous + current.competencias.length;
                                }, 0)}
                        </li>
                        <li>N° de Logros de Aprendizaje:
                            {this.props.dominios.reduce((previous, current) => {
                                return previous + current.competencias.reduce((previous, current) => {
                                    return previous + current.nivel_competencias.reduce((previous, current) => {
                                        return previous + current.logro_aprendizajes.length;
                                        }, 0);
                                    }, 0);
                                }, 0)}
                        </li>
                        <li>N° de Competencias Genericas:
                            {this.props.competencias_genericas.length}
                        </li>
                        <li>N° de Asignaturas:
                            {this.props.asignaturas.length}
                        </li>
                        <li>N° de SCT:
                        {
                            this.props.asignaturas.reduce((previous, current) => {
                                return previous + current.asignatura_horas.reduce((previous, current) => {
                                    return previous + (current.cantidad/2);
                                    }, 0);
                                }, 0)
                        }
    
                        </li>
                    </ul>
                    <br />
                    <legend>Advertencias</legend>
                    <ul>
                        <li></li>
                    </ul>
                </div>  
            </div>
        );
    }
}