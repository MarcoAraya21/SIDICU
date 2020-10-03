import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import VerShow from './ver/show';
import VerRedaccion from './ver/redaccion';
import VerDominios from './ver/dominios';
import VerCompetencias from './ver/competencias';
import VerNivelCompetencias from './ver/nivelcompetencias';
import VerAsignaturas from './ver/asignaturas';
import VerDiseno from './ver/diseno';
import TreePlan from './tree';
import Tabla from './graficos/tabla';
import Grafico from './graficos/grafico';

export default class index extends Component {
    constructor(props) {
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
            redaccion: '',
            perfil_egresado: '',
            perfil_licenciado: '',
            carrera: {},
            tipo_plan: {},
            tipo_ingreso: {},
            dominios: [],
            competencias_genericas: [],
            niveles: [],
            asignaturas: [],
            asesor_uic: {},
            coordinador: {},
            habilitadogeneral: true,
            plan_genericas: [],
            openGrafico:false,
            openTabla:false,
        }

        this.handleOpenGrafico = this.handleOpenGrafico.bind(this);
        this.handleCloseGrafico = this.handleCloseGrafico.bind(this);
        this.handleOpenTabla = this.handleOpenTabla.bind(this);
        this.handleCloseTabla = this.handleCloseTabla.bind(this);   
    }

    handleOpenTabla() {
        this.setState({ openTabla: true });
    }
    handleCloseTabla() {
        this.setState({ openTabla: false });
    }

    handleOpenGrafico() {
        this.setState({ openGrafico: true });
    }
    handleCloseGrafico() {
        this.setState({ openGrafico: false });
    }

    getPlanEstudio() {
        // console.log(projectId);
        axios.get(`/api/finalizado/${this.props.match.params.id}`).then((
            response // console.log(response.data.tasks)
        ) => {
            this.setState({
                id: response.data.id,
                nombre: response.data.nombre,
                observacion: response.data.observacion,
                proposito: response.data.proposito,
                objetivo: response.data.objetivo,
                requisito_admision: response.data.requisito_admision,
                mecanismo_retencion: response.data.mecanismo_retencion,
                requisito_obtencion: response.data.requisito_obtencion,
                campo_desarrollo: response.data.campo_desarrollo,
                redaccion: response.data.redaccion,
                perfil_egresado: response.data.perfil_egresado,
                perfil_licenciado: response.data.perfil_licenciado,
                carrera: response.data.carrera,
                tipo_plan: response.data.tipo_plan,
                tipo_ingreso: response.data.tipo_ingreso,
                dominios: response.data.dominios,
                competencias_genericas: response.data.competencias_genericas,
                niveles: response.data.niveles,
                asignaturas: response.data.asignaturas,
                asesor_uic: response.data.asesor_uic,
                coordinador: response.data.coordinador,
                plan_genericas: response.data.nivel_genericas
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
        if(this.state.id)
        {
        return (
            <div className="container py-4">
                <ReactNotification ref={this.notificationDOMRef} />
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
                                    <span className="d-sm-none">Redacción</span>
                                    <span className="d-sm-block d-none">Redacción del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-2" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Dominios</span>
                                    <span className="d-sm-block d-none">Dominios del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-3" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Competencias</span>
                                    <span className="d-sm-block d-none">Competencias del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-4" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Nivel Competencias</span>
                                    <span className="d-sm-block d-none">Niveles de Competencias del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-5" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Diseño</span>
                                    <span className="d-sm-block d-none">Diseño del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#plan-tab-6" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Asignaturas</span>
                                    <span className="d-sm-block d-none">Asignaturas del Plan</span>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="plan-tab-show">
                                <VerShow
                                    id={this.state.id}
                                    nombre={this.state.nombre}
                                    observacion={this.state.observacion}
                                    proposito={this.state.proposito}
                                    objetivo={this.state.objetivo}
                                    requisito_admision={this.state.requisito_admision}
                                    mecanismo_retencion={this.state.mecanismo_retencion}
                                    requisito_obtencion={this.state.requisito_obtencion}
                                    campo_desarrollo={this.state.campo_desarrollo}
                                    perfil_egresado={this.state.perfil_egresado}
                                    perfil_licenciado={this.state.perfil_licenciado}
                                    carrera={this.state.carrera}
                                    tipo_plan={this.state.tipo_plan}
                                    tipo_ingreso={this.state.tipo_ingreso}
                                    asesor_uic={this.state.asesor_uic}
                                    coordinador={this.state.coordinador}
                                    params={this.props.match.params.id}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-1">
                                <VerRedaccion
                                    id={this.state.id}
                                    redaccion={this.state.redaccion}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-2">
                                <VerDominios
                                    id={this.state.id}
                                    dominios={this.state.dominios}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-3">
                                <VerCompetencias
                                    id={this.state.id}
                                    dominios={this.state.dominios}
                                    competencias_genericas={this.state.competencias_genericas}
                                />                                
                            </div>
                            <div className="tab-pane fade" id="plan-tab-4">
                                <VerNivelCompetencias
                                    dominios={this.state.dominios}
                                    competencias_genericas={this.state.competencias_genericas}
                                    asignaturas={this.state.asignaturas}
                                />                                
                            </div>
                            <div className="tab-pane fade" id="plan-tab-5">
                                <VerDiseno
                                    asignaturas={this.state.asignaturas}
                                    niveles={this.state.niveles}
                                />                                
                            </div>
                            <div className="tab-pane fade" id="plan-tab-6">
                                <VerAsignaturas
                                    asignaturas={this.state.asignaturas}
                                    niveles={this.state.niveles}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-right t-2">
                    <div className="btn-group">
                        <a href="#" onClick={()=> this.handleOpenTabla(this.setState({openTabla:true}))} className="btn btn-primary"><i className="fas fa-eye fa-fw"></i> Ver Plan</a>
                        <a href="#" className="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown"></a>
                        <ul className="dropdown-menu pull-right">
                            <li><a onClick={()=> this.handleOpenTabla(this.setState({openTabla:true}))}>Tabla</a></li>
                            <li><a onClick={()=> this.handleOpenGrafico(this.setState({openGrafico:true}))}>Gráfico</a></li>
                        </ul>
                    </div>
            
                    <Tabla id={this.state.id}
                                    nombre={this.state.nombre}
                                    dominios={this.state.dominios}
                                    competencias_genericas={this.state.competencias_genericas}
                                    asignaturas={this.state.asignaturas}
                                    openTabla = {this.state.openTabla}
                                    handleCloseTabla = {this.handleCloseTabla}
                    />
                    <Grafico id={this.state.id}
                                    nombre={this.state.nombre}
                                    dominios={this.state.dominios}
                                    competencias_genericas={this.state.competencias_genericas}
                                    openGrafico = {this.state.openGrafico}
                                    handleCloseGrafico = {this.handleCloseGrafico}
                    />
                        {/* <a href= "/pdf" target="_blank" download className="btn btn-primary"><i className="fas fa-download fa-fw"></i> Descargar</a> */}
                        <a href={`/pdf_descargar/${this.state.id}`} download className="btn btn-primary"><i className="fas fa-download fa-fw"></i> Descargar</a>
                </div>
            </div>
            );
        }
        else
        {
            return 'Acceso Denegado';
        }       
    }
}