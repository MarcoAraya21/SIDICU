import React, { Component } from 'react'
import Panel from '../../../../../utiles/Panel'
import Edit from './edit'

export default class show extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editandocompetencias: false
        }
        this.addElemento = this.addElemento.bind(this);
        this.habilitareditasignaturas = this.habilitareditasignaturas.bind(this);

    }

    habilitareditasignaturas(estado){
        this.setState({editandoasignaturas: estado});
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

    render() {
        return (
            !this.props.nivel_generica_asignatura ?
                <Panel titulo={this.props.nivel_competencia_asignatura.asignatura.nombre || 'Sin Nombre'} border={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandoasignaturas)}>
                    <div className="col-12">
                        <label>Procedimientos y/o Herramientas de Evaluación:</label>
                        {
                            this.props.nivel_competencia_asignatura.competencia_evaluaciones.length > 0 ?
                                <ol>
                                    {
                                        this.props.nivel_competencia_asignatura.competencia_evaluaciones.map((competencia_evaluacion,i) =>
                                            <Edit
                                                key={i}
                                                competencia_evaluacion={competencia_evaluacion}
                                                handleInputArrays={this.props.handleInputArrays}
                                                borrarElemento={this.props.borrarElemento}
                                                habilitarGeneral={this.props.habilitarGeneral}
                                                habilitadogeneral={this.props.habilitadogeneral}
                                                habilitareditasignaturas = {this.habilitareditasignaturas}
                                                addNotification={this.props.addNotification}
                                            />
                                        )
                                    }
                                </ol>
                                :
                                ' Sin Evaluaciones'
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
                </Panel>                            
            :
                <Panel titulo={this.props.nivel_generica_asignatura.asignatura.nombre || 'Sin Nombre'} border={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandoasignaturas)}>
                    <div className="col-12">
                        <label>Procedimientos y/o Herramientas de Evaluación:</label>
                        {
                            this.props.nivel_generica_asignatura.generica_evaluaciones.length > 0 ?
                                <ol>
                                    {
                                        this.props.nivel_generica_asignatura.generica_evaluaciones.map((generica_evaluacion,i) =>
                                            <Edit
                                                key={i}
                                                generica_evaluacion={generica_evaluacion}
                                                handleInputArrays={this.props.handleInputArrays}
                                                borrarElemento={this.props.borrarElemento}
                                                habilitarGeneral={this.props.habilitarGeneral}
                                                habilitadogeneral={this.props.habilitadogeneral}
                                                habilitareditasignaturas = {this.habilitareditasignaturas}
                                                addNotification={this.props.addNotification}
                                            />
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
                </Panel>  
                
        );
    }
}