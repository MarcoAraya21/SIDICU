import React, { Component } from 'react'
import Horas from './horas/index'
import Requisitos from './requisitos/index'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nivel: {id:this.props.asignatura.nivel_id, nombre: this.props.asignatura.nivel.nombre},
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
                <tr>
                    <td>
                        <select defaultValue={""}
                            disabled={this.state.deshabilitado}
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
                    </td>
                    <td>
                        <input type="text" className="form-control"
                            disabled={this.state.deshabilitado}
                            value={this.props.asignatura.codigo || ''}
                            onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'codigo', this.props.asignatura.id)}>
                        </input>
                    </td>
                    <td>
                        <input disabled type="text" className="form-control" placeholder={this.props.asignatura.nombre}>
                        </input>
                    </td>
                    <td>
                        <input disabled type="number" className="form-control"
                            placeholder={(aulas.reduce((previous, current) => {
                                return Number(previous) + Number(current.cantidad);
                            }, 0) +
                                extra_aulas.cantidad) / 2}>
                        </input>
                    </td>
                    <td>
                        {nivel1 ?
                            'Ingreso'
                        :
                            <div className="col-6 text-right mt-2">
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenRequisitos() }}>
                                    <i className="fas fa-plus p-r-5" ></i>Ver Requisitos
                                </button>
                            </div>
                        }
                    </td>
                    <td>
                        <select disabled={requisitosAsignatura.length == 0 || this.state.deshabilitado} defaultValue={""}
                            className="form-control "
                            onChange={(e) => this.setState({ nivel: {id: Number(e.target.value), nombre: Number(e.target.options[e.target.selectedIndex].text.slice(5)) }})}>
                            <option disabled value="">Seleccione una Opción</option>
                            {
                                requisitosAsignatura.map((requisitoAsignatura, i) =>
                                    <option key={i} value={requisitoAsignatura.id}>Nivel {requisitoAsignatura.nombre}</option>
                                )
                            }
                        </select>
                    </td>
                    <td>
                        <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false), this.props.habilitareditasignaturas(true), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    </td>
                    <td>
                        <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit()}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    </td>
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
                </tr>            
                
            // </Panel>
        );
    }
}