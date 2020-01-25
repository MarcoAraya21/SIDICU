import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { handleInput, handleAddElement, handleAddElementAsignatura, handleInputArrays, handleInputArraysAsignatura, borrarElemento, borrarElementoAsignatura } from '../utiles/lib'
import Show from './show';
import Dominios from './dominios';
import Competencias from './dominios/competencias';
import NivelCompetencias from './dominios/competencias/nivelcompetencias';
import Asignaturas from './asignaturas';
import Diseno from './diseno';
import TreePlan from './tree';



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
            dominios: [],
            usuarios: [],
            competencias_genericas: [],
            asignaturas: [],
            niveles: [],
            habilitadogeneral: true,
        }

        this.handleInput = handleInput.bind(this);
        this.handleInputArrays = handleInputArrays.bind(this);
        this.handleInputArraysAsignatura = handleInputArraysAsignatura.bind(this);
        this.borrarElemento = borrarElemento.bind(this);
        this.borrarElementoAsignatura = borrarElementoAsignatura.bind(this);
        this.handleAddElement = handleAddElement.bind(this);
        this.handleAddElementAsignatura = handleAddElementAsignatura.bind(this);
        //this.renderErrorFor = this.renderErrorFor.bind(this)
        this.habilitarGeneral = this.habilitarGeneral.bind(this);

        this.addNotification = this.addNotification.bind(this);
        this.addNotificationAlert = this.addNotificationAlert.bind(this);

        this.notificationDOMRef = React.createRef();

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

    addNotificationAlert(mensaje) {
        this.notificationDOMRef.current.addNotification({ 
        title: "Error",
        message: mensaje,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "zoomIn"],
        animationOut: ["animated", "zoomOut"],
        dismiss: { duration: 10000 },
        dismissable: { click: true }
        });
    }

    habilitarGeneral(estado){
        this.setState({habilitadogeneral: estado});
    }
    getPlanEstudio() {
        // console.log(projectId);
        axios.get(`/api/plan_estudios/${this.props.match.params.id}`).then((
            response // console.log(response.data.tasks)
        ) =>{
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
                    dominios: response.data.dominios,
                    usuarios: response.data.plan_estudio_usuarios,
                    competencias_genericas: response.data.competencias_genericas,
                    asignaturas: response.data.asignaturas,
                    niveles: response.data.niveles
                })
                // console.log(response.data.informe_avance)
            }            
            //console.log(response.data)
        );
        // axios.get(`/api/dominios`).then((
        //     response // console.log(response.data.tasks)
        // ) =>{
        //     response.data.filter(dominio => !dominio.plan_estudio_id);
        //         this.setState({
        //             generico: response[0]
        //         })
        //         // console.log(response.data.informe_avance)
        //     }            
        //     //console.log(response.data)
        // );           
    }

    componentWillMount() {
        this.getPlanEstudio();
    }

    
    render() {
        // var aux2 = []
        // this.state.dominios && this.state.dominios.map(dominio =>
        //     dominio.competencias.map((competencia,j) =>
        //         [aux2[j] = {'competencia_id': competencia.id, 'logros': 0},
        //         competencia.nivel_competencias.map(nivel_competencia =>
        //             aux2[j].logros = aux2[j].logros + (nivel_competencia.logro_aprendizajes && nivel_competencia.logro_aprendizajes.length)
        //             )
        //         ])
        //     )
        // console.log('logros por competencia', aux2)
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
                        <ul className={"nav nav-tabs " + (!this.state.habilitadogeneral ? "deshabilitado" : "")}>
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
                            <li className="nav-items">
                                <a href="#plan-tab-4" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Diseño</span>
                                    <span className="d-sm-block d-none">Diseño del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-5" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Asignaturas</span>
                                    <span className="d-sm-block d-none">Asignaturas del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-6" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Gráficos</span>
                                    <span className="d-sm-block d-none">Gráficos y Tablas</span>
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
                                usuarios={this.state.usuarios}
                                params={this.props.match.params.id}
                                habilitarGeneral = {this.habilitarGeneral}
                                habilitadogeneral = {this.state.habilitadogeneral} 
                                addNotification = {this.addNotification}/>
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
                                habilitarGeneral = {this.habilitarGeneral}
                                habilitadogeneral = {this.state.habilitadogeneral} 
                                addNotification = {this.addNotification}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-2">
                                <Competencias
                                id={this.state.id}
                                dominios={this.state.dominios}
                                competencias_genericas={this.state.competencias_genericas}
                                handleInputArrays = {this.handleInputArrays}
                                borrarElemento = {this.borrarElemento}
                                handleAddElement = {this.handleAddElement}
                                habilitarGeneral = {this.habilitarGeneral}
                                habilitadogeneral = {this.state.habilitadogeneral}
                                addNotification = {this.addNotification}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-3">
                                <NivelCompetencias
                                dominios = {this.state.dominios}
                                competencias_genericas = {this.state.competencias_genericas}
                                asignaturas = {this.state.asignaturas}
                                handleInputArrays = {this.handleInputArrays}
                                borrarElemento = {this.borrarElemento}
                                handleAddElement = {this.handleAddElement}
                                habilitarGeneral = {this.habilitarGeneral}
                                habilitadogeneral = {this.state.habilitadogeneral}
                                addNotification = {this.addNotification}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-4">
                                <Diseno
                                    asignaturas = {this.state.asignaturas}
                                    niveles = {this.state.niveles}
                                    handleInputArrays = {this.handleInputArrays}
                                    handleInputArraysAsignatura = {this.handleInputArraysAsignatura}
                                    handleAddElement = {this.handleAddElement}
                                    borrarElemento = {this.borrarElemento}
                                    handleAddElementAsignatura = {this.handleAddElementAsignatura}
                                    borrarElementoAsignatura = {this.borrarElementoAsignatura}
                                    habilitarGeneral = {this.habilitarGeneral}
                                    habilitadogeneral = {this.state.habilitadogeneral}
                                    addNotification = {this.addNotification}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-5">
                                <Asignaturas
                                asignaturas = {this.state.asignaturas}
                                niveles = {this.state.niveles}
                                handleInputArrays = {this.handleInputArrays}
                                handleInputArraysAsignatura = {this.handleInputArraysAsignatura}
                                handleAddElement = {this.handleAddElement}
                                borrarElemento = {this.borrarElemento}
                                handleAddElementAsignatura = {this.handleAddElementAsignatura}
                                borrarElementoAsignatura = {this.borrarElementoAsignatura}
                                habilitarGeneral = {this.habilitarGeneral}
                                habilitadogeneral = {this.state.habilitadogeneral}
                                addNotification = {this.addNotification}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-6">
                                <TreePlan id={this.state.id}
                                nombre={this.state.nombre}
                                dominios={this.state.dominios}
                                competencias_genericas={this.state.competencias_genericas}/>
                            </div>
                        </div>			
                    </div>
               </div>
               
               
                <div className="col-12 text-right t-2">
                    <a href="#" className="btn btn-primary">Ver Plan</a>
                    {/* <a href= "/pdf" target="_blank" download className="btn btn-primary"><i className="fas fa-download fa-fw"></i> Descargar</a> */}
                    <a href={`/pdf_descargar/${this.state.id}`} download className="btn btn-primary"><i className="fas fa-download fa-fw"></i> Descargar</a>
                </div>

               



            </div>

        );
    }
}