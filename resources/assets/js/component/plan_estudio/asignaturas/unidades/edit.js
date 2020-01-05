import React, { Component } from 'react'

export default class edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deshabilitado: true
        }
        this.addElemento = this.addElemento.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);

    }

    habilitar() {
        this.setState({ deshabilitado: false });
    }

    addElemento(variable) {
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify(
                {
                    unidad_id: this.props.unidad.id
                }
            )
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(data => { [this.props.handleAddElementAsignatura(variable, data, this.props.asignaturaId), this.props.addNotification()] })
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            })
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
                [this.setState({ guardando: false, deshabilitado: true }),
                this.props.habilitarGeneral(true)
                ]
            });
        //console.log('formulario enviado',this.state);
    }



    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <input type="text"
                        disabled={this.state.deshabilitado}
                        className="form-control"
                        value={this.props.contenido.nombre || ''}
                        onChange={(e) => this.props.handleInputArraysAsignatura(e, 'contenidos', 'nombre', this.props.contenido.id, this.props.asignaturaId)}>
                    </input>
                </div>
                <div className="col-6 text-right">
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit('contenidos', this.props.contenido)}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                        onClick={() => {
                            if (window.confirm('¿Estas Seguro?'))
                                this.props.borrarElementoAsignatura('contenidos', this.props.contenido.id, this.props.addNotification, this.props.asignaturaId)
                        }}>
                        <i className="fas fa-times p-r-10"></i>Eliminar</button>
                </div>
            </div>
        );
    }
}