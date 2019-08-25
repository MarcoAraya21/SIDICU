import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { validaciones } from '../validaciones';
import Edit from './edit';
import { handleInput } from '../../utiles/lib';

export default class index extends Component {
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
                {plan_estudio_id:  this.props.id,
                tipo_dominio_id: 1}
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
            <div className="container py-4">
                <div className="col-12">
                    <legend>Dominios</legend>
                    <React.Fragment>
                        <h4>Especialidad</h4>
                        <div className="border p-3 mb-3">
                            {
                            this.props.dominios && this.props.dominios.filter(dominio =>
                                dominio.tipo_dominio_id == 1).map( (dominio,i) =>
                                <Edit key={dominio.id}
                                dominio = {dominio}
                                i={i}
                                handleInputArrays={this.props.handleInputArrays}
                                borrarElemento={this.props.borrarElemento}/>
                                )
                            }
                            <div align="right" className="mt-2 mb-1">
                                <button type="button" className="btn btn-primary" onClick={()=>{this.addElemento('dominios')}}>      
                                    <i className="fas fa-plus p-r-5" ></i>Crear Plan
                                </button>
                            </div> 
                        </div>
                        
                        <h4>Transversal</h4>
                        <div className="border p-3 mb-3">
                            {
                            this.props.dominios && this.props.dominios.filter(dominio =>
                                dominio.tipo_dominio_id == 2).map( (dominio,i) =>
                                <Edit key={dominio.id}
                                dominio = {dominio} i={i}
                                transversal={true}
                                handleInputArrays={this.props.handleInputArrays}
                                borrarElemento={this.props.borrarElemento}/>
                                )
                            }
                        </div>
                    </React.Fragment>
                </div>  
            </div>
        );
    }
}