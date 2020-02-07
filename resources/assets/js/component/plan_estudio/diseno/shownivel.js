import React, { Component } from 'react'
import Panel from '../../utiles/Panel'
import Edit from './edit'

export default class shownivel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editandoasignatura: false
        }

        this.habilitareditasignaturas = this.habilitareditasignaturas.bind(this);

        
    }

    habilitareditasignaturas(estado){
        this.setState({editandoasignatura: estado});
    }

    // addElemento(variable){
    //     //e.preventDefault();
    //     fetch(`/api/${variable}/`, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type':'application/json'
    //         }
    //         ,
    //         body: JSON.stringify(
    //             {dominio_id:  this.props.dominio.id}
    //         )
    //     })
    //     .then(function(response) {
    //         if(response.ok) {
    //             return response.json();
    //         } else {
    //             throw "Error en la llamada Ajax";
    //         }
         
    //      })
    //     .then(data => {[this.props.handleAddElement(variable, data),this.props.addNotification()]} )
    //     .catch(function(error) {
    //         console.log('Hubo un problema con la petición Fetch:' + error.message);
    //     })
    // }
    

    
    render() {
        return (
            <Panel key={'Nivel-' + this.props.nivelAsignatura.nombre} titulo={'Semestre ' + this.props.nivelAsignatura.nombre} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandoasignatura)}>
            {
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ciclo</th>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>SCT-Chile</th>
                                <th>Requisitos</th>
                                <th>Cambiar Semestre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.asignaturas && 
                                this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0 ?
                                    this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).map( (asignatura,i) =>
                                        <Edit
                                            key={i}
                                            i={i}
                                            nivelAsignatura={this.props.nivelAsignatura}
                                            niveles = {this.props.niveles}
                                            asignatura = {asignatura}
                                            asignaturas={this.props.asignaturas}
                                            handleInputArrays = {this.props.handleInputArrays}
                                            handleAddElement={this.props.handleAddElement}
                                            borrarElemento={this.props.borrarElemento}
                                            handleInputArraysAsignatura = {this.props.handleInputArraysAsignatura}
                                            handleAddElementAsignatura = {this.props.handleAddElementAsignatura}
                                            borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                                            habilitarGeneral={this.props.habilitarGeneral}
                                            habilitadogeneral={this.props.habilitadogeneral}
                                            habilitareditasignaturas = {this.habilitareditasignaturas}
                                            addNotification={this.props.addNotification}
                                        />
                                    )
                                :
                                    'No existen asignaturas en este nivel'
                            }
                        </tbody>
                    </table>
                </div>
            }
            {/* <div align="right" className="mt-2 mb-1">
                <button disabled={!this.props.habilitadogeneral} type="button" className="btn btn-primary" onClick={()=>{this.addElemento('competencias')}}>      
                    <i className="fas fa-plus p-r-5" ></i>Crear Competencia
                </button>
            </div>  */}
            </Panel>
        );
    }
}