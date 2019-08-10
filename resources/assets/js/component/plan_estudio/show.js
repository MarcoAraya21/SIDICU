import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {handleInput, handleInput2, handleTiposResultado, handleInputOtros, handleContenido, handleInputArrays, handleAddElement} from '../utiles/lib';
import { validaciones } from './validaciones';

export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
                proposito: '',
                objetivo: '',
                requisito_admision: '',
                mecanismo_retencion: '',
                requisito_obtencion: '',
                campo_desarrollo: '',
                guardando: false,
                errores: {}
        }
        // this.handleInput = handleInput.bind(this);
        // this.handleInputArrays = handleInputArrays.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();


        //this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleInput(e, atributo)
    {
        this.setState({[atributo]: e.target.value});
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
          title: "Guardado",
          message: "La Información ha sido almacenada",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 3000 },
          dismissable: { click: true }
        });
      }


    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        this.setState({errores: validaciones(this.state, show)})
        fetch('/api/plan_estudios/' + this.props.params, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.state
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
        .then(data => {this.addNotification()} )
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        })
        .finally(() => {this.setState({guardando: false})});
        //console.log('formulario enviado',this.state);
    }

    componentWillMount() {
    }
    render() {
        return (
            <div className="container py-4">
                <ReactNotification ref={this.notificationDOMRef}/>
                <div className="col-12">
                    <legend>Datos Iniciales del Plan</legend>
                    <div className="col row">
                        <p className="col-6">Nombre</p>
                        <p className="col-6" disabled={true}>{this.props.plan_estudios.nombre}</p>
                    </div>
                    <div className="col row">
                        <p className="col-6">Observación</p>
                        <p className="col-6" disabled={true}>{this.props.plan_estudios.observacion}</p>
                    </div>
                    <div className="col row">
                        <div className="col-4">
                            <p className="mb-1">Carrera</p>
                            <p>{this.props.plan_estudios.carrera && this.props.plan_estudios.carrera.nombre}</p> 
                        </div>
                        <div className="col-4">
                            <p className="mb-1">Tipo de Plan</p>
                            <p>{this.props.plan_estudios.tipo_plan && this.props.plan_estudios.tipo_plan.nombre}</p> 
                        </div>
                        <div className="col-4">
                            <p className="mb-1">Tipo de Ingreso</p>
                            <p>{this.props.plan_estudios.tipo_ingreso && this.props.plan_estudios.tipo_ingreso.nombre}</p> 
                        </div>
                    </div>
                    <legend>Otros Datos</legend>
                    <div className="row mb-2">
                        <label className="col-3">Proposito</label>
                        <textarea className={ "form-control col-9 " + (this.state.errores.proposito && 'is-invalid')}  rows="3"
                         value={this.state.proposito || ''}
                         onChange={(e)=>this.handleInput(e, 'proposito')}
                        ></textarea>
                        {this.state.errores.proposito &&
                                <div className="invalid-feedback">{this.state.errores.proposito}</div>}
                    </div>
                    <div className="row mb-2">
                        <label className="col-3">Objetivo</label>
                        <textarea className={ "form-control col-9 " + (this.state.errores.objetivo && 'is-invalid')}  rows="3"
                         value={this.state.objetivo || ''}
                         onChange={(e)=>this.handleInput(e, 'objetivo')}
                        ></textarea>
                        {this.state.errores.objetivo &&
                                <div className="invalid-feedback">{this.state.errores.objetivo}</div>}
                    </div>
                    <div className="row mb-2">
                        <label className="col-3">Requisito de Admisión</label>
                        <textarea className={ "form-control col-9 " + (this.state.errores.requisito_admision && 'is-invalid')}  rows="3"
                         value={this.state.requisito_admision || ''}
                         onChange={(e)=>this.handleInput(e, 'requisito_admision')}
                        ></textarea>
                        {this.state.errores.requisito_admision &&
                                <div className="invalid-feedback">{this.state.errores.requisito_admision}</div>}
                    </div>
                    <div className="row mb-2">
                        <label className="col-3">Mecanismo de Retención</label>
                        <textarea className={ "form-control col-9 " + (this.state.errores.mecanismo_retencion && 'is-invalid')}  rows="3"
                         value={this.state.mecanismo_retencion || ''}
                         onChange={(e)=>this.handleInput(e, 'mecanismo_retencion')}
                        ></textarea>
                        {this.state.errores.mecanismo_retencion &&
                                <div className="invalid-feedback">{this.state.errores.mecanismo_retencion}</div>}
                    </div>
                    <div className="row mb-2">
                        <label className="col-3">Requisito de Obtención</label>
                        <textarea className={ "form-control col-9 " + (this.state.errores.requisito_obtencion && 'is-invalid')}  rows="3"
                         value={this.state.requisito_obtencion || ''}
                         onChange={(e)=>this.handleInput(e, 'requisito_obtencion')}
                        ></textarea>
                        {this.state.errores.requisito_obtencion &&
                                <div className="invalid-feedback" align="right">{this.state.errores.requisito_obtencion}</div>}
                    </div>
                    <div className="row mb-2">
                        <label className="col-3">Campo de Desarrollo</label>
                        <textarea className={ "form-control col-9 " + (this.state.errores.campo_desarrollo && 'is-invalid')}  rows="3"
                         value={this.state.campo_desarrollo || ''}
                         onChange={(e)=>this.handleInput(e, 'campo_desarrollo')}
                        ></textarea>
                        {this.state.errores.campo_desarrollo &&
                                <div className="invalid-feedback">{this.state.errores.campo_desarrollo}</div>}
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    { this.state.guardando ?
                    <button className="btn btn-primary disabled"><i className="fas fa-spinner fa-pulse"></i> Guardando</button>                                
                    :
                    <button type="button" className="btn btn-primary m-b-10" onClick={this.handleSubmit}>Guardar</button>
                    }
                </div>
                {/* <ReactNotification ref={this.notificationDOMRef}/>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item"><Link to="">Inicio</Link></li>
                    <li className="breadcrumb-item active">Plan Estudio</li>
                </ol>
                <h1 className="page-header">Plan {this.props.match.params.id}</h1>
                <div className="col-12">
                    <div className="row p-b-10">
                        <label className="col-3">Nombre</label>
                        <input type="text" className="form-control col-9"
                        value={this.state.plan_estudios.nombre || ''}
                        onChange={(e)=>this.handleInputArrays(e, 'plan_estudios', 'nombre')}></input>
                    </div>
                    <div className="row">
                        <label className="col-3">Observación</label>
                        <textarea className="form-control col-9" rows="3"
                         value={this.state.plan_estudios.observacion || ''}
                         onChange={(e)=>this.handleInputArrays(e, 'plan_estudios', 'observacion')}></textarea>
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    { this.state.guardando ?
                    <button className="btn btn-primary disabled"><i className="fas fa-spinner fa-pulse"></i> Guardando</button>                                
                    :
                    <button type="button" className="btn btn-primary m-b-10" onClick={this.handleSubmit}>Guardar</button>
                    }
                </div> */}
            </div>
        );
    }
}