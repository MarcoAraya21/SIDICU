import React, { Component } from 'react'

export default class edit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            competencia: {
                descripcion: '',
                funcion_clave: '',
            },
            deshabilitado: true,
            editando: false,
            guardando: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.habilitar = this.habilitar.bind(this);

        
    }

    componentWillMount() {
        this.setState({competencia: {descripcion: this.props.competencia.descripcion,
                        funcion_clave: this.props.competencia.funcion_clave}})
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

    handleSubmit(){
        //e.preventDefault();
        this.setState({guardando: true})
        fetch('/api/competencias/' + this.props.competencia.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                this.state.competencia
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
        .then(data => {[this.props.handleUpdate(this.state.competencia, "competencias", this.props.competencia.id), this.props.addNotification()]} )
        .catch(error => {
            [this.props.addNotificationAlert('No se ha podido guardar.'), 
            this.setState({competencia: {...this.state.competencia, 
                descripcion: this.props.competencia.descripcion,
                funcion_clave: this.props.competencia.funcion_clave,}})
            ]
        })
        .finally(() => {[this.setState({guardando: false, deshabilitado: true, editando: false}),
                        this.props.habilitarGeneral(true),
                        this.props.habilitareditdominios(false)
        ]});
        //console.log('formulario enviado',this.state);
    }
    

    
    render() {
        return (
            <div className={"my-2 " + ((!this.props.habilitadogeneral && this.state.deshabilitado) ? "deshabilitado" : "")}>
                <p className="m-0">Ingrese Descripción de la Competencia: {this.props.i + 1}</p>
                <textarea rows="3"
                    disabled={this.state.deshabilitado}
                    className="form-control" 
                    value={this.state.competencia.descripcion || ''}
                    onChange={(e)=>this.setState({competencia: {...this.state.competencia, descripcion: e.target.value}})}>
                </textarea>
                <p className="mb-0 mt-2">Ingrese Función Clave:</p>
                <textarea rows="3"
                    disabled={this.state.deshabilitado}
                    className="form-control" 
                    value={this.state.competencia.funcion_clave || ''}
                    onChange={(e)=>this.setState({competencia: {...this.state.competencia, funcion_clave: e.target.value}})}>
                </textarea>
                <div className="col-12 text-right mt-2">
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-lime p-5" onClick={()=> [this.habilitar(),this.props.habilitarGeneral(false), this.props.habilitareditdominios(true), this.setState({editando: true})]}><i className="fas fa-pencil-alt p-r-10"></i>Editar</button>
                    {
                        this.state.guardando ?
                            <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Guardando</button>                      
                        :
                            <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || this.state.deshabilitado} className="btn btn-primary p-5 m-l-5" onClick={() => this.handleSubmit()}><i className="fas fa-save p-r-10"></i>Guardar</button>
                    }
                    <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-danger p-5 m-l-5"
                    onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                    this.props.borrarElemento('competencias', this.props.competencia.id,this.props.addNotification, this.props.addNotificationAlert)}}>
                    <i className="fas fa-times p-r-10"></i>Eliminar</button>
                    
                </div>
            </div>
        );
    }
}