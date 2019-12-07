import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Edit from './edit';
export default class showcompetencias extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }




    addElemento(variable){
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
            ,
            body: JSON.stringify(
                {competencia_id:  this.props.competencia.id}
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
         .then( data => this.props.handleAddElement(variable, data));
         
        
    }
    

    
    render() {
        return (
            <div className="border p-3 mb-3">
                
                {
                    !this.props.competencia_generica
                    ?
                        this.props.competencia.nivel_competencias && this.props.competencia.nivel_competencias.length > 0 ?
                        this.props.competencia.nivel_competencias.map((nivel_competencia,i) =>
                            <Edit key={nivel_competencia.id}
                            nivel_competencia = {nivel_competencia}
                            i={i}
                            handleInputArrays = {this.props.handleInputArrays}
                            borrarElemento = {this.props.borrarElemento}
                            handleAddElement = {this.props.handleAddElement}/>
                            )
                        :
                        <p>No posee ninguna competencia</p>
                    :
                    this.props.competencia_generica.nivel_competencias.map((nivel_competencia_generica,i) =>
                            <Edit key={nivel_competencia_generica.id}
                            nivel_competencia_generica = {nivel_competencia_generica}
                            i={i}/>
                    )
                }
                {
                    !this.props.competencia_generica
                    &&
                    <div align="right" className="mt-2 mb-1">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.addElemento('nivel_competencias')}}>      
                            <i className="fas fa-plus p-r-5" ></i>Crear Nivel Competencia
                        </button>                    
                    </div>
                }
            </div>
        );
    }
}