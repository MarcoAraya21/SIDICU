import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { handleInput, handleAddElement, handleAddElementAsignatura, handleInputArrays, handleInputArraysAsignatura, handleUpdate, handleUpdateOtros, handleUpdateRedaccion, borrarElemento, borrarElementoAsignatura } from '../utiles/lib'
import VerShow from './ver/show';
import EditarShow from './editar/show';
import VerRedaccion from './ver/redaccion'
import EditarRedaccion from './editar/redaccion'
import VerDominios from './ver/dominios';
import EditarDominios from './editar/dominios';
import VerCompetencias from './ver/competencias';
import EditarCompetencias from './editar/competencias';
import VerNivelCompetencias from './ver/nivelcompetencias';
import EditarNivelCompetencias from './editar/nivelcompetencias';
import VerAsignaturas from './ver/asignaturas';
import EditarAsignaturas from './editar/asignaturas';
import VerDiseno from './ver/diseno';
import EditarDiseno from './editar/diseno';
import TreePlan from './tree';
import Resumen from './resumen';
// import Indicadores from './indicadores'
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
            acceso: 0,
            comp_genericas: [],
            openGrafico:false,
            openTabla:false,

        }

        this.handleInput = handleInput.bind(this);
        this.handleInputArrays = handleInputArrays.bind(this);
        this.handleInputArraysAsignatura = handleInputArraysAsignatura.bind(this);
        this.handleUpdate = handleUpdate.bind(this);
        this.handleUpdateOtros = handleUpdateOtros.bind(this);
        this.handleUpdateRedaccion = handleUpdateRedaccion.bind(this);
        this.borrarElemento = borrarElemento.bind(this);
        this.borrarElementoAsignatura = borrarElementoAsignatura.bind(this);
        this.handleAddElement = handleAddElement.bind(this);
        this.handleAddElementAsignatura = handleAddElementAsignatura.bind(this);
        //this.renderErrorFor = this.renderErrorFor.bind(this)
        this.habilitarGeneral = this.habilitarGeneral.bind(this);

        this.addNotification = this.addNotification.bind(this);
        this.addNotificationAlert = this.addNotificationAlert.bind(this);
        this.addNotificationWarning = this.addNotificationWarning.bind(this);
        this.notificationDOMRef = React.createRef();

        this.handleOpenGrafico = this.handleOpenGrafico.bind(this);
        this.handleCloseGrafico = this.handleCloseGrafico.bind(this);
        this.handleOpenTabla = this.handleOpenTabla.bind(this);
        this.handleCloseTabla = this.handleCloseTabla.bind(this);   
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
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }

    addNotificationWarning(mensaje) {
        this.notificationDOMRef.current.addNotification({
            title: "Advertencia",
            message: mensaje,
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "zoomIn"],
            animationOut: ["animated", "zoomOut"],
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
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
    
    habilitarGeneral(estado) {
        this.setState({ habilitadogeneral: estado });
    }

    getPlanEstudio() {
        // console.log(projectId);
        axios.get(`/api/editar/${this.props.match.params.id}`).then((
            response // console.log(response.data.tasks)
        ) => {
            this.setState({
                id: response.data[0].id,
                nombre: response.data[0].nombre,
                observacion: response.data[0].observacion,
                proposito: response.data[0].proposito,
                objetivo: response.data[0].objetivo,
                requisito_admision: response.data[0].requisito_admision,
                mecanismo_retencion: response.data[0].mecanismo_retencion,
                requisito_obtencion: response.data[0].requisito_obtencion,
                campo_desarrollo: response.data[0].campo_desarrollo,
                redaccion: response.data[0].redaccion,
                perfil_egresado: response.data[0].perfil_egresado,
                perfil_licenciado: response.data[0].perfil_licenciado,
                carrera: response.data[0].carrera,
                tipo_plan: response.data[0].tipo_plan,
                tipo_ingreso: response.data[0].tipo_ingreso,
                dominios: response.data[0].dominios,
                competencias_genericas: response.data[0].competencias_genericas,
                niveles: response.data[0].niveles,
                asignaturas: response.data[0].asignaturas,
                asesor_uic: response.data[0].asesor_uic,
                coordinador: response.data[0].coordinador,
                plan_genericas: response.data[0].nivel_genericas,
                acceso: response.data[1]
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
    getGenericas() {
        axios.get('/api/competencias_genericas').then((
            response
        ) =>{
                this.setState({comp_genericas: response.data});
            }            
        );        
    }

    componentWillMount() {
        this.getPlanEstudio();
        this.getGenericas();
    }


    render() {
        if(this.state.acceso == 1 || this.state.acceso == 2 || this.state.acceso == 3)
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
                            <ul className={"nav nav-tabs " + (!this.state.habilitadogeneral ? "deshabilitado" : "")}>
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
                                {/* <li className="nav-items">
                                    <a href="#plan-tab-7" data-toggle="tab" className="nav-link">
                                        <span className="d-sm-none">Gráficos</span>
                                        <span className="d-sm-block d-none">Gráficos y Tablas</span>
                                    </a>
                                </li> */}
                                <li className="nav-items">
                                    <a href="#plan-tab-8" data-toggle="tab" className="nav-link">
                                        <span className="d-sm-none">Finalizar</span>
                                        <span className="d-sm-block d-none">Finalizar Plan</span>
                                    </a>
                                </li>
                                {/* <li className="nav-items">
                                    <a href="#plan-tab-9" data-toggle="tab" className="nav-link">
                                        <span className="d-sm-none">Indicadores</span>
                                        <span className="d-sm-block d-none">Indicadores del Plan</span>
                                    </a>
                                </li> */}
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="plan-tab-show">
                                    {
                                        this.state.id &&
                                        this.state.acceso == 1 ?
                                            <EditarShow
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
                                                habilitarGeneral={this.habilitarGeneral}
                                                habilitadogeneral={this.state.habilitadogeneral}
                                                addNotification={this.addNotification}
                                                addNotificationAlert={this.addNotificationAlert}
                                                addNotificationWarning={this.addNotificationWarning}
                                                handleUpdateOtros={this.handleUpdateOtros}
                                            />
                                        :
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
                                    }
                                </div>
                                <div className="tab-pane fade" id="plan-tab-1">
                                    {
                                        this.state.acceso == 1 ?
                                        <EditarRedaccion
                                            redaccion={this.state.redaccion}
                                            params={this.props.match.params.id}
                                            habilitarGeneral={this.habilitarGeneral}
                                            habilitadogeneral={this.state.habilitadogeneral}
                                            addNotification={this.addNotification}
                                            addNotificationAlert={this.addNotificationAlert}
                                            addNotificationWarning={this.addNotificationWarning}
                                            handleUpdateRedaccion={this.handleUpdateRedaccion}
                                        />
                                        :
                                        <VerRedaccion
                                            id={this.state.id}
                                            redaccion={this.state.redaccion}
                                        />
                                    }
                                </div>
                                <div className="tab-pane fade" id="plan-tab-2">
                                    {
                                        this.state.acceso == 1 ?
                                        <EditarDominios
                                            id={this.state.id}
                                            dominios={this.state.dominios}
                                            handleInput={this.handleInput}
                                            handleUpdate={this.handleUpdate}
                                            borrarElemento={this.borrarElemento}
                                            handleAddElement={this.handleAddElement}
                                            habilitarGeneral={this.habilitarGeneral}
                                            habilitadogeneral={this.state.habilitadogeneral}
                                            addNotification={this.addNotification}
                                            addNotificationAlert={this.addNotificationAlert}
                                        />
                                        :
                                        <VerDominios
                                            id={this.state.id}
                                            dominios={this.state.dominios}
                                        />
                                    }
                                </div>
                                <div className="tab-pane fade" id="plan-tab-3">
                                    {
                                        this.state.acceso == 1 ?
                                        <EditarCompetencias
                                            id={this.state.id}
                                            dominios={this.state.dominios}
                                            competencias_genericas={this.state.competencias_genericas}
                                            comp_genericas = {this.state.comp_genericas}
                                            handleUpdate={this.handleUpdate}
                                            borrarElemento={this.borrarElemento}
                                            handleAddElement={this.handleAddElement}
                                            habilitarGeneral={this.habilitarGeneral}
                                            habilitadogeneral={this.state.habilitadogeneral}
                                            addNotification={this.addNotification}
                                            addNotificationAlert={this.addNotificationAlert}
                                        />
                                        :
                                        <VerCompetencias
                                            id={this.state.id}
                                            dominios={this.state.dominios}
                                            competencias_genericas={this.state.competencias_genericas}
                                        />
                                    }
                                    
                                </div>
                                <div className="tab-pane fade" id="plan-tab-4">
                                    {
                                        this.state.acceso == 1 ?
                                        <EditarNivelCompetencias
                                            dominios={this.state.dominios}
                                            competencias_genericas={this.state.competencias_genericas}
                                            asignaturas={this.state.asignaturas}
                                            plan_genericas={this.state.plan_genericas}
                                            handleUpdate={this.handleUpdate}
                                            borrarElemento={this.borrarElemento}
                                            handleAddElement={this.handleAddElement}
                                            habilitarGeneral={this.habilitarGeneral}
                                            habilitadogeneral={this.state.habilitadogeneral}
                                            addNotification={this.addNotification}
                                            addNotificationAlert={this.addNotificationAlert}
                                        />
                                        :
                                        <VerNivelCompetencias
                                            dominios={this.state.dominios}
                                            competencias_genericas={this.state.competencias_genericas}
                                            asignaturas={this.state.asignaturas}
                                        />
                                    }
                                    
                                </div>
                                <div className="tab-pane fade" id="plan-tab-5">
                                    {
                                        this.state.acceso == 1 ?
                                        <EditarDiseno
                                            asignaturas={this.state.asignaturas}
                                            niveles={this.state.niveles}
                                            handleUpdate={this.handleUpdate}
                                            handleInputArraysAsignatura={this.handleInputArraysAsignatura}
                                            handleAddElement={this.handleAddElement}
                                            borrarElemento={this.borrarElemento}
                                            handleAddElementAsignatura={this.handleAddElementAsignatura}
                                            borrarElementoAsignatura={this.borrarElementoAsignatura}
                                            habilitarGeneral={this.habilitarGeneral}
                                            habilitadogeneral={this.state.habilitadogeneral}
                                            addNotification={this.addNotification}
                                            addNotificationAlert={this.addNotificationAlert}
                                        />
                                        :
                                        <VerDiseno
                                            asignaturas={this.state.asignaturas}
                                            niveles={this.state.niveles}
                                        />
                                    }
                                    
                                </div>
                                <div className="tab-pane fade" id="plan-tab-6">
                                    {
                                        this.state.acceso == 1 || this.state.acceso == 2 ?
                                        <EditarAsignaturas
                                            asignaturas={this.state.asignaturas}
                                            niveles={this.state.niveles}
                                            dominios={this.state.dominios}
                                            comp_genericas = {this.state.comp_genericas}
                                            handleUpdate={this.handleUpdate}
                                            handleInputArraysAsignatura={this.handleInputArraysAsignatura}
                                            handleAddElement={this.handleAddElement}
                                            borrarElemento={this.borrarElemento}
                                            handleAddElementAsignatura={this.handleAddElementAsignatura}
                                            borrarElementoAsignatura={this.borrarElementoAsignatura}
                                            habilitarGeneral={this.habilitarGeneral}
                                            habilitadogeneral={this.state.habilitadogeneral}
                                            addNotification={this.addNotification}
                                            addNotificationAlert={this.addNotificationAlert}
                                        />
                                        :
                                        <VerAsignaturas
                                            asignaturas={this.state.asignaturas}
                                            niveles={this.state.niveles}
                                        />
                                    }
                                    
                                </div>
                                {/* <div className="tab-pane fade" id="plan-tab-7">
                                    <TreePlan id={this.state.id}
                                nombre={this.state.nombre}
                                dominios={this.state.dominios}
                                competencias_genericas={this.state.competencias_genericas}/>
                                </div> */}
                                <div className="tab-pane fade" id="plan-tab-8">
                                    <Resumen
                                        params={this.props.match.params.id}
                                        proposito={this.state.proposito}
                                        objetivo={this.state.objetivo}
                                        requisito_admision={this.state.requisito_admision}
                                        mecanismo_retencion={this.state.mecanismo_retencion}
                                        requisito_obtencion={this.state.requisito_obtencion}
                                        campo_desarrollo={this.state.campo_desarrollo}
                                        redaccion={this.state.redaccion}
                                        perfil_egresado={this.state.perfil_egresado}
                                        perfil_licenciado={this.state.perfil_licenciado}

                                        dominios={this.state.dominios}
                                        competencias_genericas={this.state.competencias_genericas}
                                        asignaturas={this.state.asignaturas}

                                        acceso={this.state.acceso}
                                        addNotification={this.addNotification}
                                        addNotificationAlert={this.addNotificationAlert}
                                    />                                        
                                </div>
                                {/* <div className="tab-pane fade" id="plan-tab-9">
                                    <Indicadores
                                        dominios={this.state.dominios}
                                        competencias_genericas={this.state.competencias_genericas}
                                        asignaturas={this.state.asignaturas}

                                        addNotification={this.addNotification}
                                        addNotificationAlert={this.addNotificationAlert}
                                    />                                        
                                </div> */}
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
            return "Acceso Denegado";
        }
    }
}