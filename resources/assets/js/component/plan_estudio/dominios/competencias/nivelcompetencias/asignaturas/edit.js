import React, { Component } from 'react'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deshabilitado: true,
            editando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);

    }

    habilitar() {
        this.setState({ deshabilitado: false });
    }


    handleSubmit(variable, elemento) {
        //e.preventDefault();
        this.setState({ guardando: true })
        fetch(`/api/${variable}/${elemento.id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                elemento
            )
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(data => { this.props.addNotification() })
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            })
            .finally(() => {
                [this.setState({ guardando: false, deshabilitado: true, editando: false }),
                this.props.habilitarGeneral(true),
                this.props.habilitareditasignaturas(false),
                ]
            });
        //console.log('formulario enviado',this.state);
    }



    render() {
        return (
            !this.props.generica_evaluacion ?
                <li className="mb-2">
                    <div className="row">
                        <div className="col-6">
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control"
                                value={this.props.competencia_evaluacion.descripcion || ''}
                                onChange={(e) => this.props.handleInputArrays(e, 'competencia_evaluaciones', 'descripcion', this.props.competencia_evaluacion.id)}>
                            </input>
                        </div>
                        <div className="col-6 text-right">
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false), this.props.habilitareditasignaturas(true), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit('competencia_evaluaciones', this.props.competencia_evaluacion)}><i className="fas fa-save p-r-10"></i>Guardar</button>
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                                onClick={() => {
                                    if (window.confirm('¿Estas Seguro?'))
                                        this.props.borrarElemento('competencia_evaluaciones', this.props.competencia_evaluacion.id, this.props.addNotification)
                                }}>
                                <i className="fas fa-times p-r-10"></i>Eliminar</button>
                        </div>
                    </div>
                </li>                           
            :
                <li className="mb-2">
                    <div className="row">
                        <div className="col-6">
                            <input type="text"
                                disabled={this.state.deshabilitado}
                                className="form-control"
                                value={this.props.generica_evaluacion.descripcion || ''}
                                onChange={(e) => this.props.handleInputArrays(e, 'generica_evaluaciones', 'descripcion', this.props.generica_evaluacion.id)}>
                            </input>
                        </div>
                        <div className="col-6 text-right">
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false), this.props.habilitareditasignaturas(true), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit('generica_evaluaciones', this.props.generica_evaluacion)}><i className="fas fa-save p-r-10"></i>Guardar</button>
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                                onClick={() => {
                                    if (window.confirm('¿Estas Seguro?'))
                                        this.props.borrarElemento('generica_evaluaciones', this.props.generica_evaluacion.id, this.props.addNotification)
                                }}>
                                <i className="fas fa-times p-r-10"></i>Eliminar</button>
                        </div>
                    </div>
                </li>  
        );
    }
}