import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Logros from './logrosaprendizajes';


export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
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
        fetch('/api/nivel_competencias/' + this.props.nivel_competencia.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.props.nivel_competencia
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
                <p className="m-0">Ingrese Descripción del Nivel de Competencia: {this.props.i + 1}</p>
                <textarea rows="3"
                    className="form-control" 
                    value={this.props.nivel_competencia.descripcion || ''}
                    onChange={(e)=>this.props.handleInputArrays(e, 'nivel_competencias', 'descripcion', this.props.nivel_competencia.id)}>
                </textarea>
                <div className="col-12 text-right mt-2">
                    
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Guardar</button>
                    <button type="button" className="btn btn-danger p-5 m-l-5"
                    onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                    this.props.borrarElemento('nivel_competencias', this.props.nivel_competencia.id)}}>
                    <i className="fas fa-times p-r-10"></i>Eliminar</button>
                    <button type="button" className="btn btn-primary" onClick={()=>{this.handleOpen()}}>      
                        <i className="fas fa-plus p-r-5" ></i>Logros de Aprendizaje
                    </button>
                </div>
                <Logros
                open = {this.state.open}
                handleClose={this.handleClose}
                nivel_competencia = {this.props.nivel_competencia} 
                handleInputArrays = {this.props.handleInputArrays}
                handleAddElement = {this.props.handleAddElement}
                />
            </div>
        );
    }
}