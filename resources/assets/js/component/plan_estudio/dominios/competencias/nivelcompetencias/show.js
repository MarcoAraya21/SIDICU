import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Edit from './edit';
import ShowCompetencias from './showcompetencias';
import Panel from '../../../../utiles/Panel';

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
    //      .then( data => this.props.handleAddElement(variable, data));
         
        
    // }
    

    
    render() {
        return (
            <div className="border p-3 mb-3">
                
                <div className="col-12">
                    <legend>Competencias</legend>
                    <React.Fragment>
                        {this.props.dominio && this.props.dominio.competencias.map((competencia,i) =>
                            <Panel key = {i} titulo={competencia.descripcion}>
                                <ShowCompetencias
                                    competencia={competencia}/>
                            </Panel>
                        )}
                    </React.Fragment>
                </div>  
            </div>
        );
    }
}