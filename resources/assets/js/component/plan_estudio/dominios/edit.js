import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { validaciones } from '../validaciones';

export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);

        
    }

    // codigo para agregar dominios
    // componentWillMount(){
    //     this.props.presupuestos.map(
    //         (presupuesto, i) =>
    //         this.handleAddElement('gasto_conceptos', {presupuesto_item_id: presupuesto.id, monto: 0})
    //     );
    // }

    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/dominios/' + this.props.dominio.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.props.dominio
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
        .then(data => {this.props.addNotification()} )
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        })
        .finally(() => {this.setState({guardando: false})});
        //console.log('formulario enviado',this.state);
    }
    

    
    render() {
        return (
            <div className="my-2">
                <p className="m-0">Ingrese Nombre del Dominio {!this.props.transversal ? this.props.i + 1 : 'Transversal'}:</p>
                <input type="text"
                    className="form-control" 
                    value={this.props.dominio.nombre || ''}
                    onChange={(e)=>this.props.handleInputArrays(e, 'dominios', 'nombre', this.props.dominio.id)}>
                </input>
                <div className="col-12 text-right mt-2">
                    
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Guardar</button>
                    {!this.props.transversal && 
                        <button type="button" className="btn btn-danger p-5 m-l-5"
                        onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                        this.props.borrarElemento('dominios', this.props.dominio.id)}}>
                        <i className="fas fa-times p-r-10"></i>Eliminar</button>
                    }
                </div>
            </div>


        );
    }
}