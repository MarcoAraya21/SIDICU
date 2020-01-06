import React, { Component } from 'react'
import Edit from './edit';
import Panel from '../../../utiles/Panel'

export default class show extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deshabilitado: true,
            editandounidades: false
        }
        this.addElemento = this.addElemento.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);
        this.habilitareditunidades = this.habilitareditunidades.bind(this);


    }

    habilitareditunidades(estado){
        this.setState({editandounidades: estado});
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
            <Panel titulo={this.props.unidad.nombre || 'Sin Nombre'} border={true} collapse={true} habilitado={!(this.props.habilitadogeneral || this.state.editandounidades || !this.state.deshabilitado) }>
                <div className="my-2">
                    <div className="col-12 row mb-3">
                        <div className="col-4">
                            <label>Descripción</label>
                            <textarea rows="2"
                                disabled={this.state.deshabilitado}
                                className="form-control"
                                value={this.props.unidad.nombre || ''}
                                onChange={(e) => this.props.handleInputArraysAsignatura(e, 'unidades', 'nombre', this.props.unidad.id, this.props.asignaturaId)}>
                            </textarea>
                        </div>
                        <div className="col-4">
                            <label>Horas Aula</label>
                            <input type="number"
                                disabled={this.state.deshabilitado}
                                className="form-control"
                                pattern="[0-9]*"
                                max="500"
                                value={this.props.unidad.horas_aula || 0}
                                onChange={(e) => this.props.handleInputArraysAsignatura(e, 'unidades', 'horas_aula', this.props.unidad.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                        <div className="col-4">
                            <label>Horas Extra Aula</label>
                            <input type="number"
                                disabled={this.state.deshabilitado}
                                className="form-control"
                                pattern="[0-9]*"
                                max="500"
                                value={this.props.unidad.horas_extra_aula || 0}
                                onChange={(e) => this.props.handleInputArraysAsignatura(e, 'unidades', 'horas_extra_aula', this.props.unidad.id, this.props.asignaturaId)}>
                            </input>
                        </div>
                    </div>
                    <div className="col-12 border p-10">
                        <label>Contenidos:</label>
                        {
                            this.props.unidad.contenidos.length > 0 ?
                                <ol>
                                    {
                                        this.props.unidad.contenidos.map((contenido,i) =>
                                            <Edit key={i}
                                            contenido={contenido}
                                            asignaturaId={this.props.asignaturaId}
                                            handleInputArraysAsignatura={this.props.handleInputArraysAsignatura}
                                            borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                                            habilitarGeneral={this.props.habilitarGeneral}
                                            habilitadogeneral={this.props.habilitadogeneral}
                                            habilitareditunidades = {this.habilitareditunidades}
                                            addNotification={this.props.addNotification} />
                                        )
                                    }
                                </ol>
                                :
                                ' Sin Contenidos'
                        }
                        <div className="text-right">
                            <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-primary" onClick={() => { this.addElemento('contenidos') }}>
                                <i className="fas fa-plus p-r-5" ></i>Crear Contenido
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 text-right">
                    <button type="button" disabled={this.state.editandounidades || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    <button type="button" disabled={this.state.editandounidades || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit('unidades', this.props.unidad)}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    <button type="button" disabled={this.state.editandounidades || !this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                        onClick={() => {
                            if (window.confirm('¿Estas Seguro?'))
                                this.props.borrarElementoAsignatura('unidades', this.props.unidad.id, this.props.addNotification, this.props.asignaturaId)
                        }}>
                        <i className="fas fa-times p-r-10"></i>Eliminar</button>
                </div>
            </Panel>
        );
    }
}