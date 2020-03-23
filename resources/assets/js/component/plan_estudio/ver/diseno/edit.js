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
        }
        this.handleOpenHoras = this.handleOpenHoras.bind(this);
        this.handleCloseHoras = this.handleCloseHoras.bind(this);
        this.handleOpenRequisitos = this.handleOpenRequisitos.bind(this);
        this.handleCloseRequisitos = this.handleCloseRequisitos.bind(this);
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

    render() {
        var aulas = this.props.asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora.nombre != 'Extra Aula');
        var extra_aulas = this.props.asignatura.asignatura_horas.find(asignatura_hora => asignatura_hora.tipo_hora.nombre == 'Extra Aula');
        if (this.props.asignatura.nivel.nombre == 1) {
            var nivel1 = true;
        }
        else {
            var requisitoNiveles = [];
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
                            <p>{this.props.asignatura.codigo || ''}</p>
                        </div>
                        <div className="form-group col-4">
                            <label>Ciclo</label>
                            <p>{this.props.asignatura.ciclo_id || ""}</p>
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
                                <button type="button" className="btn btn-primary" onClick={() => { this.handleOpenHoras() }}>
                                    <i className="fas fa-eye p-r-5" ></i>Ver Horas
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
                                <button type="button" className="btn btn-primary" onClick={() => { this.handleOpenRequisitos() }}>
                                    <i className="fas fa-eye p-r-5" ></i>Ver Requisitos
                                </button>
                            }
                            </p>
                        </div>
                    </div>
                    <Horas
                        openHoras={this.state.openHoras}
                        handleCloseHoras={this.handleCloseHoras}
                        asignatura_horas={this.props.asignatura.asignatura_horas}
                        asignaturaId={this.props.asignatura.id}
                        asignaturaNombre={this.props.asignatura.nombre}
                    />
                    <Requisitos
                        openRequisitos={this.state.openRequisitos}
                        handleCloseRequisitos={this.handleCloseRequisitos}
                        requisitos={this.props.asignatura.requisitos}
                        opcionRequisitos={this.props.asignaturas.filter(asignatura =>
                            asignatura.nivel.nombre < this.props.asignatura.nivel.nombre)}
                        asignaturaId={this.props.asignatura.id}
                        asignaturaNombre={this.props.asignatura.nombre}
                    />
                </div>            
        );
    }
}