import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.css';
import { CONF_DATATABLE } from '../component/utiles/lib';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            asesores: []
        }
        this.asignarPlan = this.asignarPlan.bind(this);
        this.abortController = new AbortController()

    }


    componentDidUpdate(prevProps) {
        this.$el = $(this.el);
        this.$el.DataTable(CONF_DATATABLE);
    
    }
    asignarPlan(asesor) {
        swal({
            title: 'Estas seguro que deseas asignar un plan a "' + asesor.nombre + ' ' + asesor.apellido_paterno + '" ?',
            icon: "info",
            buttons: {
                cancel: 'Cancelar',
                confirm: "Asignar"
            },
            closeOnEsc: false,
            allowOutsideClick: false
            // dangerMode: true,
        })
            .then((value) => {
                if (value) {
                    fetch(`/api/plan_estudios/`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                usuario_id: asesor.id
                            }
                        )
                    })
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw "Error en la llamada Ajax";
                            }

                        })
                        .then((data) => {
                            if(data.status == "danger")
                            {
                                swal({
                                    title: "Oops...",
                                    text: data.message,
                                    icon: "error",
                                    closeOnEsc: false,
                                    allowOutsideClick: false
                                });
                            }
                            else
                            {
                                swal({
                                    title: data.message,
                                    text: "Se ha asignado correctamente!",
                                    icon: "success",
                                    closeOnEsc: false,
                                    allowOutsideClick: false
                                });
                                let new_asesores = this.state.asesores.map(asesor_state => {
                                    return {
                                        ...asesor_state,
                                        planes_pendientes: (asesor_state.id == asesor.id) ?
                                            asesor_state.planes_pendientes + 1 : asesor_state.planes_pendientes,
                                        planes_asignados: (asesor_state.id == asesor.id) ?
                                        asesor_state.planes_asignados + 1 : asesor_state.planes_asignados,
                                    }
                                });
                                this.setState({ asesores: new_asesores })
                            }
                        })
                        .catch(function (error) {
                            swal({
                                title: "Oops...",
                                text: "Ha ocurrido un error en el servidor, intente nuevamente!",
                                icon: "error",
                                closeOnEsc: false,
                                allowOutsideClick: false
                            })
                        })
                }
            });
        //e.preventDefault();

    }


    componentWillMount() {
        this.getAsesores();
    }
    componentWillUnmount() {
        this.abortController.abort();
        this.$el.DataTable().destroy();

    }
    getAsesores() {
        fetch('/api/asesores', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ asesores: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }

    listAsesores(asesores) {
        return asesores.map(
            (asesor, i) =>
                <tr key={i}>
                    <td>{asesor.nombre} {asesor.apellido_paterno}</td>
                    <td>{asesor.correo}</td>
                    <td>{asesor.rut}</td>
                    <td>{asesor.planes_pendientes}/{asesor.planes_asignados}</td>
                    <td>
                        <button type="button" className="btn btn-primary p-5 m-l-5"
                            onClick={() => this.asignarPlan(asesor)}>
                            <i className="fas fa-plus p-r-10"></i>Asignar
                        </button>
                    </td>
                </tr>

        )
    }

    render() {
        return (
            <div className='container py-4'>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item active">Inicio</li>
                </ol>
                <h1 className="page-header">Listado de Asesores</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Rut</th>
                                    <th>Planes Pendientes/Asignados</th>
                                    <th>Asignar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.listAsesores(this.state.asesores)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;