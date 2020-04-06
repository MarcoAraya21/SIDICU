import React, { Component } from 'react'
import Panel from '../../../utiles/Panel'
export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dominio: {
                nombre: '',
                descripcion: '',
            },
            deshabilitado: true,
            editando: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);
        
    }

    // codigo para agregar dominios
    // componentWillMount(){
    //     this.props.presupuestos.map(
    //         (presupuesto, i) =>
    //         this.handleAddElement('gasto_conceptos', {presupuesto_item_id: presupuesto.id, monto: 0})
    //     );
    // }
    habilitar(){
        this.setState({deshabilitado: false});
    }

    componentWillMount() {
        this.setState({dominio: {nombre: this.props.dominio.nombre,
                        descripcion: this.props.dominio.descripcion}})
    }

    
    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/dominios/' + this.props.dominio.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.state.dominio
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
        .then(data => {[this.props.handleUpdate(this.state.dominio, "dominios", this.props.dominio.id), this.props.addNotification()]} )
        .catch(error => {
            [this.props.addNotificationAlert('No se ha podido guardar.'), 
            this.setState({dominio: {...this.state.dominio, 
                nombre: this.props.dominio.nombre,
                descripcion: this.props.dominio.descripcion,}})
            ]

        })
        .finally(() => {[this.setState({guardando: false, deshabilitado: true, editando: false}),
                        this.props.habilitarGeneral(true)
        ]});
    }
    

    
    render() {
        return (
            <Panel titulo={("D" + (this.props.i + 1) + " ") + (this.props.dominio.nombre || 'Sin Nombre')} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && this.state.deshabilitado)}>
                <div className="mb-2">
                    <p className="m-0">Nombre:</p>
                    <input type="text"
                        disabled={this.state.deshabilitado}
                        className="form-control" 
                        value={this.state.dominio.nombre || ''}
                        onChange={(e)=>this.setState({dominio: {...this.state.dominio, nombre: e.target.value}})}>
                    </input>
                </div>
                <div className="mb-2">
                    <p className="m-0">Descripción:</p>
                    <textarea
                        disabled={this.state.deshabilitado}
                        className="form-control" rows="3"
                        value={this.state.dominio.descripcion || ''}
                        onChange={(e)=>this.setState({dominio: {...this.state.dominio, descripcion: e.target.value}})}>
                    </textarea>
                </div>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit()}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    {!this.props.transversal && 
                        <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                        onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                        this.props.borrarElemento('dominios', this.props.dominio.id, this.props.addNotification)}}>
                        <i className="fas fa-times p-r-10"></i>Eliminar</button>
                    }
                </div>
            </Panel>
        );
    }
}