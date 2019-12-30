import React, { Component } from 'react'
import Edit from './edit'
import Panel from '../../utiles/Panel'


export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
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
            <div className="border p-3 mb-3">
                <div className="col ui-sortable-disabled">
                    <legend>Asignaturas del {this.props.nivelAsignatura.nombre}</legend>
                    {
                        this.props.asignaturas && 
                        this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0 ?
                            this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).map( asignatura =>
                                <Panel key = {'asignatura-' + asignatura.id} titulo={asignatura.nombre} collapse={true}>
                                    <Edit
                                        asignatura={asignatura}
                                        asignaturas={this.props.asignaturas}
                                        niveles={this.props.niveles}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleInputArraysAsignatura = {this.props.handleInputArraysAsignatura}
                                        handleAddElementAsignatura = {this.props.handleAddElementAsignatura}
                                        borrarElementoAsignatura={this.props.borrarElementoAsignatura}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}
                                    />
                                </Panel>    
                            )
                        :
                            'No existen asignaturas en este nivel'
                    }
                </div>  
            </div>     
        );
    }
}