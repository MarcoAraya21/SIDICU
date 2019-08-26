import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { handleInput, handleAddElement, handleInputArrays, borrarElemento } from '../utiles/lib'
import Show from './show';
import Dominios from './dominios';
import Competencias from './dominios/competencias';
import NivelCompetencias from './dominios/competencias/nivelcompetencias';



export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: 0,
            nombre: '',
            observacion: '',
            proposito: '',
            objetivo: '',
            requisito_admision: '',
            mecanismo_retencion: '',
            requisito_obtencion: '',
            campo_desarrollo: '',
            carrera: {},
            tipo_plan: {},
            tipo_ingreso: {},
            dominios: []
        }

        this.handleInput = handleInput.bind(this);
        this.handleInputArrays = handleInputArrays.bind(this);
        this.borrarElemento = borrarElemento.bind(this);
        this.handleAddElement = handleAddElement.bind(this);
        //this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    getPlanEstudio() {
        // console.log(projectId);
        axios.get(`/api/plan_estudios/${this.props.match.params.id}`).then((
            response // console.log(response.data.tasks)
        ) =>{
                this.setState({
                    plan_estudios: response.data
                })


                this.setState({
                    id: response.data.id,
                    nombre: response.data.nombre,
                    observacion: response.data.observacion,
                    proposito: response.data.proposito,
                    objetivo: response.data.objetivo,
                    requisito_admision:  response.data.requisito_admision,
                    mecanismo_retencion:  response.data.mecanismo_retencion,
                    requisito_obtencion:  response.data.requisito_obtencion,
                    campo_desarrollo:  response.data.campo_desarrollo,
                    carrera: response.data.carrera,
                    tipo_plan: response.data.tipo_plan,
                    tipo_ingreso: response.data.tipo_ingreso,
                    dominios: response.data.dominios

                })
                // console.log(response.data.informe_avance)
            }            
            //console.log(response.data)
        );        
    }

    componentWillMount() {
        this.getPlanEstudio();
    }


    render() {
        return (
            <div className="container py-4">
                <ReactNotification ref={this.notificationDOMRef}/>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item"><Link to="">Inicio</Link></li>
                    <li className="breadcrumb-item active">Plan Estudio</li>
                </ol>
                <h1 className="page-header">Plan {this.props.match.params.id}</h1>
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <ul className="nav nav-tabs">
                            <li className="nav-items">
                                <a href="#plan-tab-show" data-toggle="tab" className="nav-link active">
                                    <span className="d-sm-none">Plan de Estudios</span>
                                    <span className="d-sm-block d-none">Información del Plan de Estudios</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-1" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Dominios</span>
                                    <span className="d-sm-block d-none">Dominios del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-2" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Competencias</span>
                                    <span className="d-sm-block d-none">Competencias del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-3" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Nivel Competencias</span>
                                    <span className="d-sm-block d-none">Niveles de Competencias del Plan</span>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="plan-tab-show">
                                {
                                this.state.id &&
                                <Show id={this.state.id}
                                nombre={this.state.nombre}
                                observacion={this.state.observacion}
                                proposito={this.state.proposito}
                                objetivo={this.state.objetivo}
                                requisito_admision={this.state.requisito_admision}
                                mecanismo_retencion={this.state.mecanismo_retencion}
                                requisito_obtencion={this.state.requisito_obtencion}
                                campo_desarrollo={this.state.campo_desarrollo}
                                carrera={this.state.carrera}
                                tipo_plan={this.state.tipo_plan}
                                tipo_ingreso={this.state.tipo_ingreso}
                                params={this.props.match.params.id}/>
                                }
                            </div>
                            <div className="tab-pane fade" id="plan-tab-1">
                                <Dominios
                                id={this.state.id}
                                dominios={this.state.dominios}
                                handleInput = {this.handleInput}
                                handleInputArrays = {this.handleInputArrays}
                                borrarElemento = {this.borrarElemento}
                                handleAddElement = {this.handleAddElement}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-2">
                                <Competencias
                                id={this.state.id}
                                dominios={this.state.dominios}
                                handleInputArrays = {this.handleInputArrays}
                                borrarElemento = {this.borrarElemento}
                                handleAddElement = {this.handleAddElement}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-3">
                                <NivelCompetencias
                                dominios={this.state.dominios}
                                />
                            </div>
                        </div>			
                    </div>
               </div> 
            </div>

        );
    }
}