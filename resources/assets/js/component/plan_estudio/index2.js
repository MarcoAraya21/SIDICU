import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validaciones } from './validaciones';

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
        carreras: [],
        plan_estudios: {
            nombre: "",
            observacion: "",
            carrera_id: 0,
            tipo_plan_id: 0,
            tipo_ingreso_id: 0,
            uic_id: 0,
            academico_id: 0,
        },
        usuarios_UIC: [],
        usuarios_Academico: [],
        errores: {},
    }}

    handleInput(e, atributo)
    {
        let plan_estudios2 = this.state.plan_estudios;
        plan_estudios2[atributo] = e.target.value;
        this.setState({plan_estudios: plan_estudios2});
    }


    handleSubmit(){
        this.setState({errores: validaciones(this.state.plan_estudios)})
        fetch('/api/plan_estudios/',{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(  
                // {
                //     plan_estudios: this.state.plan_estudios
                // }
                this.state.plan_estudios
            )
        })
        .then(function(response) {
            console.log('response', response)
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
        
        })
        .catch(function(error) {
            console.log(error);
        })
        .then( data =>
        {
            if(data)
            {
                window.location.href = ("/" + data.id)
            }
        })
    }


    componentWillMount() {
    this.getCarreras();
    this.getUsuarios();
    }

    getCarreras() {
        axios.get('/api/carreras').then((
            response
        ) =>{
                this.setState({
                    carreras: response.data
                })
            }            
        );        
    }

    getUsuarios() {
        axios.get('/api/usuarios').then((
            response
        ) =>{
                this.setState({
                    usuarios_UIC: response.data.filter(usuario => usuario.perfil_id == 1),
                    usuarios_Academico: response.data.filter(usuario => usuario.perfil_id == 2)
                })
            }            
        );        
    }

    render() {
        return (
            <div className='container py-4'>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item active">Inicio</li>
                </ol>
                <h1 className="page-header">Nuevo Plan de Estudios</h1>
                <div className="panel-body bg-white">
                    <div className="col-12">
                        <div className="col mb-2">
                            <label>Nombre del Plan de Estudios</label>
                            <input type="text"
                                className={ "form-control " + (this.state.errores.nombre && 'is-invalid')} 
                                value={this.state.plan_estudios.nombre || ''}
                                onChange={(e)=>this.handleInput(e, 'nombre')}>
                            </input>
                            {this.state.errores.nombre &&
                                <div className="invalid-feedback">{this.state.errores.nombre}</div>}
                        </div>
                        <div className="col mb-2">
                            <label>Observación</label>
                            <input type="text"
                                className={ "form-control " + (this.state.errores.observacion && 'is-invalid')} 
                                value={this.state.plan_estudios.observacion || ''}
                                onChange={(e)=>this.handleInput(e, 'observacion')}>
                            </input>
                            {this.state.errores.observacion &&
                                <div className="invalid-feedback">{this.state.errores.observacion}</div>}
                        </div>
                        <div className="col row mb-2">
                            <div className="col-4">
                                <label>Carrera</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.carrera_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'carrera_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    {
                                        this.state.carreras.map(carrera=>
                                        <option value={carrera.id} key={carrera.id}>{carrera.nombre}</option>
                                        )
                                    }
                                </select>
                                {this.state.errores.carrera_id &&
                                <div className="invalid-feedback">{this.state.errores.carrera_id}</div>}
                            </div>
                            <div className="col-4">
                                <label>Tipo de Plan</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.tipo_plan_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'tipo_plan_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    <option value='1'>Regular</option>
                                    <option value='2'>Prosecución</option>
                                </select>
                                {this.state.errores.tipo_plan_id &&
                                <div className="invalid-feedback">{this.state.errores.tipo_plan_id}</div>}
                            </div>
                            <div className="col-4">
                                <label>Tipo de Ingreso</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.tipo_ingreso_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'tipo_ingreso_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    <option value='1'>PSU</option>
                                </select>
                                {this.state.errores.tipo_ingreso_id &&
                                <div className="invalid-feedback">{this.state.errores.tipo_ingreso_id}</div>}
                            </div>
                        </div>
                        <div className="col row mb-2">
                            <div className="col-6">
                                <label>Responsable UIC</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.uic_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'uic_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    {
                                        this.state.usuarios_UIC.map(usuario=>
                                        <option value={usuario.id} key={usuario.id}>{usuario.nombre}</option>
                                        )
                                    }
                                </select>
                                {this.state.errores.uic_id &&
                                <div className="invalid-feedback">{this.state.errores.uic_id}</div>}
                            </div>
                            <div className="col-6">
                                <label>Coordinador del Cómite</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.academico_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'academico_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    {
                                        this.state.usuarios_Academico.map(usuario=>
                                        <option value={usuario.id} key={usuario.id}>{usuario.nombre}</option>
                                        )
                                    }
                                </select>
                                {this.state.errores.academico_id &&
                                <div className="invalid-feedback">{this.state.errores.academico_id}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div align="right" className="mt-2">
                    <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>
                        <i className="fas fa-plus p-r-5" ></i>Crear Plan
                    </button>
                </div>
            </div> 
        );
    }
}

export default Index;


