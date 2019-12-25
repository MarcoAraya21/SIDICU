import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
    }

    // addElemento(variable){
    //     //e.preventDefault();
    //     fetch(`/api/${variable}/`, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type':'application/json'
    //         }
    //         ,
    //         body: JSON.stringify(
    //             {dominio_id:  this.props.dominio.id}
    //         )
    //     })
    //     .then(function(response) {
    //         if(response.ok) {
    //             return response.json();
    //         } else {
    //             throw "Error en la llamada Ajax";
    //         }
         
    //      })
    //     .then(data => {[this.props.handleAddElement(variable, data),this.props.addNotification()]} )
    //     .catch(function(error) {
    //         console.log('Hubo un problema con la petición Fetch:' + error.message);
    //     })
    // }
    

    
    render() {
        return (
            <div className="panel-body bg-white">
                <div className="col-12 mb-2">
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Nombre</label>
                            <input type="text" className="form-control">
                            </input>
                        </div>
                        <div className="col-6">
                            <label>Codigo</label>
                            <input type="text" className="form-control">
                            </input>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-4">
                            <label>Tipo de Asignatura</label>
                            <select className="form-control">
                                <option disabled value="">Seleccione una Opción</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <label>Requisito</label>
                            <select className="form-control">
                                <option disabled value="">Seleccione una Opción</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <label>Modalidad</label>
                            <select className="form-control">
                                <option disabled value="">Seleccione una Opción</option>
                            </select>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Ciclo o Programa de Formación</label>
                            <select className="form-control">
                                <option disabled value="">Seleccione una Opción</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Departamento</label>
                            <select className="form-control">
                                <option disabled value="">Seleccione una Opción</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className="col mb-2">
                        <label>Descripción</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Relación con el perfil de egreso</label>
                        <textarea disabled className="form-control" rows="3"></textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Metodología de enseñanza y aprendizaje</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Ambientes de aprendizaje</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del docente</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <div className="col mb-2">
                        <label>Perfil del ayudante</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                </div>
                <div className="col-12 mb-2 row">
                    <div className="col-4">
                        <strong>Horas</strong>
                        <ol>
                            <li>
                                Aula: 6
                                <ul>
                                    <li>Teoria: 4</li>
                                    <li>Taller: 0</li>
                                    <li>Laboratorio: 2</li>
                                </ul>
                            </li>
                            <li>Extra Aula: 6</li>
                        </ol>
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary">      
                                <i className="fas fa-plus p-r-5" ></i>Modificar Horas
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <strong>Unidades</strong>
                        <ol>
                            <li>Unidad 1</li>
                            <li>Unidad 2</li>
                            <li>Unidad 3</li>
                        </ol>
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary">      
                                <i className="fas fa-plus p-r-5" ></i>Unidades
                            </button>
                        </div>
                    </div>
                    <div className="col-4">
                        <strong>Bibliografia</strong>
                        <ol>
                            <li>Bibliografia 1</li>
                            <li>Bibliografia 2</li>
                            <li>Bibliografia 3</li>
                        </ol>
                        <div>
                            <button type="button" disabled={!this.state.deshabilitado} className="btn btn-primary">      
                                <i className="fas fa-plus p-r-5" ></i>Unidades
                            </button>
                        </div>
                    </div> 
                </div>
                <div className="col-12 row">
                    <div className="col-6">
                        <strong>Competencias</strong>
                        <ol>
                            <li>
                                Competencia 1
                                <a className="m-l-5" href="" target="_blank">
                                    <span className="badge badge-info">Ver</span>
                                </a>
                            </li>
                            <li>
                                Competencia 2
                                <a className="m-l-5" href="" target="_blank">
                                    <span className="badge badge-info">Ver</span>
                                </a>
                            </li>
                            <li>
                                Competencia 3
                                <a className="m-l-5" href="" target="_blank">
                                    <span className="badge badge-info">Ver</span>
                                </a>
                            </li>
                        </ol>
                    </div> 
                    <div className="col-6">
                        <strong>Competencias Genericas</strong>
                        <ol>
                            <li>
                                Competencia Generica 1
                                <a className="m-l-5" href="" target="_blank">
                                    <span className="badge badge-info">Ver</span>
                                </a>
                            </li>
                            <li>
                                Competencia Generica 2
                                <a className="m-l-5" href="" target="_blank">
                                    <span className="badge badge-info">Ver</span>
                                </a>
                            </li>
                            <li>
                                Competencia Generica 3
                                <a className="m-l-5" href="" target="_blank">
                                    <span className="badge badge-info">Ver</span>
                                </a>
                            </li>
                        </ol>
                    </div>  
                </div>
                <div align="right" className="mt-2 mb-1">
                    <button type="button" className="btn btn-primary">      
                        <i className="fas fa-plus p-r-5" ></i>Guardar
                    </button>
                </div> 
            </div>        
        );
    }
}