import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
        carreras: [],
        plan_estudios: {
            nombre: "",
            observacion: "",
            carrera_id: 0,
            tipo_plan_id: 0,
            tipo_ingreso_id: 0
        }
    }}

    handleInput(e, atributo)
    {
        let plan_estudios2 = this.state.plan_estudios;
        plan_estudios2[atributo] = e.target.value;
        this.setState({plan_estudios: plan_estudios2});
    }


    handleSubmit(){
        fetch('/api/plan_estudios/',{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(  
                // {
                //     plan_estudios: this.state.plan_estudios
                // }
                this.state.plan_estudios
            )
        })
        .then(function(response) {
            console.log('response', response)
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
        
        })
        .catch(function(error) {
            console.log(error);
        })
        // .then( data =>
        // {
        //     if(data)
        //     {
        //         window.location.href = ("/" + data.id)
        //     }
        // })
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
                        <form data-parsley-validate="true">
                            <div className="col mb-2">
                                <label>Nombre del Plan de Estudios</label>
                                <input type="text" className="form-control" data-parsley-required="true"
                                    value={this.state.plan_estudios.nombre || ''}
                                    onChange={(e)=>this.handleInput(e, 'nombre')}>
                                </input>
                            </div>
                            <div className="col mb-2">
                                <label>Observación</label>
                                <input type="text" className="form-control" data-parsley-required="true"
                                    value={this.state.plan_estudios.observacion || ''}
                                    onChange={(e)=>this.handleInput(e, 'observacion')}>
                                </input>
                            </div>
                            <div className="col row mb-2">
                                <div className="col-4">
                                    <label>Carrera</label>
                                    <select defaultValue={""} className="form-control" data-parsley-required="true"
                                    onChange={(e)=>this.handleInput(e, 'carrera_id')}>
                                        <option disabled value="">Seleccione una Opción</option>
                                        {
                                            this.state.carreras.map(carrera=>
                                            <option value={carrera.id} key={carrera.id}>{carrera.nombre}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Tipo de Plan</label>
                                    <select defaultValue={""} className="form-control" data-parsley-required="true"
                                    onChange={(e)=>this.handleInput(e, 'tipo_plan_id')}>
                                        <option disabled value="">Seleccione una Opción</option>
                                        <option value='1'>Regular</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Tipo de Ingreso</label>
                                    <select defaultValue={""} className="form-control" data-parsley-required="true"
                                    onChange={(e)=>this.handleInput(e, 'tipo_ingreso_id')}>
                                        <option disabled value="">Seleccione una Opción</option>
                                        <option value='1'>PSU</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div align="right" className="mt-2">
                    <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>
                        <i className="fas fa-plus p-r-5" ></i>Crear Plan
                    </button>
                </div>
            </div> 
        );
    }
}

export default Index;