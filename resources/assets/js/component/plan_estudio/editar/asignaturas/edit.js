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
            nivel: {id:this.props.asignatura.nivel_id, nombre: this.props.asignatura.nivel.nombre},
            openUnidades: false,
            openEvaluaciones: false,
            openMetodologias: false,
            openBibliografias: false,
            deshabilitado: true,
            editando: false
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
        if (!this.props.niveles.some(nivel => nivel.id == this.state.nivel.id)) {
            fetch('/api/niveles/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify(
                    {
                        plan_estudio_id: this.props.niveles[0].plan_estudio_id,
                        nombre: (this.state.nivel.nombre)
                    }
                )
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw "Error en la llamada Ajax";
                    }

                })
                .then(data => {
                    [
                        this.setState({ nivel: {id: data.id, nombre: data.nombre} }),
                        alert('se ha creado el nivel ' + this.state.nivel.nombre),
                        this.props.handleAddElement('niveles', data),
                    ]
                    return data;
                })
                .catch(function (error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                })
                .then(data => {
                    fetch('/api/asignaturas/' + this.props.asignatura.id, {
                        method: 'put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                ...this.props.asignatura, nivel_id: data.id
                            }
                        )
                    })
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw "Error en la llamada Ajax";
                            }

                        })
                        .then(data => {
                            [
                                this.setState({ guardando: false, deshabilitado: true, editando: false }),
                                this.props.habilitarGeneral(true),
                                this.props.habilitareditasignaturas(false),
                                this.state.nivel.id != this.props.asignatura.nivel_id && alert('se ha trasladado al nivel ' + this.state.nivel.nombre),
                                this.props.handleInputArrays(this.state.nivel.id, 'asignaturas', 'nivel_id', this.props.asignatura.id),
                                this.props.addNotification()
                            ]
                        })
                        .catch(function (error) {
                            console.log('Hubo un problema con la petición Fetch:' + error.message);
                        })

                    })

        }
        else {
            fetch('/api/asignaturas/' + this.props.asignatura.id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        ...this.props.asignatura, nivel_id: this.state.nivel.id
                    }
                )
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw "Error en la llamada Ajax";
                    }

                })
                .then(data => {
                    [
                        this.setState({ guardando: false, deshabilitado: true, editando: false }),
                        this.props.habilitarGeneral(true),
                        this.props.habilitareditasignaturas(false),
                        this.state.nivel.id != this.props.asignatura.nivel_id && alert('se ha trasladado al nivel ' + this.state.nivel.nombre),
                        this.props.handleInputArrays(this.state.nivel.id, 'asignaturas', 'nivel_id', this.props.asignatura.id),
                        this.props.addNotification()
                    ]
                })
                .catch(function (error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                })
        }

    }



    render() {
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
                            <select defaultValue={""}
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'tipo_asignatura_id', this.props.asignatura.id)}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Obligatoria</option>
                                <option value='2'>Opcional</option>
                            </select>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Departamento</label>
                            <select defaultValue={""}
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'departamento_id', this.props.asignatura.id)}>
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
                            value={this.props.asignatura.descripcion || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'descripcion', this.props.asignatura.id)}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Relación con el perfil de egreso</label>
                        <textarea value={'Rellenar Texto'} disabled className="form-control" rows="3">
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Ambientes de aprendizaje</label>
                        <textarea rows="3"
                            disabled={this.state.deshabilitado}
                            className="form-control"
                            value={this.props.asignatura.ambientes || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'ambientes', this.props.asignatura.id)}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del docente</label>
                        <textarea rows="3"
                            disabled={this.state.deshabilitado}
                            className="form-control"
                            value={this.props.asignatura.perfil_docente || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'perfil_docente', this.props.asignatura.id)}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del ayudante</label>
                        <textarea rows="3"
                            disabled={this.state.deshabilitado}
                            className="form-control"
                            value={this.props.asignatura.perfil_ayudante || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'perfil_ayudante', this.props.asignatura.id)}>
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
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit()}><i className="fas fa-save p-r-10"></i>Guardar</button>
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
                />
                <Bibliografias
                    openBibliografias={this.state.openBibliografias}
                    handleCloseBibliografias={this.handleCloseBibliografias}
                    bibliografias={this.props.asignatura.bibliografias}
                    asignaturaId={this.props.asignatura.id}
                    asignaturaNombre={this.props.asignatura.nombre}
                    handleInputArrays={this.props.handleInputArrays}
                    handleInputArraysAsignatura={this.props.handleInputArraysAsignatura}
                    handleAddElementAsignatura={this.props.handleAddElementAsignatura}
                    borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                    habilitarGeneral={this.props.habilitarGeneral}
                    habilitadogeneral={this.props.habilitadogeneral}
                    addNotification={this.props.addNotification}
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