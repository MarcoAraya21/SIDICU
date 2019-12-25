import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            deshabilitado: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);

        
    }

    // codigo para agregar dominios
    // componentWillMount(){
    //     this.props.presupuestos.map(
    //         (presupuesto, i) =>
    //         this.handleAddElement('gasto_conceptos', {presupuesto_item_id: presupuesto.id, monto: 0})
    //     );
    // }
    habilitar(){
        this.setState({deshabilitado: false});
    }

    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/competencias/' + this.props.competencia.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.props.competencia
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
        .finally(() => {[this.setState({guardando: false, deshabilitado: true}),
                        this.props.habilitarGeneral(true)
        ]});
        //console.log('formulario enviado',this.state);
    }
    

    
    render() {
        return (
            <div className={"my-2 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                <p className="m-0">Ingrese Descripción de la Competencia: {this.props.i + 1}</p>
                <textarea rows="3"
                    disabled={this.state.deshabilitado}
                    className="form-control" 
                    value={this.props.competencia.descripcion || ''}
                    onChange={(e)=>this.props.handleInputArrays(e, 'competencias', 'descripcion', this.props.competencia.id)}>
                </textarea>
                
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={this.handleSubmit}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                    onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                    this.props.borrarElemento('competencias', this.props.competencia.id)}}>
                    <i className="fas fa-times p-r-10"></i>Eliminar</button>
                    
                </div>
            </div>
        );
    }
}