import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { validaciones } from './validaciones';

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
        carreras: [],
        escuelas: [],
        grados: [],
        plan_estudios: {
            nombre: "",
            observacion: "",
            nueva_oferta: false,
            carrera_id: 0,
            tipo_plan_id: 0,
            tipo_formacion_id: 0,
            tipo_grado_id: 0,
            modalidad_id: 0,
            jornada_id: 0,
            academico_id: 0,
            asesor_id: 0,
            titulo_intermedio: "",
            minor: "",
            diploma: ""
        },
        nueva_carrera: {
            nombre: "",
            titulo: "",
            escuela_id: 0,
            grado_id: 0,
        },
        
        otros:{
            titulo_intermedio: false,
            minor: false,
            diploma: false
        },
        usuarios_Academico: [],
        usuarios_Asesor : [],
        errores: {plan:{}, carrera:{}},
        guardando: false,
    }

    this.addNotificationAlert = this.addNotificationAlert.bind(this);
    this.notificationDOMRef = React.createRef();
}

    addNotificationAlert() {
        this.notificationDOMRef.current.addNotification({ 
        title: "Error",
        message: "Ha surgido un conflicto en el proceso de almacenamiento",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "zoomIn"],
        animationOut: ["animated", "zoomOut"],
        dismiss: { duration: 3000 },
        dismissable: { click: true }
        });
    }

    handleInput(e, atributo)
    {
        var plan_estudios = this.state.plan_estudios;
        if(atributo == "tipo_plan_id")
        {
            plan_estudios['tipo_grado_id'] = 0;
            plan_estudios['nueva_oferta'] = false;
            let nueva_carrera = {'nombre': "", 'titulo': "", 'escuela_id': 0, 'grado_id': 0}
            this.setState({nueva_carrera: nueva_carrera})
            plan_estudios['carrera_id'] = 0;
        }
        if(atributo == "tipo_grado_id")
        {
            plan_estudios['tipo_grado_id'] = 0;
            plan_estudios['nueva_oferta'] = false;
            let nueva_carrera = {'nombre': "", 'titulo': "", 'escuela_id': 0, 'grado_id': 0}
            this.setState({nueva_carrera: nueva_carrera})
            plan_estudios['carrera_id'] = 0;
        }
        if(e.target.type == "checkbox")
        {
            if(e.target.id == "cssCheckboxnuevaoferta")
            {
                plan_estudios[atributo] = e.target.checked;
                if(e.target.checked == true)
                {
                    plan_estudios['carrera_id'] = 0;
                }
                else
                {
                    let nueva_carrera = {'nombre': "", 'titulo': "", 'escuela_id': 0, 'grado_id': 0}
                    this.setState({nueva_carrera: nueva_carrera})
                }
            }
        }
        else
        {
            plan_estudios[atributo] = e.target.value;
        }
        this.setState({plan_estudios: plan_estudios});
    }
    
    handleInputCarrera(e, atributo)
    {
        let carrera = this.state.nueva_carrera;
        carrera[atributo] = e.target.value;
        this.setState({nueva_carrera: carrera});
    }

    handleInputOtros(e, atributo)
    {
        if(e.target.type == "checkbox")
        {
            if(e.target.checked == false)
            {
                this.setState({plan_estudios: {...this.state.plan_estudios,[atributo]: ""}})
            }
            this.setState({otros: {...this.state.otros, [atributo]: e.target.checked}})
        }
    }


    handleSubmit() {
        let validaciones2 = validaciones(this.state.plan_estudios, this.state.nueva_carrera, this.state.otros);
        this.setState({errores: validaciones2})
        if(Object.keys(validaciones2.plan).length == 0 && Object.keys(validaciones2.carrera).length == 0)
        {
            this.setState({guardando: true})
            if(this.state.plan_estudios.nueva_oferta == true)
            {
                fetch('/api/carreras',{
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify( 
                        {...this.state.nueva_carrera, tipo_grado_id: this.state.plan_estudios.tipo_grado_id}
                    )
                })
                .then(function(response) {
                    if(response.ok) {
                        return response.json();
                    } else {
                        if(response.redirected)
                        {
                            window.location.href = "/";
                        }
                        throw "Error en la llamada Ajax";
                    }
                })
                .catch( error => {
                    this.addNotificationAlert()
                    this.setState({guardando: false})
                })
                .then(data => {
                    fetch(`/api/plan_estudios`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(  
                            // {
                            //     plan_estudios: this.state.plan_estudios
                            // }
                            {...this.state.plan_estudios, carrera_id: data.id}
                        )
                    })
                    .then(function(response) {
                        if(response.ok) {
                            return response.json();
                        } else {
                            if(response.redirected)
                            {
                                window.location.href = "/";
                            }
                            throw "Error en la llamada Ajax";
                        }
                    })
                    .catch(error => {
                        this.addNotificationAlert()
                    })
                    .then(function(data) {
                        if(data)
                        {
                            window.location.href = ("/Plan/Editar/" + data)
                        }
                    })
                    .finally( () => {
                        this.setState({guardando: false})                    
                    })
                })
            }
            else
            {
                fetch(`/api/plan_estudios`, {
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
                    if(response.ok) {
                        return response.json();
                    } else {
                        if(response.redirected)
                        {
                            window.location.href = "/";
                        }
                        throw "Error en la llamada Ajax";
                    }
                })
                .catch( error => {
                    this.addNotificationAlert()
                })
                .then(function(data) {
                    if(data)
                    {
                        window.location.href = ("/Plan/Editar/" + data)
                    }
                })
                .finally( () => {
                    this.setState({guardando: false})                    
                })
            }
        }
    }                    

    componentWillMount() {
        this.getCarreras();
        this.getEscuelas();
        this.getGrados();
        this.getAcademicos();
        this.getAsesor();
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
    
    getEscuelas() {
        axios.get('/api/escuelas').then((
            response
        ) =>{
                this.setState({
                    escuelas: response.data
                })
            }            
        );        
    }

    getGrados() {
        axios.get('/api/grados').then((
            response
        ) =>{
                this.setState({
                    grados: response.data
                })
            }            
        );        
    }

    getAcademicos() {
        axios.get('/api/academicos').then((
            response
        ) =>{
                this.setState({
                    usuarios_Academico: response.data
                })
            }            
        );        
    }

    getAsesor() {
        axios.get('/api/asesores').then((
            response
        ) =>{
                this.setState({
                    usuarios_Asesor: response.data
                })
            }            
        );        
    }

    render() {
        let escuela = this.state.carreras.find( carrera => carrera.id == parseInt(this.state.plan_estudios.carrera_id)) ?
                                    this.state.carreras.find( carrera => carrera.id == parseInt(this.state.plan_estudios.carrera_id)).escuela
                                    : null;
        let grado = this.state.carreras.find( carrera => carrera.id == parseInt(this.state.plan_estudios.carrera_id)) ?
                                    this.state.carreras.find( carrera => carrera.id == parseInt(this.state.plan_estudios.carrera_id)).grado
                                    : null;
        const HtmlTooltip = withStyles(theme => ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
        }))(Tooltip);
        
        return (
            <div className='container py-4'>
                <ReactNotification ref={this.notificationDOMRef}/>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item active">Inicio</li>
                </ol>
                <h1 className="page-header">Crear Plan de Estudios</h1>
                <div className="panel-body bg-white">
                    <div className="col-12">
                        <div className="col mb-2">
                            <label>Nombre del Plan de Estudios</label>
                            <input type="text"
                                className={ "form-control " + (this.state.errores.plan.nombre && 'is-invalid')} 
                                value={this.state.plan_estudios.nombre || ''}
                                onChange={(e)=>this.handleInput(e, 'nombre')}>
                            </input>
                            {this.state.errores.plan.nombre &&
                                <div className="invalid-feedback">{this.state.errores.plan.nombre}</div>}
                        </div>
                        <div className="col row mb-2">
                            <div className="col-6">
                                <label>Observación</label>
                                <input type="text"
                                    className={ "form-control " + (this.state.errores.plan.observacion && 'is-invalid')} 
                                    value={this.state.plan_estudios.observacion || ''}
                                    onChange={(e)=>this.handleInput(e, 'observacion')}>
                                </input>
                                {this.state.errores.plan.observacion &&
                                    <div className="invalid-feedback">{this.state.errores.plan.observacion}</div>}
                            </div>
                            <div className="col-6">
                                <label>Tipo de Formación</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.plan.tipo_formacion_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'tipo_formacion_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    <option value='1'>Técnica</option>
                                    <option value='2'>Profesional</option>
                                    <option value='3'>Licenciatura</option>
                                </select>
                                {this.state.errores.plan.tipo_formacion_id &&
                                <div className="invalid-feedback">{this.state.errores.plan.tipo_formacion_id}</div>}
                            </div>
                        </div>
                        <div className="col row mb-2">
                            <div className="col-4">
                                <label>Tipo de Plan</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.plan.tipo_plan_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'tipo_plan_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    <option value='1'>Regular</option>
                                    <option value='2'>Prosecución</option>
                                </select>
                                {this.state.errores.plan.tipo_plan_id &&
                                <div className="invalid-feedback">{this.state.errores.plan.tipo_plan_id}</div>}
                            </div>
                            {
                                this.state.plan_estudios.tipo_plan_id != 0 &&
                                <div className="col-4">
                                    <label>Tipo de Grado</label>
                                    <select value={this.state.plan_estudios.tipo_grado_id}
                                        className={ "form-control " + (this.state.errores.plan.tipo_grado_id && 'is-invalid')} 
                                        onChange={(e)=>this.handleInput(e, 'tipo_grado_id')}>
                                        <option disabled value="0">Seleccione una Opción</option>
                                        <option value='1'>Pregrado</option>
                                        {
                                            this.state.plan_estudios.tipo_plan_id == "1" &&
                                            <option value='2'>Postgrado</option>
                                        }
                                    </select>
                                    {this.state.errores.plan.tipo_grado_id &&
                                    <div className="invalid-feedback">{this.state.errores.plan.tipo_grado_id}</div>}
                                </div>
                            }
                            {
                                this.state.plan_estudios.tipo_grado_id != 0 &&
                                <div className="col-4">
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <Typography color="inherit">Información</Typography>
                                            <p>Al seleccionar <b>Nueva Oferta</b> la carrera ingresada no será válida hasta finalizado el plan</p>
                                        </React.Fragment>
                                        }
                                    >
                                    <label>Nueva Oferta <i className="fas fa-info-circle"></i></label>
                                    </HtmlTooltip>
                                    <div className="checkbox checkbox-css">
                                        <input type="checkbox" id="cssCheckboxnuevaoferta" 
                                            checked={this.state.plan_estudios.nueva_oferta}
                                            onChange={(e)=>this.handleInput(e, 'nueva_oferta')}/>
                                        <label htmlFor="cssCheckboxnuevaoferta"></label>
                                    </div>
                                </div>
                            }
                            
                            
                        </div>
                        <div className="col row mb-2">
                            
                        </div>
                        {
                            this.state.plan_estudios.tipo_grado_id != 0 &&
                                (this.state.plan_estudios.nueva_oferta == false ?
                                <div className="col row mb-2">
                                    <div className="col-4">
                                        <label>Carrera</label>
                                        <select defaultValue={""}
                                            className={ "form-control " + (this.state.errores.plan.carrera_id && 'is-invalid')} 
                                            onChange={(e)=>this.handleInput(e, 'carrera_id')}>
                                            <option disabled value="">Seleccione una Opción</option>
                                            {
                                                this.state.carreras.filter(carrera => carrera.tipo_grado_id == this.state.plan_estudios.tipo_grado_id).map(carrera=>
                                                <option value={carrera.id} key={carrera.id}>{carrera.nombre}</option>
                                                )
                                            }
                                        </select>
                                        {this.state.errores.plan.carrera_id &&
                                        <div className="invalid-feedback">{this.state.errores.plan.carrera_id}</div>}
                                    </div>
                                    {
                                        this.state.plan_estudios.carrera_id != 0 &&
                                        <div className="col-4">
                                            <label>Escuela</label>
                                            <p>{escuela ? escuela.nombre : 'No posee'}</p>
                                        </div>
                                    }
                                    {
                                        this.state.plan_estudios.carrera_id != 0 &&
                                        <div className="col-4">
                                            <label>Grado Académico</label>
                                            <p>{grado ? grado.nombre : 'No posee'}</p>
                                        </div>
                                    }
                                </div>
                                :
                                <div className="col row mb-2">
                                    <div className="col-4">
                                        <label data-toggle="tooltip" data-placement="top" title="Tooltip on top">Nombre de la Carrera</label>
                                        <input type="text"
                                            className={ "form-control " + (this.state.errores.carrera.nombre && 'is-invalid')} 
                                            value={this.state.nueva_carrera.nombre || ''}
                                            onChange={(e)=>this.handleInputCarrera(e, 'nombre')}>
                                        </input>
                                        {this.state.errores.carrera.nombre &&
                                        <div className="invalid-feedback">{this.state.errores.carrera.nombre}</div>}
                                    </div>
                                    <div className="col-4">
                                        <label>Título de la Carrera</label>
                                        <input type="text"
                                            className={ "form-control " + (this.state.errores.carrera.titulo && 'is-invalid')} 
                                            value={this.state.nueva_carrera.titulo || ''}
                                            onChange={(e)=>this.handleInputCarrera(e, 'titulo')}>
                                        </input>
                                        {this.state.errores.carrera.titulo &&
                                        <div className="invalid-feedback">{this.state.errores.carrera.titulo}</div>}
                                    </div>
                                    <div className="col-4">
                                        <label>Escuela de la Carrera</label>
                                            <select defaultValue={""}
                                            className={ "form-control " + (this.state.errores.carrera.escuela_id && 'is-invalid')} 
                                            onChange={(e)=>this.handleInputCarrera(e, 'escuela_id')}>
                                            <option disabled value="">Seleccione una Opción</option>
                                            {
                                                this.state.escuelas.map(escuela=>
                                                <option value={escuela.id} key={escuela.id}>{escuela.nombre}</option>
                                                )
                                            }
                                        </select>
                                        {this.state.errores.carrera.escuela_id &&
                                        <div className="invalid-feedback">{this.state.errores.carrera.escuela_id}</div>}
                                    </div>
                                    <div className="col-4">
                                        <label>Grado de la Carrera</label>
                                            <select defaultValue={""}
                                            className={ "form-control " + (this.state.errores.carrera.grado_id && 'is-invalid')} 
                                            onChange={(e)=>this.handleInputCarrera(e, 'grado_id')}>
                                            <option disabled value="">Seleccione una Opción</option>
                                            {
                                                this.state.grados.map(grado=>
                                                <option value={grado.id} key={grado.id}>{grado.nombre}</option>
                                                )
                                            }
                                        </select>
                                        {this.state.errores.carrera.grado_id &&
                                        <div className="invalid-feedback">{this.state.errores.carrera.grado_id}</div>}
                                    </div>
                                </div>
                                )                        
                        }
                        <div className="col row mb-2">
                            <div className="col-3">
                                <label>Jornada</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.plan.jornada_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'jornada_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    <option value='1'>Diurna</option>
                                    <option value='2'>Vespertina</option>
                                </select>
                                {this.state.errores.plan.jornada_id &&
                                <div className="invalid-feedback">{this.state.errores.plan.jornada_id}</div>}
                            </div>
                            <div className="col-3">
                                <label>Modalidad</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.plan.modalidad_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'modalidad_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    <option value='1'>Presencial</option>
                                    <option value='2'>Semi Presencial</option>
                                    <option value='3'>A Distancia</option>
                                </select>
                                {this.state.errores.plan.modalidad_id &&
                                <div className="invalid-feedback">{this.state.errores.plan.modalidad_id}</div>}
                            </div>
                            <div className="col-3">
                                <label>Régimen</label>
                                <p>Semestral</p>
                            </div>
                            <div className="col-3">
                                <label>Ingreso</label>
                                <p>PSU</p>
                            </div>
                        </div>
                        <div className="col row mb-2">
                            <div className="col-6">
                                <label>Asesor Uic</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.plan.asesor_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'asesor_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    {
                                        this.state.usuarios_Asesor.map(usuario=>
                                        <option value={usuario.id} key={usuario.id}>{usuario.nombre} {usuario.apellido_paterno}</option>
                                        )
                                    }
                                </select>
                                {this.state.errores.plan.asesor_id &&
                                <div className="invalid-feedback">{this.state.errores.plan.asesor_id}</div>}
                            </div>
                            <div className="col-6">
                                <label>Coordinador del Cómite</label>
                                <select defaultValue={""}
                                    className={ "form-control " + (this.state.errores.plan.academico_id && 'is-invalid')} 
                                    onChange={(e)=>this.handleInput(e, 'academico_id')}>
                                    <option disabled value="">Seleccione una Opción</option>
                                    {
                                        this.state.usuarios_Academico.map(usuario=>
                                        <option value={usuario.id} key={usuario.id}>{usuario.nombre} {usuario.apellido_paterno}</option>
                                        )
                                    }
                                </select>
                                {this.state.errores.plan.academico_id &&
                                <div className="invalid-feedback">{this.state.errores.plan.academico_id}</div>}
                            </div>
                        </div>
                        <div className="col row mb-2">
                            <div className="col-4">
                                <div className="checkbox checkbox-css">
                                    <input type="checkbox" id="cssCheckboxtitulo" 
                                        checked={this.state.otros.titulo_intermedio}
                                        onChange={(e)=>this.handleInputOtros(e, 'titulo_intermedio')}/>
                                    <label htmlFor="cssCheckboxtitulo">Título Intermedio</label>
                                </div>
                                {
                                this.state.otros.titulo_intermedio == true &&
                                    <React.Fragment>
                                        <input type="text"
                                            className={ "form-control mt-2 " + (this.state.errores.plan.titulo_intermedio && 'is-invalid')} 
                                            value={this.state.plan_estudios.titulo_intermedio || ''}
                                            onChange={(e)=>this.handleInput(e, 'titulo_intermedio')}>
                                        </input>
                                        {this.state.errores.plan.titulo_intermedio &&
                                        <div className="invalid-feedback">{this.state.errores.plan.titulo_intermedio}</div>}
                                    </React.Fragment>
                                }
                            </div>
                            <div className="col-4">
                                <div className="checkbox checkbox-css">
                                    <input type="checkbox" id="cssCheckboxminor" 
                                        checked={this.state.otros.minor}
                                        onChange={(e)=>this.handleInputOtros(e, 'minor')}/>
                                    <label htmlFor="cssCheckboxminor">Minor</label>
                                </div>
                                {
                                    this.state.otros.minor == true &&
                                    <React.Fragment>
                                        <input type="text"
                                            className={ "form-control mt-2 " + (this.state.errores.plan.minor && 'is-invalid')} 
                                            value={this.state.plan_estudios.minor || ''}
                                            onChange={(e)=>this.handleInput(e, 'minor')}>
                                        </input>
                                        {this.state.errores.plan.minor &&
                                        <div className="invalid-feedback">{this.state.errores.plan.minor}</div>}
                                    </React.Fragment>
                                }
                            </div>
                            <div className="col-4">
                                <div className="checkbox checkbox-css">
                                    <input type="checkbox" id="cssCheckboxdiploma" 
                                        checked={this.state.otros.diploma}
                                        onChange={(e)=>this.handleInputOtros(e, 'diploma')}/>
                                    <label htmlFor="cssCheckboxdiploma">Diploma</label>
                                </div>
                                {
                                    this.state.otros.diploma == true &&
                                    <React.Fragment>
                                        <input type="text"
                                            className={ "form-control mt-2 " + (this.state.errores.plan.diploma && 'is-invalid')} 
                                            value={this.state.plan_estudios.diploma || ''}
                                            onChange={(e)=>this.handleInput(e, 'diploma')}>
                                        </input>
                                        {this.state.errores.plan.diploma &&
                                        <div className="invalid-feedback">{this.state.errores.plan.diploma}</div>}
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div align="right" className="mt-2">
                    {
                        this.state.guardando ?
                            <button type="button" className="btn btn-primary disabled">
                                <i className="fas fa-spinner fa-pulse p-r-5" ></i>Crear Plan
                            </button>
                        :                             
                            <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>
                                <i className="fas fa-plus p-r-5" ></i>Crear Plan
                            </button>
                    }
                </div>
            </div>
        );
    }
}

export default Index;


