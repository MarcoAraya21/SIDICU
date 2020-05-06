import React, { Component } from 'react'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.css';
import { handleAddElement, handleInputArraysAdmin, borrarElementoAdmin, CONF_DATATABLE } from '../../utiles/lib';
import axios from 'axios';
import Edit from './edit';

export default class carreras extends Component {
    constructor (props) {
        super(props)
        this.state = {
            carreras: [],
            openCarrera: false,
            sel_carrera: 0,
            escuelas: [],
            grados: [],
        }

        this.handleOpenCarrera = this.handleOpenCarrera.bind(this);
        this.handleCloseCarrera = this.handleCloseCarrera.bind(this);
        this.handleInputArraysAdmin = handleInputArraysAdmin.bind(this);
        this.handleAddElement = handleAddElement.bind(this);
        this.borrarElementoAdmin = borrarElementoAdmin.bind(this);
        this.abortController = new AbortController()
    }

    handleOpenCarrera(sel_carrera) {
        this.setState({ openCarrera: true, sel_carrera: sel_carrera });
    }
    handleCloseCarrera() {
        this.setState({ openCarrera: false, sel_carrera: 0 });
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.carreras !== this.state.carreras) {
            this.$el = $(this.el);
            this.$el.DataTable(CONF_DATATABLE);
        }
    }

    addElemento(variable){
        //e.preventDefault();
        fetch(`/api/${variable}_admin`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(function(response) {
            if(response.redirected)
            {
                window.location.href = "/";
            }
            else
            {
                if(response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }   
            }
        })
        .then(data => {[
            swal({
                text: "Se ha Agregado Correctamente!",
                icon: "success",
                timer: 1000,
                button: false
            })
            .then(function() {
                location.reload()
            })
            ,

        ]} )
        .catch(function(error) {
            swal({
                text: "No se ha podido agregar, intente nuevamente.",
                icon: "error",
                timer: 2000,
                button: false
            })
        })
         
        
    }

    componentWillMount() {
        this.getCarreras();
        this.getEscuelas();
        this.getGrados();
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy();
    }

    getCarreras() {
        fetch('/api/all_carreras', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ carreras: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }

    getEscuelas() {
        axios.get('/api/escuelas').then((
            response
        ) =>{
                this.setState({
                    escuelas: response.data
                })
            }            
        );        
    }

    getGrados() {
        axios.get('/api/grados').then((
            response
        ) =>{
                this.setState({
                    grados: response.data
                })
            }            
        );        
    }

    listCarreras() {
        return this.state.carreras.map(
            (carrera, i) =>
                <React.Fragment key={i}>
                    <tr>
                        <td>{i + 1}</td>
                        <td>{carrera.nombre || 'No Asignado'}</td>
                        <td>{carrera.cod_demre || 'No Tiene'}</td>
                        <td>{carrera.titulo || 'No Asignado'}</td>
                        <td>{carrera.grado ? carrera.grado.nombre : 'No Asignado'}</td>
                        <td>{carrera.tipo_grado_id == 1 ? 'Pregrado' : 'Postgrado'}</td>
                        <td>{carrera.estado_id == 1 ? 'Pendiente' :  carrera.estado_id == 4 ? 'Aprobada' : 'Indefinido'}</td>
                        <td>{carrera.escuela ? carrera.escuela.nombre : 'No Asignado'}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={() => { this.handleOpenCarrera(carrera.id) }}>
                                <i className="fas fa-edit p-r-5" ></i>Editar
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => { this.borrarElementoAdmin('carreras', carrera.id) }}>
                                <i className="fas fa-times p-r-5" ></i>Eliminar
                            </button>
                        </td>
                    </tr>
                </React.Fragment>
        )
    }

    
    render() {
        return (
            <div className="container py-4">
                <h1 className="page-header">Carreras</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Cod. Demre</th>
                                    <th>Título</th>
                                    <th>Grado</th>
                                    <th>Tipo de Grado</th>
                                    <th>Estado</th>
                                    <th>Escuela</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.listCarreras()
                                }
                            </tbody>
                        </table>
                    </div>
                    <div align="right" className="mt-2 mb-1">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.addElemento('carreras')}}>      
                            <i className="fas fa-plus p-r-5" ></i>Crear Carrera
                        </button>
                    </div>
                </div>
                {
                    this.state.sel_carrera != 0 &&
                    <Edit
                        openCarrera={this.state.openCarrera}
                        handleCloseCarrera={this.handleCloseCarrera}
                        carrera={this.state.carreras.find(carrera => carrera.id == this.state.sel_carrera)}
                        escuelas={this.state.escuelas}
                        grados={this.state.grados}
                        handleInputArraysAdmin={this.handleInputArraysAdmin}
                    />
                }
            </div>
        );
    }
}