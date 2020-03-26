import React, { Component } from 'react'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.css';
import { CONF_DATATABLE } from '../utiles/lib';

export default class carreras extends Component {
    constructor (props) {
        super(props)
        this.state = {
            carreras: [],
        }

        this.abortController = new AbortController()
    }

    componentDidUpdate(prevProps) {
        this.$el = $(this.el);
        this.$el.DataTable(CONF_DATATABLE);
    
    }

    componentWillMount() {
        this.getCarreras();
    }

    componentWillUnmount() {
        this.$el.DataTable().destroy();
    }

    getCarreras() {
        fetch('/api/carreras', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ carreras: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }

    listCarreras() {
        return this.state.carreras.map(
            (carrera, i) =>
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{carrera.nombre || 'No Asignado'}</td>
                    <td>{carrera.cod_demre || 'No Tiene'}</td>
                    <td>{carrera.escuela ? carrera.escuela.nombre : 'No Asignado'}</td>
                    <td>{carrera.estado ? carrera.estado.nombre : 'No Asignado'}</td>
                    <td>{carrera.grado ? carrera.grado.nombre : 'No Asignado'}</td>
                    <td>{carrera.tipo_grado ? carrera.tipo_grado.nombre : 'No Asignado'}</td>
                </tr>

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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.listCarreras()
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}