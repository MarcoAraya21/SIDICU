import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Show from './show';
import Dominios from './dominios';



export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            plan_estudios: {}
        }


        //this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    getPlanEstudio() {
        // console.log(projectId);
        axios.get(`/api/plan_estudios/${this.props.match.params.id}`).then((
            response // console.log(response.data.tasks)
        ) =>{
                this.setState({
                    plan_estudios: response.data
                })
                // console.log(response.data.informe_avance)
            }            
            //console.log(response.data)
        );        
    }

    componentWillMount() {
        this.getPlanEstudio();
    }


    render() {
        return (
            <div className="container py-4">
                <ReactNotification ref={this.notificationDOMRef}/>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item"><Link to="">Inicio</Link></li>
                    <li className="breadcrumb-item active">Plan Estudio</li>
                </ol>
                <h1 className="page-header">Plan {this.props.match.params.id}</h1>
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <ul className="nav nav-tabs">
                            <li className="nav-items">
                                <a href="#seguimiento-tab-show" data-toggle="tab" className="nav-link active">
                                    <span className="d-sm-none">Plan de Estudios</span>
                                    <span className="d-sm-block d-none">Información del Plan de Estudios</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#seguimiento-tab-1" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Dominios</span>
                                    <span className="d-sm-block d-none">Dominios del Plan</span>
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="seguimiento-tab-show">
                                <Show plan_estudios={this.state.plan_estudios} params={this.props.match.params.id}/>
                            </div>
                            <div className="tab-pane fade" id="seguimiento-tab-1">
                                <Dominios dominios={this.state.plan_estudios.dominios}/>
                            </div>
                        </div>			
                    </div>
               </div> 
            </div>
        );
    }
}