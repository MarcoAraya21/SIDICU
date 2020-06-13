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
                perfil_egresado: '',
                perfil_licenciado: '',
                guardando: false,
                errores: {},
                deshabilitado: true
        }
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
        // let validaciones2 = validaciones(this.state, show)
        // this.setState({errores: validaciones2})
        // if(Object.keys(validaciones2).length == 0)
        // {
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
                    if(response.redirected)
                    {
                        window.location.href = "/";
                    }
                    throw "Error en la llamada Ajax";
                }
            })
            .then(data => {[this.props.handleUpdateOtros(this.state), this.props.addNotification()]} )
            .catch(error => {
                this.props.addNotificationAlert('No se ha podido guardar.')
            })
            .finally(() => {[this.setState({guardando: false, deshabilitado: true}),
                this.props.habilitarGeneral(true)
            ]});
        // }
        // else
        // {
        //     this.props.addNotificationWarning('Debe rellenar los campos.');
        // }
    }

    componentWillMount() {
        this.setState({proposito: this.props.proposito,
                        objetivo: this.props.objetivo,
                        requisito_admision: this.props.requisito_admision,
                        mecanismo_retencion: this.props.mecanismo_retencion,
                        requisito_obtencion: this.props.requisito_obtencion,
                        campo_desarrollo: this.props.campo_desarrollo,
                        perfil_egresado: this.props.perfil_egresado,
                        perfil_licenciado: this.props.perfil_licenciado})
    }
    
    render() {
        var arreglo = ['1','2','3','4'];
        var arreglo2 = [
            {id: "a", nv: "1"},
            {id: "b", nv: "4"},
            {id: "c", nv: "2"},
            {id: "d", nv: "3"},
            {id: "e", nv: "2"},
            {id: "f", nv: "1"},
            {id: "g", nv: "2"},
            {id: "h", nv: "1"},
            {id: "i", nv: "4"},
            {id: "j", nv: "1"},
        ];
        var elemento_nivel = 3;
        var arreglo_aux = ["a","a","a","a","a","a"];
        return (
            <div className="container py-4">
                <div className={"col-12 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                    <table>
                        <tbody>
                    {
                        arreglo.length > 0 && arreglo.map((elemento, i) => 
                        <tr key={i}>
                            {
                                
                                arreglo2.length > 0 && arreglo2.filter(el => el.nv == elemento).slice(0,6).map( (el,j) =>
                                    arreglo_aux.fill(el, j, j+1)
                                ),
                                arreglo_aux.map(elem =>
                                    <td>{(elem.id && elem.nv == elemento) ? elem.id+"-"+elem.nv : "relleno"}</td>
                                )

                            }
                        </tr>
                        )
                    }
                    </tbody>
                    </table> 
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
                        <label>Propósito</label>
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
                        <label>Requisito de Obtención de Título</label>
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
                        <label>Campo de Desarrollo Profesional</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.campo_desarrollo && 'is-invalid')}  rows="3"
                            value={this.state.campo_desarrollo || ''}
                            onChange={(e)=>this.handleInput(e, 'campo_desarrollo')}>
                        </textarea>
                        {this.state.errores.campo_desarrollo &&
                            <div className="invalid-feedback" align="right">{this.state.errores.campo_desarrollo}</div>}
                    </div>
                    <div className="form-group">
                        <label>Perfil del Egresado</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.perfil_egresado && 'is-invalid')}  rows="3"
                            value={this.state.perfil_egresado || ''}
                            onChange={(e)=>this.handleInput(e, 'perfil_egresado')}>
                        </textarea>
                        {this.state.errores.perfil_egresado &&
                            <div className="invalid-feedback" align="right">{this.state.errores.perfil_egresado}</div>}
                    </div>
                    <div className="form-group">
                        <label>Perfil del Licenciado</label>
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.perfil_licenciado && 'is-invalid')}  rows="3"
                            value={this.state.perfil_licenciado || ''}
                            onChange={(e)=>this.handleInput(e, 'perfil_licenciado')}>
                        </textarea>
                        {this.state.errores.perfil_licenciado &&
                            <div className="invalid-feedback" align="right">{this.state.errores.perfil_licenciado}</div>}
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    {
                        this.state.guardando ?
                            <button className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Guardando</button>
                        :                             
                            <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={this.handleSubmit}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    }
                </div>
            </div>
        );
    }
}