import React, { Component } from 'react'
import Panel from '../../../../utiles/Panel'

export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tipo_bibliografia: this.props.bibliografia.tipo_bibliografia_id,
            deshabilitado: true,
            editando: false,
            guardando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);

    }

    habilitar(){
        this.setState({deshabilitado: false});
    }


    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/bibliografias/' + this.props.bibliografia.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {...this.props.bibliografia, tipo_bibliografia_id: this.state.tipo_bibliografia}
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
        .then(data => {
            [
                this.setState({guardando: false, deshabilitado: true, editando: false}),
                this.props.habilitarGeneral(true),
                this.state.tipo_bibliografia != this.props.bibliografia.tipo_bibliografia_id && alert('Se ha trasladado al apartado de ' + (this.state.tipo_bibliografia == 1 ? 'Básica' : this.state.tipo_bibliografia == 2 && 'Complementaria')),
                this.props.handleInputArraysAsignatura(this.state.tipo_bibliografia, 'bibliografias', 'tipo_bibliografia_id', this.props.bibliografia.id, this.props.asignaturaId),
                this.props.addNotification()
            ]
        })
        .catch(error => {[
            this.setState({guardando: false}),
            this.props.addNotificationAlert('No se ha podido guardar.')
        ]
        })
        //console.log('formulario enviado',this.state);
    }
    

    
    render() {
        return (
            <Panel key={'bibliografia' + this.props.bibliografia.id} titulo={this.props.bibliografia.titulo || 'Sin Nombre'} border={true} collapse={true} habilitado={(!this.props.habilitadogeneral && this.state.deshabilitado)}>
                {/* <p className="m-0">Ingrese Cantidad de Horas {this.props.asignatura_hora.tipo_hora.nombre}:</p>
                <input type="number"
                    disabled={this.state.deshabilitado}
                    className="form-control"
                    pattern="[0-9]*"
                    value={this.props.asignatura_hora.cantidad || 0}
                    onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'asignatura_horas', 'cantidad', this.props.asignatura_hora.id, this.props.asignaturaId)}>
                         
                </input> */}
                <div className="col-12">
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Titulo</label>
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control " 
                                value={this.props.bibliografia.titulo || ''}
                                onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'bibliografias', 'titulo', this.props.bibliografia.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                        <div className="col-6">
                            <label>Tipo de bibliografia</label>
                            <select defaultValue={this.props.bibliografia.tipo_bibliografia_id}
                                disabled={this.state.deshabilitado}
                                className="form-control " 
                                onChange={(e)=>this.setState({tipo_bibliografia: (e.target ? e.target.value : e) })}>
                                <option disabled value="">Seleccione una Opción</option>
                                <option value='1'>Básica</option>
                                <option value='2'>Complementaria</option>
                            </select>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-6">
                            <label>Nombre del Autor</label>
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control " 
                                value={this.props.bibliografia.nombre_autor || ''}
                                onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'bibliografias', 'nombre_autor', this.props.bibliografia.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                        <div className="col-6">
                            <label>Apellido del Autor</label>
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                value={this.props.bibliografia.apellido_autor || ''}
                                onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'bibliografias', 'apellido_autor', this.props.bibliografia.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                    </div>
                    <div className="col row mb-2">
                        <div className="col-4">
                            <label>Año</label>
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                value={this.props.bibliografia.año || ''}
                                onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'bibliografias', 'año', this.props.bibliografia.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                        <div className="col-4">
                            <label>Editorial</label>
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                value={this.props.bibliografia.editorial || ''}
                                onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'bibliografias', 'editorial', this.props.bibliografia.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                        <div className="col-4">
                            <label>Pais</label>
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control "
                                value={this.props.bibliografia.pais || ''}
                                onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'bibliografias', 'pais', this.props.bibliografia.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    {
                        this.state.guardando ?
                            <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Guardando</button>                      
                        :
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit()}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    }
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                    onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                    this.props.borrarElementoAsignatura('bibliografias', this.props.bibliografia.id, this.props.addNotification, this.props.addNotificationAlert, this.props.asignaturaId)}}>
                    <i className="fas fa-times p-r-10"></i>Eliminar</button>
                </div>
            </Panel>
        );
    }
}