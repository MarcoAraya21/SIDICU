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
                    <legend>Asignaturas del {this.props.nivel.nombre}</legend>
                    {
                        this.props.asignaturas && 
                        this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivel.id).length > 0 ?
                            this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivel.id).map( asignatura =>
                                <Panel key = {'asignatura-' + asignatura.id} titulo={asignatura.nombre} collapse={true}>
                                    <Edit
                                        asignatura={asignatura}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleInputArraysAsignatura = {this.props.handleInputArraysAsignatura}
                                        handleAddElementAsignatura = {this.props.handleAddElementAsignatura}
                                        borrarElemento={this.props.borrarElemento}
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