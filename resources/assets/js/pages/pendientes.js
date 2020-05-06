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

        this.abortController = new AbortController()


    }

    componentDidUpdate(prevProps) {
        this.$el = $(this.el);
        this.$el.DataTable(CONF_DATATABLE);
    
    }

    componentWillMount() {
        this.getPlanEstudios();
    }
    componentWillUnmount() {
        this.abortController.abort();
        this.$el.DataTable().destroy();
    }

    getPlanEstudios() {
        fetch('/api/pendientes', { signal: this.abortController.signal })
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
                    <td>{i}</td>
                    <td>{plan_estudio.id}</td>
                    <td>
                        <Link to={`InformacionBasica/${plan_estudio.id}`} className='btn btn-primary'>
                            <i className="fas fa-edit p-r-10"></i>Llenar
                        </Link>
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
                <h1 className="page-header">Planes de Estudio</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Número de Plan</th>
                                    <th>Llenar Información Básica</th>
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