import React, { Component } from 'react'
import Requisitos from './requisitos/index'
import Horas from './horas/index'
import Bibliografias from './bibliografias/index'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nivel: this.props.asignatura.nivel_id,
            openRequisitos: false,
            openHoras: false,
            openBibliografias: false,
            deshabilitado: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenRequisitos = this.handleOpenRequisitos.bind(this);
        this.handleCloseRequisitos = this.handleCloseRequisitos.bind(this);
        this.handleOpenHoras = this.handleOpenHoras.bind(this);
        this.handleCloseHoras = this.handleCloseHoras.bind(this);
        this.handleOpenBibliografias = this.handleOpenBibliografias.bind(this);
        this.handleCloseBibliografias = this.handleCloseBibliografias.bind(this);
        this.habilitar = this.habilitar.bind(this);



    }

    habilitar() {
        this.setState({ deshabilitado: false });
    }

    handleOpenRequisitos() {
        this.setState({ openRequisitos: true });
    }
    handleCloseRequisitos() {
        this.setState({ openRequisitos: false });
    }

    handleOpenHoras() {
        this.setState({ openHoras: true });
    }
    handleCloseHoras() {
        this.setState({ openHoras: false });
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
        if (!this.props.niveles.some(nivel => nivel.id == this.state.nivel)) {
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
                        nombre: (this.state.nivel)
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
                .then(data => { [this.props.handleAddElement('niveles', data), this.props.addNotification()] })
                .catch(function (error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                })
                .then(
                    fetch('/api/asignaturas/' + this.props.asignatura.id, {
                        method: 'put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                ...this.props.asignatura, nivel_id: this.state.nivel
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
                        .then(data => {[this.props.handleInputArrays(this.state.nivel, 'asignaturas', 'nivel_id', this.props.asignatura.id),
                            this.props.addNotification()]})
                        .catch(function (error) {
                            console.log('Hubo un problema con la petición Fetch:' + error.message);
                        })
                
                )
                .finally(() => {
                    [this.setState({ guardando: false, deshabilitado: true }),
                    this.props.habilitarGeneral(true)
                    ]
                });

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
                        ...this.props.asignatura, nivel_id: this.state.nivel
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
                .then(data => {[this.props.handleInputArrays(this.state.nivel, 'asignaturas', 'nivel_id', this.props.asignatura.id),
                this.props.addNotification()]})
                .catch(function (error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                })
                .finally(() => {
                    [this.setState({ guardando: false, deshabilitado: true }),
                    this.props.habilitarGeneral(true)
                    ]
                });
        }

    }



    render() {
        var aulas = this.props.asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora.nombre != 'Extra Aula');
        var extra_aulas = this.props.asignatura.asignatura_horas.find(asignatura_hora => asignatura_hora.tipo_hora.nombre == 'Extra Aula');
        if (this.props.asignatura.nivel.nombre == 1) {
            var nivel1 = true;
        }
        else {
            var requisitoNiveles = [];
            if (this.props.asignatura.requisitos.length > 0) {
                this.props.niveles.slice(0, -1).map((nivel, i) => {
                    if (this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre).length ==
                        this.props.asignaturas.filter(asignatura2 => asignatura2.nivel.nombre == nivel.nombre).length) {
                        requisitoNiveles[i] = { 'nombre': nivel.nombre }
                    }
                    else {
                        if (this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre).length > 0) {
                            requisitoNiveles[i] = { 'nombre': nivel.nombre, 'requisitos': this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre) }
                        }
                    }
                })
            }
        }
        // var opcionNiveles = this.state.asignaturas.filter(asignatura =>
        //     asignatura.requisito.some
        //     );
        return (
            <div className={"my-2 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                <div className="col-12 mb-2">
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Nombre</label>
                            <input disabled type="text" className="form-control">
                            </input>
                        </div>
                        <div className="col-6">
                            <label>Nivel</label>
                            <select defaultValue={this.props.asignatura.nivel.id}
                                className="form-control "
                                onChange={(e) => this.setState({ nivel: Number(e.target.value) })}>
                                <option disabled value="">Seleccione una Opción</option>
                                {
                                    this.props.niveles.map((nivel, i) =>
                                        <option key={i} value={nivel.id}>Nivel {nivel.nombre}</option>
                                    )
                                }
                                <option value={this.props.niveles[this.props.niveles.length - 1].id + 1}>
                                    {
                                        "Nivel " + (this.props.niveles[this.props.niveles.length - 1].nombre + 1)
                                    }
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Codigo</label>
                            <input type="text" className="form-control"
                                value={this.props.asignatura.codigo || ''}
                                onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'codigo', this.props.asignatura.id)}>
                            </input>
                        </div>
                        <div className="col-6">
                            <label>Tipo de Asignatura</label>
                            <select defaultValue={""}
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
                            <label>Requisitos:</label>
                            <ul>
                                {
                                    nivel1 ?
                                        <li>Ingreso</li>
                                        :
                                        requisitoNiveles.map((requisitoNivel, i) =>
                                            <li key={i}>
                                                {
                                                    requisitoNivel.requisitos ?
                                                        ["Nivel " + requisitoNivel.nombre + ':',
                                                        <ol key={i}>
                                                            {requisitoNivel.requisitos.map((requisito, i) =>
                                                                <li key={i}>{requisito.requisito.nombre}</li>
                                                            )}
                                                        </ol>
                                                        ]
                                                        :
                                                        "Nivel " + requisitoNivel.nombre + ' Completo'
                                                }
                                            </li>
                                        )
                                }
                            </ul>
                        </div>
                        {!nivel1 &&
                            <div className="col-6 text-right mt-2">
                                <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenRequisitos() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Ver Requisitos
                                </button>
                            </div>
                        }
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Regimen</label>
                            <select defaultValue={""}
                                className="form-control "
                                onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'regimen_id', this.props.asignatura.id)}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Semestral</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Modalidad</label>
                            <select defaultValue={""}
                                className="form-control "
                                onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'modalidad_id', this.props.asignatura.id)}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Presencial</option>
                            </select>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Ciclo o Programa de Formación</label>
                            <select defaultValue={""}
                                className="form-control "
                                onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'ciclo_id', this.props.asignatura.id)}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Ciclo Cientifico Tecnológico</option>
                                <option value='2'>Ciclo de Especialización</option>
                                <option value='3'>Ciclo de Titulación</option>
                                <option value='4'>Programa de Desarrollo Personal y Social</option>
                                <option value='5'>Programa de Bienestar Físico y Deportes</option>
                                <option value='6'>Programa de Inglés</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Departamento</label>
                            <select defaultValue={""}
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
                            className="form-control"
                            value={this.props.asignatura.descripcion || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'descripcion', this.props.asignatura.id)}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Relación con el perfil de egreso</label>
                        <textarea disabled className="form-control" rows="3">
                            Rellenar Texto
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Ambientes de aprendizaje</label>
                        <textarea rows="3"
                            className="form-control"
                            value={this.props.asignatura.ambientes || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'ambientes', this.props.asignatura.id)}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del docente</label>
                        <textarea rows="3"
                            className="form-control"
                            value={this.props.asignatura.perfil_docente || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'perfil_docente', this.props.asignatura.id)}>
                        </textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del ayudante</label>
                        <textarea rows="3"
                            className="form-control"
                            value={this.props.asignatura.perfil_ayudante || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'perfil_ayudante', this.props.asignatura.id)}>
                        </textarea>
                    </div>
                </div>
                <div className="col-12 mb-2 row">
                    <div className="col-4">
                        <label>Requisito</label>
                        PENDIENTE
                    </div>
                </div>
                <div className="col-12 mb-2 row">
                    <div className="col-4">
                        <strong>Horas</strong>
                        <ol>
                            <li>
                                Aula: {aulas.reduce((previous, current) => {
                                    return Number(previous) + Number(current.cantidad);
                                }, 0)}
                                <ul>
                                    {aulas.map(aula =>
                                        <li key={aula.id}>{aula.tipo_hora.nombre}: {aula.cantidad}</li>)}
                                </ul>
                            </li>
                            <li>{extra_aulas.tipo_hora.nombre}: {extra_aulas.cantidad}</li>
                        </ol>
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenHoras() }}>
                                <i className="fas fa-plus p-r-5" ></i>Modificar Horas
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <strong>Unidades</strong>
                        {this.props.asignatura.unidades.length > 0 ?
                            <ol>
                                {this.props.asignatura.unidades.map((unidad, i) =>
                                    <li key={i}>{unidad.nombre}
                                        <a className="m-l-5" href="" target="_blank">
                                            <span className="badge badge-info">Ver</span>
                                        </a>
                                    </li>
                                )}
                            </ol>
                            :
                            <p>No Posee</p>
                        }
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary">
                                <i className="fas fa-plus p-r-5" ></i>Unidades
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <strong>Bibliografias</strong>
                        {this.props.asignatura.bibliografias.length > 0 ?
                            <ol>
                                {this.props.asignatura.bibliografias.map((bibliografia, i) =>
                                    <li key={i}>{bibliografia.titulo}
                                        <a className="m-l-5" href="" target="_blank">
                                            <span className="badge badge-info">Ver</span>
                                        </a>
                                    </li>
                                )}
                            </ol>
                            :
                            <p>No Posee</p>
                        }
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenBibliografias() }}>
                                <i className="fas fa-plus p-r-5" ></i>Bibliografias
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 row">
                    Dentro se encuentra <p style={{ textDecoration: 'line-through' }}>
                        la Metodología de enseñanza y aprendizaje</p>
                    Evaluaciones
                    <div className="col-6">
                        <strong>Niveles de Competencias</strong>
                        {this.props.asignatura.nivel_competencia_asignaturas.length > 0 ?
                            <ol>
                                {this.props.asignatura.nivel_competencia_asignaturas.map((nivel_competencia_asignatura, i) =>
                                    <li key={i}>{nivel_competencia_asignatura.nivel_competencia.descripcion}
                                        <a className="m-l-5" href="" target="_blank">
                                            <span className="badge badge-info">Ver</span>
                                        </a>
                                    </li>
                                )}
                            </ol>
                            :
                            <p>No Posee</p>
                        }
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary">
                                <i className="fas fa-plus p-r-5" ></i>Niveles de Competencias
                            </button>
                        </div>
                    </div>
                    <div className="col-6">
                        <strong>Niveles de Competencias Genericas</strong>
                        {this.props.asignatura.nivel_generica_asignaturas.length > 0 ?
                            <ol>
                                {this.props.asignatura.nivel_generica_asignaturas.map((nivel_generica_asignatura, i) =>
                                    <li key={i}>{nivel_generica_asignatura.nivel_generica.nivel_competencia.descripcion}
                                        <a className="m-l-5" href="" target="_blank">
                                            <span className="badge badge-info">Ver</span>
                                        </a>
                                    </li>
                                )}
                            </ol>
                            :
                            <p>No Posee</p>
                        }
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary">
                                <i className="fas fa-plus p-r-5" ></i>Niveles de Competencias Genericas
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={this.handleSubmit}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                        onClick={() => {
                            if (window.confirm('¿Estas Seguro?'))
                                this.props.borrarElemento('nivel_competencias', this.props.nivel_competencia.id, this.props.addNotification)
                        }}>
                        <i className="fas fa-times p-r-10"></i>Eliminar</button>
                </div>
                <Requisitos
                    openRequisitos={this.state.openRequisitos}
                    handleCloseRequisitos={this.handleCloseRequisitos}
                    requisitos={this.props.asignatura.requisitos}
                    opcionRequisitos={this.props.asignaturas.filter(asignatura =>
                        asignatura.nivel.nombre < this.props.asignatura.nivel.nombre)}
                    asignaturaId={this.props.asignatura.id}
                    asignaturaNombre={this.props.asignatura.nombre}
                    handleAddElementAsignatura={this.props.handleAddElementAsignatura}
                    borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                    habilitarGeneral={this.props.habilitarGeneral}
                    habilitadogeneral={this.props.habilitadogeneral}
                    addNotification={this.props.addNotification}
                />
                <Horas
                    openHoras={this.state.openHoras}
                    handleCloseHoras={this.handleCloseHoras}
                    asignatura_horas={this.props.asignatura.asignatura_horas}
                    asignaturaId={this.props.asignatura.id}
                    asignaturaNombre={this.props.asignatura.nombre}
                    handleInputArrays={this.props.handleInputArrays}
                    handleInputArraysAsignatura={this.props.handleInputArraysAsignatura}
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
            </div>
        );
    }
}