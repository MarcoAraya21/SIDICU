import React, { Component } from 'react'
import Panel from '../../../utiles/Panel'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nivel: {id:this.props.asignatura.nivel_id, nombre: this.props.asignatura.nivel.nombre},
        }

    }

    render() {
        return (
            <Panel key = {'asignatura-' + this.props.asignatura.id} titulo={this.props.asignatura.nombre} border={true} collapse={true} expand={true}>
                <div className="col-12 mb-2">
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Nombre</label>
                            <p>{this.props.asignatura.nombre}</p>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Codigo</label>
                            <p>{this.props.asignatura.codigo || ''}</p>
                        </div>
                        <div className="col-6">
                            <label>Tipo de Asignatura</label>
                            <p>{this.props.asignatura.tipo_asignatura && this.props.asignatura.tipo_asignatura.nombre}</p>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Departamento</label>
                            <p>{this.props.asignatura.departamento && this.props.asignatura.departamento.nombre}</p>
                        </div>

                    </div>
                    <div className="col mb-2">
                        <label>Descripción</label>
                        <p>{this.props.asignatura.descripcion || ''}</p>
                    </div>
                    <div className="col mb-2">
                        <label>Relación con el perfil de egreso</label>
                        <p>{this.props.asignatura.relacion_egreso || ''}</p>
                    </div>
                    <div className="col mb-2">
                        <label>Ambientes de aprendizaje</label>
                        <p>{this.props.asignatura.ambientes || ''}</p>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del docente</label>
                        <p>{this.props.asignatura.perfil_docente || ''}</p>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del ayudante</label>
                        <p>{this.props.asignatura.perfil_ayudante || ''}</p>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <strong>Niveles de Competencias</strong>
                            {this.props.asignatura.nivel_competencia_asignaturas.length > 0 ?
                                <ol>
                                    {this.props.asignatura.nivel_competencia_asignaturas.map((nivel_competencia_asignatura, i) =>
                                        <li key={i}>{nivel_competencia_asignatura.nivel_competencia.descripcion}
                                            {/* <a className="m-l-5" href="" target="_blank">
                                                <span className="badge badge-info">Ver</span>
                                            </a> */}
                                        </li>
                                    )}
                                </ol>
                                :
                                <p>No Posee</p>
                            }
                        </div>
                        <div className="col-6">
                            <strong>Niveles de Competencias Genericas</strong>
                            {this.props.asignatura.nivel_generica_asignaturas.length > 0 ?
                                <ol>
                                    {this.props.asignatura.nivel_generica_asignaturas.map((nivel_generica_asignatura, i) =>
                                        <li key={i}>{nivel_generica_asignatura.nivel_generica.nivel_competencia.descripcion}
                                            {/* <a className="m-l-5" href="" target="_blank">
                                                <span className="badge badge-info">Ver</span>
                                            </a> */}
                                        </li>
                                    )}
                                </ol>
                                :
                                <p>No Posee</p>
                            }
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-4">
                            <strong>Unidades</strong>
                            {this.props.asignatura.unidades.length > 0 ?
                                <ol>
                                    {this.props.asignatura.unidades.map((unidad, i) =>
                                        <li key={i}>
                                            {unidad.nombre}
                                        </li>
                                    )}
                                </ol>
                                :
                                <p>No Posee</p>
                            }
                        </div>
                        <div className="col-4">
                            <strong>Evaluaciones</strong>
                            {this.props.asignatura.asignatura_evaluaciones.length > 0 ?
                                <ol>
                                    {this.props.asignatura.asignatura_evaluaciones.map((asignatura_evaluacion, i) =>
                                        <li key={i}>
                                            {asignatura_evaluacion.evaluacion.nombre}
                                        </li>
                                    )}
                                </ol>
                                :
                                <p>No Posee</p>
                            }
                        </div>
                        <div className="col-4">
                            <strong>Metodología</strong>
                            {this.props.asignatura.asignatura_metodologias.length > 0 ?
                                <ol>
                                    {this.props.asignatura.asignatura_metodologias.map((asignatura_metodologia, i) =>
                                        <li key={i}>
                                            {asignatura_metodologia.metodologia.nombre}
                                        </li>
                                    )}
                                </ol>
                                :
                                <p>No Posee</p>
                            }
                        </div>
                        <div className="col-4">
                            <strong>Bibliografias</strong>
                            {this.props.asignatura.bibliografias.length > 0 ?
                                <ol>
                                    {this.props.asignatura.bibliografias.map((bibliografia, i) =>
                                        <li key={i}>
                                            {bibliografia.titulo}
                                        </li>
                                    )}
                                </ol>
                                :
                                <p>No Posee</p>
                            }
                        </div>
                    </div>
                </div>
                
            </Panel>
        );
    }
}