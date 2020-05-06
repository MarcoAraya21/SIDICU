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

export default class grados extends Component {
    constructor (props) {
        super(props)
        this.state = {
            grados: [],
            openGrado: false,
            sel_grado: 0,
        }

        this.handleOpenGrado = this.handleOpenGrado.bind(this);
        this.handleCloseGrado = this.handleCloseGrado.bind(this);
        this.handleInputArraysAdmin = handleInputArraysAdmin.bind(this);
        this.handleAddElement = handleAddElement.bind(this);
        this.borrarElementoAdmin = borrarElementoAdmin.bind(this);
        this.abortController = new AbortController()
    }

    handleOpenGrado(sel_grado) {
        this.setState({ openGrado: true, sel_grado: sel_grado });
    }
    handleCloseGrado() {
        this.setState({ openGrado: false, sel_grado: 0 });
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.grados !== this.state.grados) {
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
        this.getGrados();
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy();
    }

    getGrados() {
        fetch('/api/grados', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ grados: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }

    

    listGrados() {
        return this.state.grados.map(
            (grado, i) =>
                <React.Fragment key={i}>
                    <tr>
                        <td>{i + 1}</td>
                        <td>{grado.nombre || 'No Asignado'}</td>
                        <td>{grado.estado_id == 1 ? 'Pendiente' :  grado.estado_id == 4 ? 'Aprobada' : 'Indefinido'}</td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={() => { this.handleOpenGrado(grado.id) }}>
                                <i className="fas fa-edit p-r-5" ></i>Editar
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => { this.borrarElementoAdmin('grados', grado.id) }}>
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
                <h1 className="page-header">Grados</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.listGrados()
                                }
                            </tbody>
                        </table>
                    </div>
                    <div align="right" className="mt-2 mb-1">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.addElemento('grados')}}>      
                            <i className="fas fa-plus p-r-5" ></i>Crear Grado
                        </button>
                    </div>
                </div>
                {
                    this.state.sel_grado != 0 &&
                    <Edit
                        openGrado={this.state.openGrado}
                        handleCloseGrado={this.handleCloseGrado}
                        grado={this.state.grados.find(grado => grado.id == this.state.sel_grado)}
                        handleInputArraysAdmin={this.handleInputArraysAdmin}
                    />
                }
            </div>
        );
    }
}