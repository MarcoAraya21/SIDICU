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

export default class escuelas extends Component {
    constructor (props) {
        super(props)
        this.state = {
            escuelas: [],
            openEscuela: false,
            sel_escuela: 0,
            facultades: [],
        }

        this.handleOpenEscuela = this.handleOpenEscuela.bind(this);
        this.handleCloseEscuela = this.handleCloseEscuela.bind(this);
        this.handleInputArraysAdmin = handleInputArraysAdmin.bind(this);
        this.handleAddElement = handleAddElement.bind(this);
        this.borrarElementoAdmin = borrarElementoAdmin.bind(this);
        this.abortController = new AbortController()
    }

    handleOpenEscuela(sel_escuela) {
        this.setState({ openEscuela: true, sel_escuela: sel_escuela });
    }
    handleCloseEscuela() {
        this.setState({ openEscuela: false, sel_escuela: 0 });
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.escuelas !== this.state.escuelas) {
            this.$el = $(this.el);
            this.$el.DataTable(CONF_DATATABLE);
        }
    }

    addElemento(variable){
        //e.preventDefault();
        fetch(`/api/${variable}`, {
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
        this.getEscuelas();
        this.getFacultades();
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy();
    }

    getEscuelas() {
        fetch('/api/escuelas', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ escuelas: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }

    getFacultades() {
        axios.get('/api/facultades').then((
            response
        ) =>{
                this.setState({
                    facultades: response.data
                })
            }            
        );        
    }

    listEscuelas() {
        return this.state.escuelas.map(
            (escuela, i) =>
                <React.Fragment key={i}>
                    <tr>
                        <td>{i + 1}</td>
                        <td>{escuela.nombre || 'No Asignado'}</td>
                        <td>{escuela.facultad ? escuela.facultad.nombre : 'No Asignado'}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={() => { this.handleOpenEscuela(escuela.id) }}>
                                <i className="fas fa-edit p-r-5" ></i>Editar
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => { this.borrarElementoAdmin('escuelas', escuela.id) }}>
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
                <h1 className="page-header">Escuelas</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Facultad</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.listEscuelas()
                                }
                            </tbody>
                        </table>
                    </div>
                    <div align="right" className="mt-2 mb-1">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.addElemento('escuelas')}}>      
                            <i className="fas fa-plus p-r-5" ></i>Crear Escuela
                        </button>
                    </div>
                </div>
                {
                    this.state.sel_escuela != 0 &&
                    <Edit
                        openEscuela={this.state.openEscuela}
                        handleCloseEscuela={this.handleCloseEscuela}
                        escuela={this.state.escuelas.find(escuela => escuela.id == this.state.sel_escuela)}
                        facultades={this.state.facultades}
                        handleInputArraysAdmin={this.handleInputArraysAdmin}
                    />
                }
            </div>
        );
    }
}