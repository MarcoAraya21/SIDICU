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
            plan_estudios: []
        }
        // this.handleAddElement = this.handleAddElement.bind(this);
        // this.addElemento = this.addElemento.bind(this);
        // this.borrarElemento = borrarElemento.bind(this);
        this.abortController = new AbortController()


    }

    componentDidUpdate(prevProps) {
        this.$el = $(this.el);
        this.$el.DataTable(CONF_DATATABLE);
    
    }


    // handleAddElement(key, elemento) {
    //     console.log(key);
    //     console.log(elemento);
    //     var state = this.state[key];
    //     state.push(elemento);
    //     this.setState({ [key]: state });

    // }

    // addElemento() {
    //     //e.preventDefault();
    //     fetch(`/api/plan_estudios/`, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw "Error en la llamada Ajax";
    //         }

    //     })
    //     .then(data => this.handleAddElement('plan_estudios', data));
    // }

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
                            plan_estudio.estado_id == 3 &&
                            <Link to={`Plan/Ver/${plan_estudio.id}`} className="btn btn-lime p-5 m-l-5">
                                <i className="fas fa-search p-r-10"></i>En Revisión
                            </Link>
                            )
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