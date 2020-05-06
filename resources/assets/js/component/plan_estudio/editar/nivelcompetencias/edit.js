import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Logros from './logrosaprendizajes';
import Asignatura from './asignaturas';



export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            nivel_competencia: {
                descripcion: '',
            },
            open: false,
            openAsignatura: false,
            deshabilitado: true,
            editando: false,
            guardando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenAsignatura = this.handleOpenAsignatura.bind(this);
        this.handleCloseAsignatura = this.handleCloseAsignatura.bind(this);
        this.habilitar = this.habilitar.bind(this);

        this.irAsignatura = this.irAsignatura.bind(this);
        
    }

    componentWillMount() {
        this.props.nivel_competencia &&
        this.setState({nivel_competencia: {descripcion: this.props.nivel_competencia.descripcion}})
    }
    
    irAsignatura(asignatura)
    {
        document.querySelector('a[href="#plan-tab-4"]').click();
        document.querySelector('a[href="#nivel-tab-1"]').click();

        // if(asignatura.nivel)
        // nivel tab show 
        // o nivel tab x
        // setTimeout(() => {
        //     document.getElementById('panel-' + solicitud).scrollIntoView();
        // }, 500);
    }

    habilitar(){
        this.setState({deshabilitado: false});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleCloseAsignatura() {
        this.setState({openAsignatura: false});
    }

    handleOpenAsignatura() {
        this.setState({openAsignatura: true});
    }

    // codigo para agregar dominios
    // componentWillMount(){
    //     this.props.presupuestos.map(
    //         (presupuesto, i) =>
    //         this.handleAddElement('gasto_conceptos', {presupuesto_item_id: presupuesto.id, monto: 0})
    //     );
    // }

    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/nivel_competencias/' + this.props.nivel_competencia.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.state.nivel_competencia
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
        .then(data => {[this.props.handleUpdate(this.state.nivel_competencia, "nivel_competencias", this.props.nivel_competencia.id), this.props.addNotification()]} )
        .catch(error => {
            [this.props.addNotificationAlert('No se ha podido guardar.'), this.setState({nivel_competencia: {...this.state.nivel_competencia, descripcion: this.props.nivel_competencia.descripcion}})]
        })
        .finally(() => {[this.setState({guardando: false, deshabilitado: true, editando: false}),
                        this.props.habilitarGeneral(true),
                        this.props.habilitareditcompetencias(false),
        ]});
        //console.log('formulario enviado',this.state);
    }
    

    
    render() {
        return (
            <React.Fragment>                
                {
                !this.props.nivel_competencia_generica ?
                <div className={"my-2 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                    <p className="m-0">
                    Ingrese Descripción del Nivel {this.props.nivel_competencia.nivel}:</p>
                    <textarea rows="3"
                        disabled={this.state.deshabilitado}
                        className="form-control" 
                        value={this.state.nivel_competencia.descripcion || ''}
                        onChange={(e)=>this.setState({nivel_competencia: {...this.state.nivel_competencia, descripcion: e.target.value}})}>
                        </textarea>
                    <div className="col-12 row mt-2">
                        <div className="col-6">
                            <strong>Logros de Aprendizaje</strong>
                            {this.props.nivel_competencia.logro_aprendizajes.length > 0 ?
                            <ol>
                                {this.props.nivel_competencia.logro_aprendizajes.map((logro_aprendizaje,i) =>
                                    <li key={i}>{logro_aprendizaje.descripcion}</li>
                                )}
                            </ol>
                            :
                            <p>No Posee</p>
                            }
                            <div>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={()=>{this.handleOpen()}}>      
                                    <i className="fas fa-plus p-r-5" ></i>Logros de Aprendizaje
                                </button>
                            </div>
                        </div>
                        <div className="col-6">
                            <strong>Asignaturas</strong>
                            {this.props.nivel_competencia.nivel_competencia_asignaturas.length > 0 ?
                            <ol>
                                {this.props.nivel_competencia.nivel_competencia_asignaturas.map((nivel_competencia_asignatura,i) =>
                                    <li key={i}>
                                        {nivel_competencia_asignatura.asignatura.nombre}
                                        {/* <a className="m-l-5"
                                            href=""
                                            // onClick={() => this.irAsignatura(nivel_competencia_asignatura.asignatura)}
                                            target="_blank">
                                            <span className="badge badge-info">Ver</span>
                                        </a> */}
                                    </li>
                                )}
                            </ol>
                            :
                            <p>No Posee</p>
                            }
                            <div>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={()=>{this.handleOpenAsignatura()}}>      
                                    <i className="fas fa-plus p-r-5" ></i>Asignatura
                                </button>
                            </div>
                        </div>   
                    </div>
                    <div className="col-12 text-right mt-2">
                        <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false), this.props.habilitareditcompetencias(true), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                        {
                            this.state.guardando ?
                                <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Guardando</button>                      
                            :
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5"
                                onClick={()=>{
                                    var existe = false;
                                    var str = this.state.nivel_competencia.descripcion;
                                    this.props.verbos.map(verbo =>{
                                        if(str.toLowerCase().includes(verbo.toLowerCase()))
                                        {
                                            existe = true;
                                        }
                                    })
                                    if(existe == false)
                                    {
                                        if(window.confirm('No ha usado ningun verbo recomendado, esta seguro de querer guardar ?'))
                                            this.handleSubmit()
                                    }
                                    else
                                    {
                                        this.handleSubmit()
                                    }
                                }}>
                                <i className="fas fa-save p-r-10"></i>Guardar</button>                        }
                        {/* <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                        onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                        this.props.borrarElemento('nivel_competencias', this.props.nivel_competencia.id, this.props.addNotification, this.props.addNotificationAlert)}}>
                        <i className="fas fa-times p-r-10"></i>Eliminar</button>          */}
                    </div>
                    <Logros
                    open = {this.state.open}
                    handleClose={this.handleClose}
                    nivel_competencia = {this.props.nivel_competencia} 
                    handleUpdate = {this.props.handleUpdate}
                    handleAddElement = {this.props.handleAddElement}
                    borrarElemento = {this.props.borrarElemento}
                    habilitarGeneral = {this.props.habilitarGeneral}
                    habilitadogeneral = {this.props.habilitadogeneral}
                    addNotification = {this.props.addNotification}
                    addNotificationAlert = {this.props.addNotificationAlert}
                    />
                    <Asignatura
                    openAsignatura = {this.state.openAsignatura}
                    handleCloseAsignatura={this.handleCloseAsignatura}
                    nivel_competencia = {this.props.nivel_competencia}
                    asignaturas={this.props.asignaturas}
                    handleAddElement = {this.props.handleAddElement}
                    borrarElemento = {this.props.borrarElemento}
                    habilitarGeneral = {this.props.habilitarGeneral}
                    habilitadogeneral = {this.props.habilitadogeneral}
                    addNotification = {this.props.addNotification}
                    addNotificationAlert = {this.props.addNotificationAlert}
                    />
                </div>
                :
                <div className="my-2">
                    <p className="m-0">Descripción del Nivel {this.props.nivel_competencia_generica.nivel}:</p>
                    <p className="px-2 py-2 border">
                        {this.props.nivel_competencia_generica.descripcion}
                    </p>
                    <div className="col-12 row">
                        <div className="col-6">
                            <strong>Logros de Aprendizaje</strong>
                            {this.props.nivel_competencia_generica.logro_aprendizajes.length > 0 ?
                            <ol>
                                {this.props.nivel_competencia_generica.logro_aprendizajes.map((logro_aprendizaje,i) =>
                                    <li key={i}>{logro_aprendizaje.descripcion}</li>
                                )}
                            </ol>
                            :
                            <p>No Posee</p>
                            }
                        </div>
                        <div className="col-6">
                            <strong>Asignaturas</strong>
                            {this.props.asignaturas.some(asignatura =>
                                asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura =>
                                    nivel_generica_asignatura.nivel_generica.nivel_competencia_id == 
                                    this.props.nivel_competencia_generica.id
                                )
                            ) ?
                            <ol>
                                {
                                    this.props.asignaturas.filter(asignatura =>
                                        asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura =>
                                            nivel_generica_asignatura.nivel_generica.nivel_competencia_id == 
                                            this.props.nivel_competencia_generica.id
                                        )
                                    ).map((asignatura, i) =>
                                        <li key={i}>
                                            {asignatura.nombre}
                                            {/* <a className="m-l-5" href="" target="_blank">
                                                <span className="badge badge-info">Ver</span>
                                            </a> */}
                                        </li>
                                    )
                                }
                                    
                            </ol>
                            :
                            <p>No Posee</p>
                            }
                            <div>
                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={()=>{this.handleOpenAsignatura()}}>      
                                    <i className="fas fa-plus p-r-5" ></i>Asignatura
                                </button>
                            </div>
                        </div>  
                    </div>
                    <Asignatura
                    openAsignatura = {this.state.openAsignatura}
                    handleCloseAsignatura={this.handleCloseAsignatura}
                    nivel_competencia_generica = {this.props.nivel_competencia_generica}
                    asignaturas={this.props.asignaturas}
                    plan_generica={this.props.plan_generica}
                    handleAddElement = {this.props.handleAddElement}
                    borrarElemento = {this.props.borrarElemento}
                    habilitarGeneral = {this.props.habilitarGeneral}
                    habilitadogeneral = {this.props.habilitadogeneral}
                    addNotification = {this.props.addNotification}
                    addNotificationAlert = {this.props.addNotificationAlert}
                    />
                </div>
                }
                
                
            </React.Fragment>  
        );
    }
}