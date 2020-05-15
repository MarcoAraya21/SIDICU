import React, { Component } from 'react'
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
                errores: {},
                deshabilitado: true
        }
        // this.handleInput = handleInput.bind(this);
        // this.handleInputArrays = handleInputArrays.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);


        //this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    habilitar(){
        this.setState({deshabilitado: false});
    }

    handleInput(e, atributo)
    {
        this.setState({[atributo]: e.target.value});
    }



    handleSubmit(){
        //e.preventDefault();
        let validaciones2 = validaciones(this.state, show)
        this.setState({errores: validaciones2})
        if(Object.keys(validaciones2).length == 0)
        {
            this.setState({guardando: true})
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
            .then(data => {this.props.addNotification()} )
            .catch(error => {
                this.props.addNotificationAlert('No se ha podido guardar.')
            })
            .finally(() => {[this.setState({guardando: false, deshabilitado: true}),
                this.props.habilitarGeneral(true)
            ]});
        }
        else
        {
            this.props.addNotificationWarning('Debe rellenar los campos.');
        }
        //console.log('formulario enviado',this.state);
    }

    componentWillMount() {
        this.setState({proposito: this.props.proposito,
                        objetivo: this.props.objetivo,
                        requisito_admision: this.props.requisito_admision,
                        mecanismo_retencion: this.props.mecanismo_retencion,
                        requisito_obtencion: this.props.requisito_obtencion,
                        campo_desarrollo: this.props.campo_desarrollo})
    }
    
    render() {
        return (
            <div className="container py-4">
                <div className={"col-12 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                    <legend>Datos Iniciales del Plan</legend>
                    <div className="col row">
                        <p className="col-6"><b>Nombre</b></p>
                        <p className="col-6" disabled={true}>{this.props.nombre}</p>
                    </div>
                    <div className="col row">
                        <p className="col-6"><b>Observación</b></p>
                        <p className="col-6" disabled={true}>{this.props.observacion}</p>
                    </div>
                    <div className="col row">
                        <div className="col-4">
                            <p className="mb-1"><b>Carrera</b></p>
                            <p>{this.props.carrera && this.props.carrera.nombre}</p> 
                        </div>
                        <div className="col-4">
                            <p className="mb-1"><b>Tipo de Plan</b></p>
                            <p>{this.props.tipo_plan && this.props.tipo_plan.nombre}</p> 
                        </div>
                        <div className="col-4">
                            <p className="mb-1"><b>Tipo de Ingreso</b></p>
                            <p>{this.props.tipo_ingreso && this.props.tipo_ingreso.nombre}</p> 
                        </div>
                    </div>
                    <div className="col row">
                        <div className="col-6">
                            <p className="mb-1"><b>Encargado UIC</b></p>
                            <p>{this.props.asesor_uic && this.props.asesor_uic.nombre} {this.props.asesor_uic && this.props.asesor_uic.apellido_paterno} {this.props.asesor_uic && this.props.asesor_uic.apellido_materno}</p>
                        </div>
                        <div className="col-6">
                            <p className="mb-1"><b>Coordinador del Cómite</b></p>
                            <p>{this.props.coordinador && this.props.coordinador.nombre} {this.props.coordinador && this.props.coordinador.apellido_paterno} {this.props.coordinador && this.props.coordinador.apellido_materno}</p>
                        </div>
                    </div>
                    <legend>Otros Datos</legend>
                    <div className="form-group">
                        <label>Proposito</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.proposito && 'is-invalid')}  rows="3"
                            value={this.state.proposito || ''}
                            onChange={(e)=>this.handleInput(e, 'proposito')}>
                        </textarea>
                        {this.state.errores.proposito &&
                            <div className="invalid-feedback" align="right">{this.state.errores.proposito}</div>}
                    </div>
                    <div className="form-group">
                        <label>Objetivo</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.objetivo && 'is-invalid')}  rows="3"
                            value={this.state.objetivo || ''}
                            onChange={(e)=>this.handleInput(e, 'objetivo')}>
                        </textarea>
                        {this.state.errores.objetivo &&
                            <div className="invalid-feedback" align="right">{this.state.errores.objetivo}</div>}
                    </div>
                    <div className="form-group">
                        <label>Requisito de Admisión</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.requisito_admision && 'is-invalid')}  rows="3"
                            value={this.state.requisito_admision || ''}
                            onChange={(e)=>this.handleInput(e, 'requisito_admision')}>
                        </textarea>
                        {this.state.errores.requisito_admision &&
                            <div className="invalid-feedback" align="right">{this.state.errores.requisito_admision}</div>}
                    </div>
                    <div className="form-group">
                        <label>Mecanismo de Retención</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.mecanismo_retencion && 'is-invalid')}  rows="3"
                            value={this.state.mecanismo_retencion || ''}
                            onChange={(e)=>this.handleInput(e, 'mecanismo_retencion')}>
                        </textarea>
                        {this.state.errores.mecanismo_retencion &&
                            <div className="invalid-feedback" align="right">{this.state.errores.mecanismo_retencion}</div>}
                    </div>
                    <div className="form-group">
                        <label>Requisito de Obtención</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.requisito_obtencion && 'is-invalid')}  rows="3"
                            value={this.state.requisito_obtencion || ''}
                            onChange={(e)=>this.handleInput(e, 'requisito_obtencion')}>
                        </textarea>
                        {this.state.errores.requisito_obtencion &&
                            <div className="invalid-feedback" align="right" >{this.state.errores.requisito_obtencion}</div>}
                    </div>
                    <div className="form-group">
                        <label>Campo de Desarrollo</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.campo_desarrollo && 'is-invalid')}  rows="3"
                            value={this.state.campo_desarrollo || ''}
                            onChange={(e)=>this.handleInput(e, 'campo_desarrollo')}>
                        </textarea>
                        {this.state.errores.campo_desarrollo &&
                            <div className="invalid-feedback" align="right">{this.state.errores.campo_desarrollo}</div>}
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    {
                        this.state.guardando ?
                            <button className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse"></i> Guardando</button>
                        :                             
                            <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={this.handleSubmit}><i className="fas fa-save p-r-10"></i>Guardar</button>
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