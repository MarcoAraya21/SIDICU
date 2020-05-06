import React, { Component } from 'react'
import Panel from '../../../utiles/Panel'
import Unidades from './unidades/index'
import Evaluaciones from './evaluaciones/index'
import Metodologias from './metodologias/index'
import Bibliografias from './bibliografias/index'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            asignatura: {
                tipo_asignatura_id: '',
                departamento_id: '',
                descripcion: '',
                ambientes: '',
                perfil_ayudante: '',
                perfil_docente: ''
            },
            openUnidades: false,
            openEvaluaciones: false,
            openMetodologias: false,
            openBibliografias: false,
            deshabilitado: true,
            editando: false,
            guardando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenUnidades = this.handleOpenUnidades.bind(this);
        this.handleCloseUnidades = this.handleCloseUnidades.bind(this);
        this.handleOpenEvaluaciones = this.handleOpenEvaluaciones.bind(this);
        this.handleCloseEvaluaciones = this.handleCloseEvaluaciones.bind(this);
        this.handleOpenMetodologias = this.handleOpenMetodologias.bind(this);
        this.handleCloseMetodologias = this.handleCloseMetodologias.bind(this);
        this.handleOpenBibliografias = this.handleOpenBibliografias.bind(this);
        this.handleCloseBibliografias = this.handleCloseBibliografias.bind(this);
        this.habilitar = this.habilitar.bind(this);



    }

    componentWillMount() {
        this.setState({asignatura:
            {
                tipo_asignatura_id: this.props.asignatura.tipo_asignatura_id,
                departamento_id: this.props.asignatura.departamento_id,
                descripcion: this.props.asignatura.descripcion,
                ambientes: this.props.asignatura.ambientes,
                perfil_ayudante: this.props.asignatura.perfil_ayudante,
                perfil_docente: this.props.asignatura.perfil_docente
            }
        })
    }

    habilitar() {
        this.setState({ deshabilitado: false });
    }

    handleOpenUnidades() {
        this.setState({ openUnidades: true });
    }
    handleCloseUnidades() {
        this.setState({ openUnidades: false });
    }

    handleOpenEvaluaciones() {
        this.setState({ openEvaluaciones: true });
    }
    handleCloseEvaluaciones() {
        this.setState({ openEvaluaciones: false });
    }

    handleOpenMetodologias() {
        this.setState({ openMetodologias: true });
    }
    handleCloseMetodologias() {
        this.setState({ openMetodologias: false });
    }

    handleOpenBibliografias() {
        this.setState({ openBibliografias: true });
    }
    handleCloseBibliografias() {
        this.setState({ openBibliografias: false });
    }


    handleSubmit() {
        //e.preventDefault();
        this.setState({ guardando: true })
        fetch('/api/asignaturas/' + this.props.asignatura.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                this.state.asignatura
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                if(response.redirected)
                {
                    window.location.href = "/";
                }
                throw "Error en la llamada Ajax";
            }
        })
        .then(data => {[this.props.handleUpdate(this.state.asignatura, "asignaturas", this.props.asignatura.id), this.props.addNotification()]} )
        .catch(error => {
            [
                this.props.addNotificationAlert('No se ha podido guardar.'),
                this.setState({asignatura:
                    {
                        ...this.state.asignatura,
                        tipo_asignatura_id: this.props.asignatura.tipo_asignatura_id,
                        departamento_id: this.props.asignatura.departamento_id,
                        descripcion: this.props.asignatura.descripcion,
                        ambientes: this.props.asignatura.ambientes,
                        perfil_ayudante: this.props.asignatura.perfil_ayudante,
                        perfil_docente: this.props.asignatura.perfil_docente
                    }
                })
            ]

        })
        .finally(() => {[this.setState({guardando: false, deshabilitado: true, editando: false}),
            this.props.habilitarGeneral(true),
            this.props.habilitareditasignaturas(false),
        ]});
    }



    render() {
        let asignatura_nivel_competencias = [...new Set(this.props.asignatura.nivel_competencia_asignaturas.map( nivel_competencia_asignatura => 
                nivel_competencia_asignatura.nivel_competencia
        ))];
        let asignatura_dominios = this.props.dominios.filter( dominio =>
            dominio.competencias.some( competencia => 
                asignatura_nivel_competencias.some(asignatura_nivel_competencia =>
                    asignatura_nivel_competencia.competencia_id == competencia.id
                )
            )
        ).map( dominio => {
            return {
                ...dominio, competencias: dominio.competencias.filter( competencia => 
                    asignatura_nivel_competencias.some( asignatura_nivel_competencia =>
                        asignatura_nivel_competencia.competencia_id == competencia.id
                    )
                ).map( competencia => {
                    return {
                        ...competencia, nivel_competencias: competencia.nivel_competencias.filter( nivel_competencia =>
                            asignatura_nivel_competencias.some( asignatura_nivel_competencia => 
                                asignatura_nivel_competencia.id == nivel_competencia.id 
                            )
                        )
                    }
                })
            }
        });

        let asignatura_competencia_generica_id = [...new Set(this.props.asignatura.              nivel_generica_asignaturas.map( nivel_generica_asignatura => 
            nivel_generica_asignatura.nivel_generica.nivel_competencia.competencia_id
        ))];
        let asignatura_competencia_genericas = this.props.comp_genericas.filter( comp_generica =>
                asignatura_competencia_generica_id.some( elemento => elemento == comp_generica.id) 
            ).map( comp_generica => {
                return {
                    ...comp_generica, nivel_competencias: this.props.asignatura.nivel_generica_asignaturas.filter( nivel_generica_asignatura => 
                        nivel_generica_asignatura.nivel_generica.nivel_competencia.competencia_id == comp_generica.id
                    ).map( nivel_generica_asignatura => {
                        return nivel_generica_asignatura.nivel_generica.nivel_competencia;
                    })
                }
            })
        return (
            <Panel key = {'asignatura-' + this.props.asignatura.id} titulo={this.props.asignatura.nombre} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && this.state.deshabilitado)}>
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
                            <select value={this.state.asignatura.tipo_asignatura_id || ""}
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, tipo_asignatura_id: e.target.value}})}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Obligatoria</option>
                                <option value='2'>Opcional</option>
                            </select>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Departamento</label>
                            <select value={this.state.asignatura.departamento_id || ""}
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, departamento_id: e.target.value}})}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Contabilidad y Gestión Financiera</option>
                                <option value='2'>Economía, Recursos Naturales y Comercio Internacional</option>
                                <option value='3'>Estadística y Econometría</option>
                                <option value='4'>Gestión de la Información</option>
                                <option value='5'>Gestión Organizacional</option>
                                <option value='6'>Ciencias de la Construcción</option>
                                <option value='7'>Planificación y Ordenamiento Territorial</option>
                                <option value='8'>Prevención de Riesgos y Medio Ambiente</option>
                                <option value='9'>Biotecnología</option>
                                <option value='10'>Física</option>
                                <option value='11'>Matemáticas</option>
                                <option value='12'>Química</option>
                                <option value='13'>Cartografía</option>
                                <option value='14'>Diseño</option>
                                <option value='15'>Humanidades</option>
                                <option value='16'>Trabajo Social</option>
                                <option value='17'>Electricidad</option>
                                <option value='18'>Industria</option>
                                <option value='19'>Informática y Computación</option>
                                <option value='20'>Mecánica</option>
                            </select>
                        </div>

                    </div>
                    <div className="col mb-2">
                        <label>Descripción</label>
                        <textarea rows="3"
                            disabled={this.state.deshabilitado}
                            className="form-control"
                            value={this.state.asignatura.descripcion || ''}
                            onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, descripcion: e.target.value}})}>
                            </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Relación con el perfil de egreso</label>
                        <textarea 
                            value={
                                (
                                    asignatura_dominios.length > 0 ?
                                    (
                                        'La asignatura está relacionada con el perfil de egreso a través de sus logros de aprendizaje, los cuales tributan '+
                                        (
                                            asignatura_dominios.length == 1 ? 
                                            (
                                                'al dominio:\n' + '1.- "' + asignatura_dominios[0].nombre + '", por medio de ' + 
                                                (
                                                    asignatura_dominios[0].competencias.length  == 1 ?
                                                    (
                                                        'la competencia:\n' + '1.1.- "' + asignatura_dominios[0].competencias[0].descripcion + '", en ' +
                                                        (
                                                            asignatura_dominios[0].competencias[0].nivel_competencias.length == 1 ? 
                                                            (
                                                                'su  nivel ' + asignatura_dominios[0].competencias[0].nivel_competencias[0].nivel + ': ' + asignatura_dominios[0].competencias[0].nivel_competencias[0].descripcion
                                                            )
                                                            :
                                                            (
                                                                'sus niveles ' + asignatura_dominios[0].competencias[0].nivel_competencias.map( (nivel_competencia, i) => nivel_competencia.nivel + ': ' + nivel_competencia.descripcion + (i != (asignatura_dominios[0].competencias[0].nivel_competencias.length - 1) ? ', ' : ''))
                                                            )
                                                        )
                                                        + '.'
                                                    )
                                                    :
                                                    (
                                                        'las competencias:\n' + asignatura_dominios[0].competencias.map( (competencia, i) => 
                                                        '1.' + (i+1) + '.- "' + competencia.descripcion + '", en ' +
                                                        (
                                                            competencia.nivel_competencias.length == 1 ?
                                                            (
                                                                'su  nivel ' + competencia.nivel_competencias[0].nivel + ': ' + competencia.nivel_competencias[0].descripcion
                                                            )
                                                            :
                                                            (
                                                                'sus niveles ' + competencia.nivel_competencias.map( (nivel_competencia, j) => 
                                                                nivel_competencia.nivel + ': ' + nivel_competencia.descripcion + (j != (competencia.nivel_competencias.length - 1) ? ', ' : '')).join('')
                                                            )
                                                        )
                                                        + '.' + (i != (asignatura_dominios[0].competencias.length - 1) ? '\n' : '')
                                                        ).join('')
                                                    )
                                                )
                                            )
                                            :
                                            // MUCHOS DOMINIOS
                                            (
                                                'a los dominios:\n' + asignatura_dominios.map ( (dominio, i) => 
                                                    (i+1) + '.- "' + dominio.nombre + '", por medio de ' + 
                                                    (
                                                        dominio.competencias.length  == 1 ?
                                                        (
                                                            'la competencia:\n' + (i+1) + '.1.- "' + dominio.competencias[0].descripcion + '", en ' +
                                                            (
                                                                dominio.competencias[0].nivel_competencias.length == 1 ? 
                                                                (
                                                                    'su  nivel ' + dominio.competencias[0].nivel_competencias[0].nivel + ': ' + dominio.competencias[0].nivel_competencias[0].descripcion
                                                                )
                                                                :
                                                                (
                                                                    'sus niveles ' + dominio.competencias[0].nivel_competencias.map( (nivel_competencia, j) => nivel_competencia.nivel + ': ' + nivel_competencia.descripcion + (j != (dominio.competencias[0].nivel_competencias.length - 1) ? ', ' : '')).join('')
                                                                )
                                                            )
                                                            + '.'
                                                        )
                                                        :
                                                        (
                                                            'las competencias:\n' + dominio.competencias.map( (competencia, j) => 
                                                            (i+1) + '.' + (j+1) + '.- "' + competencia.descripcion + '", en ' +
                                                            (
                                                                competencia.nivel_competencias.length == 1 ?
                                                                (
                                                                    'su  nivel ' + competencia.nivel_competencias[0].nivel + ': ' + competencia.nivel_competencias[0].descripcion
                                                                )
                                                                :
                                                                (
                                                                    'sus niveles ' + competencia.nivel_competencias.map( (nivel_competencia, k) => 
                                                                    nivel_competencia.nivel + ': ' + nivel_competencia.descripcion + (k != (competencia.nivel_competencias.length - 1) ? ', ' : '')).join('')
                                                                )
                                                            )
                                                            + '.' + (j != (dominio.competencias.length - 1) ? '\n' : '')
                                                            ).join('')
                                                        )
                                                    )
                                                    + (i != (dominio.competencias.length - 1) ? '\n' : '')
                                                ).join('')
                                            )
                                        )
                                    )
                                    :
                                    (
                                        ''
                                    )
                                )
                                +
                                (
                                    asignatura_competencia_genericas.length > 0 ? 
                                    (
                                        '\n' + 
                                        'Esta asignatura contribuye al desarrollo de ' + 
                                        (
                                            asignatura_competencia_genericas.length == 1 ? 
                                            (
                                                'la competencia genérica siguiente:\n' + '1.- "' + asignatura_competencia_genericas[0].descripcion + '", en ' +
                                                (
                                                    asignatura_competencia_genericas[0].nivel_competencias.length == 1 ? 
                                                    (
                                                        'su  nivel ' + asignatura_competencia_genericas[0].nivel_competencias[0].nivel + ': ' + asignatura_competencia_genericas[0].nivel_competencias[0].descripcion
                                                    )
                                                    :
                                                    (
                                                        'sus niveles ' + asignatura_competencia_genericas[0].nivel_competencias.map( (nivel_competencia, i) => nivel_competencia.nivel + ': ' + nivel_competencia.descripcion + (i != (asignatura_competencia_genericas[0].nivel_competencias.length - 1) ? ', ' : '')).join('')
                                                    )
                                                    + '.'
                                                )
                                            )
                                            :
                                            (
                                                'las competencias genéricas siguientes:\n' + asignatura_competencia_genericas.map( (competencia_generica, i) => 
                                                    (i+1) + '.- "' + competencia_generica.descripcion + '", en ' +
                                                    (
                                                        competencia_generica.nivel_competencias.length == 1 ?
                                                        (
                                                            'su  nivel ' + competencia_generica.nivel_competencias[0].nivel + ': ' + competencia_generica.nivel_competencias[0].descripcion
                                                        )
                                                        :
                                                        (
                                                            'sus niveles ' + competencia_generica.nivel_competencias.map( (nivel_competencia, j) => 
                                                            nivel_competencia.nivel + ': ' + nivel_competencia.descripcion + (j != (competencia_generica.nivel_competencias.length - 1) ? ', ' : '')).join('')
                                                        )
                                                    )
                                                    + (i != (competencia_generica.length - 1) ? '\n' : '')
                                                ).join('')
                                            )
                                        )
                                    )
                                    :
                                    (
                                        ''
                                    )
                                )
                                
                            }
                            disabled className="form-control"
                            rows="6">
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Ambientes de aprendizaje</label>
                        <textarea rows="3"
                            disabled={this.state.deshabilitado}
                            className="form-control"
                            value={this.state.asignatura.ambientes || ''}
                            onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, ambientes: e.target.value}})}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del docente</label>
                        <textarea rows="3"
                            disabled={this.state.deshabilitado}
                            className="form-control"
                            value={this.state.asignatura.perfil_docente || ''}
                            onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, perfil_docente: e.target.value}})}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del ayudante</label>
                        <textarea rows="3"
                            disabled={this.state.deshabilitado}
                            className="form-control"
                            value={this.state.asignatura.perfil_ayudante || ''}
                            onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, perfil_ayudante: e.target.value}})}>
                        </textarea>
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
                            <div>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenUnidades() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Unidades
                                </button>
                            </div>
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
                            <div>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenEvaluaciones() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Evaluaciones
                                </button>
                            </div>
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
                            <div>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenMetodologias() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Metodologias
                                </button>
                            </div>
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
                            <div>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenBibliografias() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Bibliografias
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false), this.props.habilitareditasignaturas(true), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    {
                        this.state.guardando ?
                            <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Guardando</button>                      
                        :
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit()}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    }
                </div>
                <Unidades
                    openUnidades={this.state.openUnidades}
                    handleCloseUnidades={this.handleCloseUnidades}
                    unidades={this.props.asignatura.unidades}
                    // horas={{aula: aulas.reduce((previous, current) => {
                    //     return Number(previous) + Number(current.cantidad);
                    // }, 0)*18,extra_aula: extra_aulas.cantidad *18}}
                    asignaturaId={this.props.asignatura.id}
                    asignaturaNombre={this.props.asignatura.nombre}
                    handleInputArraysAsignatura={this.props.handleInputArraysAsignatura}
                    handleAddElementAsignatura={this.props.handleAddElementAsignatura}
                    borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                    habilitarGeneral={this.props.habilitarGeneral}
                    habilitadogeneral={this.props.habilitadogeneral}
                    addNotification={this.props.addNotification}
                    addNotificationAlert = {this.props.addNotificationAlert}
                />
                <Evaluaciones
                    openEvaluaciones={this.state.openEvaluaciones}
                    handleCloseEvaluaciones={this.handleCloseEvaluaciones}
                    asignatura_evaluaciones={this.props.asignatura.asignatura_evaluaciones}
                    asignaturaId={this.props.asignatura.id}
                    asignaturaNombre={this.props.asignatura.nombre}
                    handleAddElementAsignatura={this.props.handleAddElementAsignatura}
                    borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                    habilitarGeneral={this.props.habilitarGeneral}
                    habilitadogeneral={this.props.habilitadogeneral}
                    addNotification={this.props.addNotification}
                    addNotificationAlert = {this.props.addNotificationAlert}
                />
                <Metodologias
                    openMetodologias={this.state.openMetodologias}
                    handleCloseMetodologias={this.handleCloseMetodologias}
                    asignatura_metodologias={this.props.asignatura.asignatura_metodologias}
                    asignaturaId={this.props.asignatura.id}
                    asignaturaNombre={this.props.asignatura.nombre}
                    handleAddElementAsignatura={this.props.handleAddElementAsignatura}
                    borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                    habilitarGeneral={this.props.habilitarGeneral}
                    habilitadogeneral={this.props.habilitadogeneral}
                    addNotification={this.props.addNotification}
                    addNotificationAlert = {this.props.addNotificationAlert}
                />
                <Bibliografias
                    openBibliografias={this.state.openBibliografias}
                    handleCloseBibliografias={this.handleCloseBibliografias}
                    bibliografias={this.props.asignatura.bibliografias}
                    asignaturaId={this.props.asignatura.id}
                    asignaturaNombre={this.props.asignatura.nombre}
                    handleInputArraysAsignatura={this.props.handleInputArraysAsignatura}
                    handleAddElementAsignatura={this.props.handleAddElementAsignatura}
                    borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                    habilitarGeneral={this.props.habilitarGeneral}
                    habilitadogeneral={this.props.habilitadogeneral}
                    addNotification={this.props.addNotification}
                    addNotificationAlert = {this.props.addNotificationAlert}
                />
                {/* <Asignatura
                openAsignatura = {this.state.openAsignatura}
                handleCloseAsignatura={this.handleCloseAsignatura}
                nivel_competencia = {this.props.nivel_competencia}
                asignaturas={this.props.asignatura}
                handleInputArrays = {this.props.handleInputArrays}
                handleAddElement = {this.props.handleAddElement}
                borrarElemento = {this.props.borrarElemento}
                habilitarGeneral = {this.props.habilitarGeneral}
                habilitadogeneral = {this.props.habilitadogeneral}
                addNotification = {this.props.addNotification}
                /> */}
            </Panel>
        );
    }
}