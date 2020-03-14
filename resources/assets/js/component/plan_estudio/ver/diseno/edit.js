import React, { Component } from 'react'
import Horas from './horas/index'
import Requisitos from './requisitos/index'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nivel: {id:this.props.asignatura.nivel_id, nombre: this.props.asignatura.nivel.nombre},
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
                                value={this.props.asignatura.codigo || ''}
                                onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'codigo', this.props.asignatura.id)}>
                            </input>
                        </div>
                        <div className="form-group col-4">
                            <label>Ciclo</label>
                            <select defaultValue={this.props.asignatura.ciclo_id || ""}
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
                        </div>
                    </div>
                </div>            
                
        );
    }
}