import React, { Component } from 'react'

export default class redaccion extends Component {
    constructor (props) {
        super(props)
        this.state = {
                redaccion: '',
                guardando: false,
                errores: {},
                deshabilitado: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);


        //this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    habilitar(){
        this.setState({deshabilitado: false});
    }

    handleInput(e, atributo)
    {
        this.setState({[atributo]: e.target.value});
    }



    handleSubmit(){
        this.setState({guardando: true})
        fetch('/api/plan_estudios/' + this.props.params, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.state
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
        .then(data => {[this.props.handleUpdateRedaccion(this.state), this.props.addNotification()]} )
        .catch(error => {
            this.props.addNotificationAlert('No se ha podido guardar.')
        })
        .finally(() => {[this.setState({guardando: false, deshabilitado: true}),
            this.props.habilitarGeneral(true)
        ]});
    }

    componentWillMount() {
        this.setState({redaccion: this.props.redaccion})
    }
    
    render() {
        return (
            <div className="container py-4">
                <div className={"col-12 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>                    
                    <legend>Redacción del Plan de Estudios</legend>
                    <div className="form-group">
                        <textarea
                            disabled={this.state.deshabilitado}
                            className={ "form-control " + (this.state.errores.redaccion && 'is-invalid')}  rows="6"
                            value={this.state.redaccion || ''}
                            onChange={(e)=>this.handleInput(e, 'redaccion')}>
                        </textarea>
                        {this.state.errores.redaccion &&
                            <div className="invalid-feedback" align="right">{this.state.errores.redaccion}</div>}
                    </div>
                </div>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={!this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false)]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    {
                        this.state.guardando ?
                            <button className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Guardando</button>
                        :                             
                            <button type="button" disabled={this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={this.handleSubmit}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    }
                </div>
            </div>
        );
    }
}