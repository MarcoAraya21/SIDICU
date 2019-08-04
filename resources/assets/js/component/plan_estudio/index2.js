import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
        carreras: [],
    }

    this.addElemento = this.addElemento.bind(this);
    this.abortController = new AbortController()

    }


    addElemento(){
      //e.preventDefault();
      fetch(`/api/plan_estudios/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json'
          }
      })
      .then(function(response) {
          if(response.ok) {
              return response.json();
          } else {
              throw "Error en la llamada Ajax";
          }
       
       })
  }

    componentWillMount() {
    this.getCarreras();
    }

    getCarreras() {
        axios.get('/api/carreras').then((
            response
        ) =>{
                this.setState({
                    carreras: response.data
                })
            }            
        );        
    }

    render() {
        return (
            <div className='container py-4'>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item active">Inicio</li>
                </ol>
                <h1 className="page-header">Nuevo Plan de Estudios</h1>
                <div className="panel-body bg-white">
                    <div className="col-12">
                        <div className="col mb-2">
                            <label>Nombre del Plan de Estudios</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="col mb-2">
                            <label>Observación</label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="col row mb-2">
                            <div className="col-4">
                                <label>Carrera</label>
                                <select className="form-control">
                                    <option value="">Seleccione una Opción</option>
                                    {
                                        this.state.carreras.map(carrera=>
                                        <option value={carrera.id} key={carrera.id}>{carrera.nombre}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-4">
                                <label>Tipo de Plan</label>
                                <select className="form-control">
                                    <option value="" >Seleccione una Opción</option>
                                    <option value="1">Regular</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label>Tipo de Ingreso</label>
                                <select className="form-control">
                                    <option value="">Seleccione una Opción</option>
                                    <option value="1">PSU</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div align="right" className="mt-2">
                    <button type="button" className="btn btn-primary" onClick={this.addElemento}>
                        <i className="fas fa-plus p-r-5" ></i>Crear Plan
                    </button>
                </div>
            </div> 
        );
    }
}

export default Index;