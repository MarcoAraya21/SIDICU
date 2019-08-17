import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { validaciones } from '../validaciones';

export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dominios: []
        }
        
    }

    // codigo para agregar dominios
    // componentWillMount(){
    //     this.props.presupuestos.map(
    //         (presupuesto, i) =>
    //         this.handleAddElement('gasto_conceptos', {presupuesto_item_id: presupuesto.id, monto: 0})
    //     );
    // }

    

    
    render() {
        return (
            <div className="container py-4">
                <div className="col-12">
                    <legend>Dominios</legend>
                    {
                        this.props.dominios && this.props.dominios.map( (dominio,i) =>
                        <div key={i} className="border p-3 mb-3">
                            <p >Dominio {i+1}</p>
                            <input type="text"
                                className="form-control" 
                                value={dominio.nombre || ''}
                                onChange={(e)=>this.props.handleInput(e, 'dominios', 'nombre', dominio.id)}>
                            </input>
                        </div>
                        )
                    }
                    
                </div>  
            </div>
        );
    }
}