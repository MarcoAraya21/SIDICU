import React, { Component } from 'react'
import Horas from './horas/index'
import Requisitos from './requisitos/index'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            asignatura: {
                codigo: '',
                ciclo_id: '',
                nivel_id: '',
            },
            nivel_nombre: this.props.asignatura.nivel.nombre,
            openHoras: false,
            openRequisitos: false,
            deshabilitado: true,
            editando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenHoras = this.handleOpenHoras.bind(this);
        this.handleCloseHoras = this.handleCloseHoras.bind(this);
        this.handleOpenRequisitos = this.handleOpenRequisitos.bind(this);
        this.handleCloseRequisitos = this.handleCloseRequisitos.bind(this);
        this.habilitar = this.habilitar.bind(this);



    }

    componentWillMount() {
        this.setState({asignatura: {codigo: this.props.asignatura.codigo,
                        ciclo_id: this.props.asignatura.ciclo_id,
                        nivel_id: this.props.asignatura.nivel_id}})
    }

    habilitar() {
        this.setState({ deshabilitado: false });
    }

    handleOpenHoras() {
        this.setState({ openHoras: true });
    }
    handleCloseHoras() {
        this.setState({ openHoras: false });
    }

    handleOpenRequisitos() {
        this.setState({ openRequisitos: true });
    }
    handleCloseRequisitos() {
        this.setState({ openRequisitos: false });
    }


    handleSubmit() {
        //e.preventDefault();
        this.setState({ guardando: true })
        if (!this.props.niveles.some(nivel => nivel.id == this.state.asignatura.nivel_id)) {
            fetch('/api/niveles', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify(
                    {
                        plan_estudio_id: this.props.niveles[0].plan_estudio_id,
                        nombre: (this.state.nivel_nombre)
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
                        this.setState({ asignatura: {...this.state.asignatura, nivel_id: data.id}, nivel_nombre: data.nombre}),
                        alert('se ha creado el nivel ' + this.state.nivel_nombre),
                        this.props.handleAddElement('niveles', data),
                        fetch('/api/asignaturas/' + this.props.asignatura.id, {
                            method: 'put',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    ...this.state.asignatura, nivel_id: data.id
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
                                this.state.asignatura.nivel_id != this.props.asignatura.nivel_id && alert('se ha trasladado al nivel ' + this.state.nivel_nombre),
                                this.props.handleUpdate(this.state.asignatura, "asignaturas", this.props.asignatura.id),
                                this.props.addNotification()
                            ]
                        })
                        .catch(error => {
                            this.setState({asignatura: {...this.state.asignatura, 
                                codigo: this.props.asignatura.codigo,
                                ciclo_id: this.props.asignatura.ciclo_id,
                                nivel_id: this.props.asignatura.nivel_id,}}),
                            this.setState({nivel_nombre: this.props.asignatura.nivel.nombre}),
                            this.setState({ guardando: false, deshabilitado: true, editando: false }),
                            this.props.habilitarGeneral(true),
                            this.props.habilitareditasignaturas(false),
                            this.props.addNotificationAlert('No se ha podido guardar.')
                        })
                    ]
                })
                .catch(error => {
                    this.setState({asignatura: {...this.state.asignatura, 
                        codigo: this.props.asignatura.codigo,
                        ciclo_id: this.props.asignatura.ciclo_id,
                        nivel_id: this.props.asignatura.nivel_id,}}),
                    this.setState({nivel_nombre: this.props.asignatura.nivel.nombre}),
                    this.setState({ guardando: false, deshabilitado: true, editando: false }),
                    this.props.habilitarGeneral(true),
                    this.props.habilitareditasignaturas(false),
                    this.props.addNotificationAlert('No se ha podido guardar.')
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
                        ...this.state.asignatura
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
                        this.state.asignatura.nivel_id != this.props.asignatura.nivel_id && alert('se ha trasladado al nivel ' + this.state.nivel_nombre),
                        this.props.handleUpdate(this.state.asignatura, "asignaturas", this.props.asignatura.id),
                        this.props.addNotification()
                    ]
                })
                .catch(error => {
                    [
                        this.setState({asignatura: {...this.state.asignatura, 
                            codigo: this.props.asignatura.codigo,
                            ciclo_id: this.props.asignatura.ciclo_id,
                            nivel_id: this.props.asignatura.nivel_id,}}),
                        this.setState({nivel_nombre: this.props.asignatura.nivel.nombre}),
                        this.setState({ guardando: false, deshabilitado: true, editando: false }),
                        this.props.habilitarGeneral(true),
                        this.props.habilitareditasignaturas(false),
                        this.props.addNotificationAlert('No se ha podido guardar.')
                    ]
                })
                
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
            // if (this.props.asignatura.requisitos.length > 0) {
            //     this.props.niveles.slice(0, -1).map((nivel, i) => {
            //         if (this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre).length ==
            //             this.props.asignaturas.filter(asignatura2 => asignatura2.nivel.nombre == nivel.nombre).length) {
            //             requisitoNiveles[i] = { 'nombre': nivel.nombre }
            //         }
            //         else {
            //             if (this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre).length > 0) {
            //                 requisitoNiveles[i] = { 'nombre': nivel.nombre, 'requisitos': this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre) }
            //             }
            //         }
            //     })
            // }
            if (this.props.asignatura.requisitos.length > 0) {
                this.props.niveles.filter(nivel => nivel.nombre < this.props.asignatura.nivel.nombre).map((nivel, i) => {
                    if (this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre).length > 0) {
                        if (this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre).length ==
                            this.props.asignaturas.filter(asignatura2 => asignatura2.nivel.nombre == nivel.nombre).length) {
                            requisitoNiveles[i] = { 'nombre': nivel.nombre }
                        }
                        else {
                            if (this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre).length > 0) {
                                requisitoNiveles[i] = { 'nombre': nivel.nombre, 'requisitos': this.props.asignatura.requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel.nombre) }
                            }
                        }
                    }

                })
            }
        }
        var requisitoSuperior = this.props.asignaturas.filter(asignatura =>
            asignatura.requisitos.some(requisito =>
                requisito.requisito.id == this.props.asignatura.id
            )
        ).sort((a, b) => a.nivel.nombre - b.nivel.nombre)[0] || null;
        var requisitoSuperior = requisitoSuperior && requisitoSuperior.nivel.nombre;

        var requisitoInferior = this.props.asignatura.requisitos.sort((a, b) =>
            b.requisito.nivel.nombre - a.requisito.nivel.nombre)[0] || null;
        var requisitoInferior = requisitoInferior && requisitoInferior.requisito.nivel.nombre;

        var requisitosAsignatura = this.props.niveles.filter(nivel => (requisitoSuperior ? (nivel.nombre < requisitoSuperior) : !requisitoSuperior) &&
            (requisitoInferior ? (nivel.nombre > requisitoInferior) : !requisitoInferior) &&
            (nivel.nombre != this.props.asignatura.nivel.nombre)
        )
        
        if (!requisitoSuperior) {
            requisitosAsignatura = requisitosAsignatura.concat({ 'id': this.props.niveles[this.props.niveles.length - 1].id + 1, 'nombre': this.props.niveles[this.props.niveles.length - 1].nombre + 1 });
        }
        return (
            // <Panel key = {'asignatura-' + this.props.asignatura.id} titulo={this.props.asignatura.nombre} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && this.state.deshabilitado)}>
                <div className="col-12">
                    <div className="row">
                        <div className="form-group col-4">
                            <label>Nombre</label>
                            <p>{this.props.asignatura.nombre}</p>
                        </div>
                        <div className="form-group col-4">
                            <label>Código</label>
                            <input type="text" className="form-control"
                                disabled={this.state.deshabilitado}
                                value={this.state.asignatura.codigo || ''}
                                onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, codigo: e.target.value}})}>
                                </input>
                        </div>
                        <div className="form-group col-4">
                            <label>Ciclo</label>
                            <select value={this.state.asignatura.ciclo_id || ""}
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                onChange={(e)=>this.setState({asignatura: {...this.state.asignatura, ciclo_id: e.target.value}})}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Ciclo Cientifico Tecnológico</option>
                                <option value='2'>Ciclo de Especialización</option>
                                <option value='3'>Ciclo de Titulación</option>
                                <option value='4'>Programa de Desarrollo Personal y Social</option>
                                <option value='5'>Programa de Bienestar Físico y Deportes</option>
                                <option value='6'>Programa de Inglés</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <label>
                                SCT-Chile: {(aulas.reduce((previous, current) => {
                                return Number(previous) + Number(current.cantidad);
                                }, 0) +
                                extra_aulas.cantidad) / 2}
                            </label>
                            <p>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenHoras() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Modificar Horas
                                </button>
                            </p>
                        </div>
                        <div className="form-group col-4">
                            <label>Requisitos</label>
                            <p>
                            {
                                nivel1 ?
                                'Ingreso'
                                :
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenRequisitos() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Ver Requisitos
                                </button>
                            }
                            </p>
                        </div>
                        <div className="form-group col-4">
                            <label>Cambiar Semestre</label>
                            <select disabled={requisitosAsignatura.length == 0 || this.state.deshabilitado} value={this.state.asignatura.nivel_id}
                                className="form-control "
                                onChange={(e) => this.setState({ asignatura: {...this.state.asignatura, nivel_id: Number(e.target.value) || this.props.asignatura.nivel_id}, nivel_nombre: Number(e.target.options[e.target.selectedIndex].text.slice(5)) || this.props.asignatura.nivel.nombre })}>
                                <option value={this.props.asignatura.nivel_id}>Seleccione una Opción</option>
                                {
                                    requisitosAsignatura.map((requisitoAsignatura, i) =>
                                        <option key={i} value={requisitoAsignatura.id}>Nivel {requisitoAsignatura.nombre}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 text-right mt-2">
                        <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false), this.props.habilitareditasignaturas(true), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                        <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit()}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    </div>
                    <Horas
                        openHoras={this.state.openHoras}
                        handleCloseHoras={this.handleCloseHoras}
                        asignatura_horas={this.props.asignatura.asignatura_horas}
                        asignaturaId={this.props.asignatura.id}
                        asignaturaNombre={this.props.asignatura.nombre}
                        handleInputArraysAsignatura={this.props.handleInputArraysAsignatura}
                        habilitarGeneral={this.props.habilitarGeneral}
                        habilitadogeneral={this.props.habilitadogeneral}
                        addNotification={this.props.addNotification}
                    />
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
                </div>            
                
            // </Panel>
        );
    }
}