import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {borrarElemento} from '../component/utiles/lib';
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
            plan_estudios: [],
        }

        this.abortController = new AbortController()


    }

    componentDidUpdate(prevProps) {
        this.$el = $(this.el);
        this.$el.DataTable(CONF_DATATABLE);
    
    }

    evaluar(plan) {
        swal({
            icon: "info",
            buttons: {
                cancel: 'Cancelar',
                rechazar: 'Rechazar',
                aprobar: 'Aprobar'
            },
            closeOnEsc: false,
            allowOutsideClick: false
            // dangerMode: true,
        })
        .then((value) => {
            if (value) {
                fetch(`/api/revisar/${plan}`, {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        value
                    )
                })
                .then(function(response) {
                    if(response.ok) {
                        return response.json();
                    } else {
                        if(response.redirected)
                        {
                            window.location.href = "/";
                        }
                        throw "Error en la llamada Ajax";
                    }
                })
                .then((data) => {
                    if(data)
                    {
                        
                        swal({
                            title: "Se ha cambiado el estado correctamente!",
                            icon: "success",
                            closeOnEsc: false,
                            allowOutsideClick: false
                        });
                        
                        let plan_estudios = this.state.plan_estudios.map(plan_estudio => {
                            if(plan_estudio.id == plan)
                            {
                                return {...plan_estudio, estado_id: value == "aprobar" ? 4 : 2}
                            }
                            else
                            {
                                return plan_estudio;
                            }
                        });
                        
                        this.setState({ plan_estudios: plan_estudios })
                    }
                    else
                    {
                        swal({
                            title: "Oops...",
                            text: "No se ha podido cambiar el estado.",
                            icon: "error",
                            closeOnEsc: false,
                            allowOutsideClick: false
                        });
                        
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

    }


    componentWillMount() {
        this.getPlanEstudios();
    }
    componentWillUnmount() {
        this.abortController.abort();
        this.$el.DataTable().destroy();
    }

    getPlanEstudios() {
        fetch('/api/listado_planes', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ plan_estudios: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }

    listPlanEstudio(plan_estudios) {
        return plan_estudios.map(
            (plan_estudio, i) =>
                <tr key={i}>
                    <td>{plan_estudio.id}</td>
                    <td>{plan_estudio.nombre || 'No Asignado'}</td>
                    <td>{plan_estudio.asesor_uic.nombre} {plan_estudio.asesor_uic.apellido_paterno}</td>
                    <td>{plan_estudio.coordinador ? (plan_estudio.coordinador.nombre + ' ' + plan_estudio.coordinador.apellido_paterno) : 'No Asignado'}</td>
                    <td>
                        {
                            plan_estudio.estado_id == 1 ?
                            <button type="button" className="btn btn-warning p-5 m-l-5" disabled
                                style={{cursor: 'not-allowed'}}>
                                <i className="fas fa-ellipsis-h p-r-10"></i>Pendiente
                            </button>
                            :
                            (plan_estudio.estado_id == 2 ?
                            <Link to={`Plan/Ver/${plan_estudio.id}`} className="btn btn-primary p-5 m-l-5">
                                <i className="fas fa-pencil-alt p-r-10"></i>En Proceso
                            </Link>
                            :
                            (plan_estudio.estado_id == 3 ?
                            <Link to={`Plan/Ver/${plan_estudio.id}`} className="btn btn-lime p-5 m-l-5">
                                <i className="fas fa-search p-r-10"></i>En Revisión
                            </Link>
                            :
                            plan_estudio.estado_id == 4 &&
                            <Link to={`Plan/Ver/${plan_estudio.id}`} className="btn btn-success p-5 m-l-5">
                                <i className="fas fa-check p-r-10"></i>Finalizado
                            </Link>
                            )
                            )
                        }
                        
                    </td>
                    <td>
                        {
                            plan_estudio.estado_id == 3 &&
                            <button type="button" className="btn btn-primary p-5 m-l-5"
                                onClick={() => this.evaluar(plan_estudio.id)}>
                                <i className="fas fa-edit p-r-10"></i>Evaluar
                            </button>
                        }
                    </td>
                    {/* <td><Link to={`${plan_estudio.id}`} className='btn btn-primary'>Abrir</Link></td> */}
                </tr>

        )
    }

    render() {
        return (
            <div className='container py-4'>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item active">Inicio</li>
                </ol>
                <h1 className="page-header">Planes de Estudio</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Plan</th>
                                    <th>Asesor Uic</th>
                                    <th>Coordinador</th>
                                    <th>Ver</th>
                                    <th>Evaluar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.listPlanEstudio(this.state.plan_estudios)
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