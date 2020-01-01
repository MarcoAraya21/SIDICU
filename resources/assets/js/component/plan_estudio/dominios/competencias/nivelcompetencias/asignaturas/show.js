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
        if(variable == 'competencia_evaluaciones')
        {
            var tipoId = {'nivel_competencia_asignatura_id': this.props.nivel_competencia_asignatura.id};
        }
        else
        {
            if(variable = 'generica_evaluaciones')
            {
                var tipoId = {'nivel_generica_asignatura_id': this.props.nivel_generica_asignatura.id};
            }
        }
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify(
                tipoId
            )
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(data => { [this.props.handleAddElement(variable, data), this.props.addNotification()] })
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
            <div className={"my-2 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                {
                    !this.props.nivel_generica_asignatura ?
                        <React.Fragment>
                            <div className="col-12">
                                <label>Procedimientos y/o Herramientas de Evaluación:</label>
                                {
                                    [console.log('dddda', this.props.nivel_competencia_asignatura),
                                    this.props.nivel_competencia_asignatura.competencia_evaluaciones.length > 0 ?
                                        <ol>
                                            {
                                                this.props.nivel_competencia_asignatura.competencia_evaluaciones.map(competencia_evaluacion =>
                                                    <li>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <input type="text"
                                                                    disabled={this.state.deshabilitado}
                                                                    className="form-control"
                                                                    value={competencia_evaluacion.descripcion || ''}
                                                                    onChange={(e) => this.props.handleInputArrays(e, 'competencia_evaluaciones', 'descripcion', competencia_evaluacion.id)}>
                                                                </input>
                                                            </div>
                                                            <div className="col-6 text-right">
                                                                <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                                                                <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit('competencia_evaluaciones', competencia_evaluacion)}><i className="fas fa-save p-r-10"></i>Guardar</button>
                                                                <button type="button" disabled={!this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                                                                    onClick={() => {
                                                                        if (window.confirm('¿Estas Seguro?'))
                                                                            this.props.borrarElemento('competencia_evaluaciones', competencia_evaluacion.id, this.props.addNotification)
                                                                    }}>
                                                                    <i className="fas fa-times p-r-10"></i>Eliminar</button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </ol>
                                        :
                                        ' Sin Evaluaciones']
                                }
                            </div>
                            <div className="col-12 text-right">
                                <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-primary" onClick={() => { this.addElemento('competencia_evaluaciones') }}>
                                    <i className="fas fa-plus p-r-5" ></i>Crear Evaluación
                                </button>
                                <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-danger m-l-10"
                                    onClick={() => {
                                        let requisitos = this.props.asignaturas.filter(asignatura => asignatura.requisitos.some(requisito =>
                                            requisito.requisito.id == this.props.nivel_competencia_asignatura.asignatura_id
                                        ))
                                        console.log('requisitos', requisitos);
                                        if(requisitos.length > 0 )
                                        {
                                            let texto = "";
                                            requisitos.map(requisito =>
                                                requisito[requisito.length-1] == requisito ?
                                                texto = texto + requisito.nombre
                                                :
                                                texto = texto + requisito.nombre + "\n"
                                                )
                                            alert(concat('No puede el eliminarse al ser requisito de:\n',texto))
                                        }
                                        else
                                        {
                                            if (window.confirm('¿Estas Seguro?')) {
                                                let asignaturaAsociada = this.props.asignaturas.find(asignatura => asignatura.id == this.props.nivel_competencia_asignatura.asignatura.id)
                                                if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length > 1) {
                                                    this.props.borrarElemento('nivel_competencia_asignaturas', this.props.nivel_competencia_asignatura.id, this.props.addNotification)
                                                }
                                                else {
                                                    if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length == 1) {
                                                        if (window.confirm('Si elimina esta asociación, tambien se eliminara la asignatura \n ¿Estas Seguro?'))
                                                            this.props.borrarElemento('asignaturas', asignaturaAsociada.id, this.props.addNotification)
                                                    }
                                                }
                                            }
                                        }
                                    }}>
                                    <i className="fas fa-times p-r-5" ></i>Eliminar Asociación
                                </button>
                            </div>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <div className="col-12">
                                <label>Procedimientos y/o Herramientas de Evaluación:</label>
                                {
                                    this.props.nivel_generica_asignatura.generica_evaluaciones.length > 0 ?
                                        <ol>
                                            {
                                                this.props.nivel_generica_asignatura.generica_evaluaciones.map(generica_evaluacion =>
                                                    <li>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <input type="text"
                                                                    className="form-control"
                                                                    value={generica_evaluacion.descripcion || ''}
                                                                    onChange={(e) => this.props.handleInputArrays(e, 'generica_evaluaciones', 'descripcion', generica_evaluacion.id)}>
                                                                </input>
                                                            </div>
                                                            <div className="col-6 text-right">
                                                                <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={() => [this.habilitar(), this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                                                                <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit('generica_evaluaciones', generica_evaluacion)}><i className="fas fa-save p-r-10"></i>Guardar</button>
                                                                <button type="button" disabled={!this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                                                                    onClick={() => {
                                                                        if (window.confirm('¿Estas Seguro?'))
                                                                            this.props.borrarElemento('generica_evaluaciones', generica_evaluacion.id, this.props.addNotification)
                                                                    }}>
                                                                    <i className="fas fa-times p-r-10"></i>Eliminar</button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </ol>
                                        :
                                        ' Sin Evaluaciones'
                                }
                            </div>
                            <div className="col-12 text-right">
                                <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-primary" onClick={() => { this.addElemento('generica_evaluaciones') }}>
                                    <i className="fas fa-plus p-r-5" ></i>Crear Evaluación
                                </button>
                                <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-danger m-l-10"
                                    onClick={() => {
                                        let requisitos = this.props.asignaturas.filter(asignatura => asignatura.requisitos.some(requisito =>
                                                requisito.requisito.id == this.props.nivel_generica_asignatura.asignatura_id
                                            ))
                                            console.log('requisitos', requisitos);
                                        // if(this.props.asignaturas.)
                                        if (window.confirm('¿Estas Seguro?')) {
                                            let asignaturaAsociada = this.props.asignaturas.find(asignatura => asignatura.id == this.props.nivel_generica_asignatura.asignatura.id)
                                            if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length > 1) {
                                                this.props.borrarElemento('nivel_generica_asignaturas', this.props.nivel_generica_asignatura.id, this.props.addNotification)
                                            }
                                            else {
                                                if (asignaturaAsociada.nivel_competencia_asignaturas.length + asignaturaAsociada.nivel_generica_asignaturas.length == 1) {
                                                    if (window.confirm('Si elimina esta asociación, tambien se eliminara la asignatura \n ¿Estas Seguro?'))
                                                        this.props.borrarElemento('asignaturas', asignaturaAsociada.id, this.props.addNotification)
                                                }
                                            }
                                        }
                                    }}>
                                    <i className="fas fa-times p-r-5" ></i>Eliminar Asociación
                                </button>
                            </div>
                        </React.Fragment>
                }
            </div>
        );
    }
}