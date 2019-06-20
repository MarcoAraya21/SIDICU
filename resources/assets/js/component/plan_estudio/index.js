import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {handleInput, handleInput2, handleTiposResultado, handleInputOtros, handleContenido, handleInputArrays, handleAddElement} from '../utiles/lib';


export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            plan_estudios: {
                nombre: '',
                observacion: '',
                dominios: []
            }
        }
        this.handleInput = handleInput.bind(this);
        this.handleInputArrays = handleInputArrays.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();


        //this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    getPlanEstudio() {
        // console.log(projectId);
        axios.get(`/api/plan_estudios/${this.props.match.params.id}`).then((
            response // console.log(response.data.tasks)
        ) =>{
                this.setState({
                    plan_estudios: {nombre: response.data.nombre,
                    observacion: response.data.observacion,
                    dominios: response.data.dominios}

                })
                // console.log(response.data.informe_avance)
            }            
            //console.log(response.data)
        );        
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
          title: "Guardado",
          message: "La Información ha sido almacenada",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "zoomIn"],
          animationOut: ["animated", "zoomOut"],
          dismiss: { duration: 3000 },
          dismissable: { click: true }
        });
      }


    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/plan_estudios/' + this.props.match.params.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.state.plan_estudios
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
        .then(data => {this.addNotification()} )
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        })
        .finally(() => {this.setState({guardando: false})});
        //console.log('formulario enviado',this.state);
    }

    componentWillMount() {
        this.getPlanEstudio();
        //TreeView.init();
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
                <div className="col-12">
                    <div className="row p-b-10">
                        <label className="col-3">Nombre</label>
                        <input type="text" className="form-control col-9"
                        value={this.state.plan_estudios.nombre || ''}
                        onChange={(e)=>this.handleInputArrays(e, 'plan_estudios', 'nombre')}></input>
                    </div>
                    <div className="row">
                        <label className="col-3">Observación</label>
                        <textarea className="form-control col-9" rows="3"
                         value={this.state.plan_estudios.observacion || ''}
                         onChange={(e)=>this.handleInputArrays(e, 'plan_estudios', 'observacion')}></textarea>
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    { this.state.guardando ?
                    <button className="btn btn-primary disabled"><i className="fas fa-spinner fa-pulse"></i> Guardando</button>                                
                    :
                    <button type="button" className="btn btn-primary m-b-10" onClick={this.handleSubmit}>Guardar</button>
                    }
                </div>
            </div>
        );
    }
}