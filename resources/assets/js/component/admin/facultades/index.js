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

export default class facultades extends Component {
    constructor (props) {
        super(props)
        this.state = {
            facultades: [],
            openFacultad: false,
            sel_facultad: 0,
        }

        this.handleOpenFacultad = this.handleOpenFacultad.bind(this);
        this.handleCloseFacultad = this.handleCloseFacultad.bind(this);
        this.handleInputArraysAdmin = handleInputArraysAdmin.bind(this);
        this.handleAddElement = handleAddElement.bind(this);
        this.borrarElementoAdmin = borrarElementoAdmin.bind(this);
        this.abortController = new AbortController()
    }

    handleOpenFacultad(sel_facultad) {
        this.setState({ openFacultad: true, sel_facultad: sel_facultad });
    }
    handleCloseFacultad() {
        this.setState({ openFacultad: false, sel_facultad: 0 });
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.facultades !== this.state.facultades) {
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
        this.getFacultades();
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy();
    }

    getFacultades() {
        fetch('/api/facultades', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ facultades: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }


    listFacultades() {
        return this.state.facultades.map(
            (facultad, i) =>
                <React.Fragment key={i}>
                    <tr>
                        <td>{i + 1}</td>
                        <td>{facultad.nombre || 'No Asignado'}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={() => { this.handleOpenFacultad(facultad.id) }}>
                                <i className="fas fa-edit p-r-5" ></i>Editar
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => { this.borrarElementoAdmin('facultades', facultad.id) }}>
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
                <h1 className="page-header">Facultades</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.listFacultades()
                                }
                            </tbody>
                        </table>
                    </div>
                    <div align="right" className="mt-2 mb-1">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.addElemento('facultades')}}>      
                            <i className="fas fa-plus p-r-5" ></i>Crear Facultad
                        </button>
                    </div>
                </div>
                {
                    this.state.sel_facultad != 0 &&
                    <Edit
                        openFacultad={this.state.openFacultad}
                        handleCloseFacultad={this.handleCloseFacultad}
                        facultad={this.state.facultades.find(facultad => facultad.id == this.state.sel_facultad)}
                        handleInputArraysAdmin={this.handleInputArraysAdmin}
                    />
                }
            </div>
        );
    }
}