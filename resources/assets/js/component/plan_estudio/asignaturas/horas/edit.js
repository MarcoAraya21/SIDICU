import React, { Component } from 'react'

export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            deshabilitado: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);

    }

    habilitar(){
        this.setState({deshabilitado: false});
    }


    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/asignatura_horas/' + this.props.asignatura_hora.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.props.asignatura_hora
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
        .then(data => {this.props.addNotification()} )
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        })
        .finally(() => {[this.setState({guardando: false, deshabilitado: true}),
            this.props.habilitarGeneral(true)
        ]});
        //console.log('formulario enviado',this.state);
    }
    

    
    render() {
        return (
            <div className={"my-2 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                <p className="m-0">Ingrese Cantidad de Horas {this.props.asignatura_hora.tipo_hora.nombre}:</p>
                <input type="number"
                    disabled={this.state.deshabilitado}
                    className="form-control"
                    pattern="[0-9]*"
                    max="50"
                    value={this.props.asignatura_hora.cantidad || 0}
                    onChange={(e)=>this.props.handleInputArraysAsignatura(e, 'asignatura_horas', 'cantidad', this.props.asignatura_hora.id, this.props.asignaturaId)}>
                         
                </input>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={this.handleSubmit}><i className="fas fa-save p-r-10"></i>Guardar</button>
                </div>
            </div>
        );
    }
}