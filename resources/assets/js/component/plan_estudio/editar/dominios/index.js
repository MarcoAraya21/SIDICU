import React, { Component } from 'react'
import Edit from './edit';
export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            guardando: false
        }
        
        this.addElemento = this.addElemento.bind(this);

    }

    addElemento(variable){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch(`/api/${variable}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {plan_estudio_id:  this.props.id,
                tipo_dominio_id: 1}
            )
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
        .then(data => {[this.props.handleAddElement(variable, data),this.props.addNotification()]} )
        .catch(error => {
            this.props.addNotificationAlert('No se ha podido guardar.')
        })
        .finally(() => {this.setState({guardando: false})});
         
        
    }
    

    
    render() {
        return (
            <div className="container py-4">
                <div className="col-12">
                    <legend>Dominios</legend>
                    <React.Fragment>
                        <h4>Especialidad</h4>
                            {
                            this.props.dominios && this.props.dominios.filter(dominio =>
                                dominio.tipo_dominio_id == 1).map( (dominio,i) =>
                                    <Edit key={dominio.id}
                                        dominio = {dominio}
                                        i={i}
                                        handleUpdate={this.props.handleUpdate}
                                        borrarElemento={this.props.borrarElemento}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}
                                        addNotificationAlert = {this.props.addNotificationAlert}
                                    />
                                )
                            }
                            <div align="right" className="mt-2 mb-1">
                            {
                                this.state.guardando ?
                                    <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Creando</button>                      
                                :
                                    <button disabled={!this.props.habilitadogeneral} type="button" className="btn btn-primary" onClick={()=>{this.addElemento('dominios')}}>      
                                        <i className="fas fa-plus p-r-5" ></i>Crear Dominio
                                    </button>
                            }
                            </div>
                    </React.Fragment>
                </div>  
            </div>
        );
    }
}