import React, { Component } from 'react'
import Edit from './edit';
import Panel from '../../../utiles/Panel'

export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editandodominio: false,
            generica: "",
        }

        this.habilitareditdominios = this.habilitareditdominios.bind(this);

        
    }

    habilitareditdominios(estado){
        this.setState({editandodominio: estado});
    }

    addElemento(variable){
        if(variable == "nivel_genericas")
        {
            var form = {competencia_id: this.state.generica,
                        plan_estudio_id: this.props.id}
        }
        else
        {
            var form = {dominio_id:  this.props.dominio.id};
        }
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
            ,
            body: JSON.stringify(
                form
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
        .then(data => {[this.props.handleAddElement(variable, data),this.props.addNotification()]} )
        .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        })
        .finally(() => {this.setState({generica: ""})});

    }
    

    
    render() {
        if(!this.props.competencias_genericas)
        {
            return (
            
                <Panel key={'dominio-' + this.props.dominio.id} titulo={'Dominio ' + this.props.dominio.tipo_dominio.nombre + ': ' + ("D" + (this.props.i + 1) + " ") + (this.props.dominio.nombre || 'Sin Nombre')} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandodominio)}>
                    {
                        this.props.dominio.competencias && this.props.dominio.competencias.length > 0 ?
                        this.props.dominio.competencias.map((competencia,i) =>
                            <Edit key={competencia.id}
                            competencia = {competencia}
                            i={i}
                            handleInputArrays={this.props.handleInputArrays}
                            borrarElemento={this.props.borrarElemento}
                            habilitarGeneral = {this.props.habilitarGeneral}
                            habilitadogeneral = {this.props.habilitadogeneral}
                            habilitareditdominios = {this.habilitareditdominios}
                            addNotification = {this.props.addNotification}/>
                            )
                        :
                        <p>No posee ninguna competencia</p>
                    }
                    <div align="right" className="mt-2 mb-1">
                        <button disabled={!this.props.habilitadogeneral} type="button" className="btn btn-primary" onClick={()=>{this.addElemento('competencias')}}>      
                            <i className="fas fa-plus p-r-5" ></i>Crear Competencia
                        </button>
                    </div> 
                </Panel>
            )
        }
        else
        {
            const genericasSelect = this.props.comp_genericas.filter(generica => !this.props.competencias_genericas.some(competencia_generica => 
                competencia_generica.id == generica.id
            ))
            return (
                <Panel key={'dominio-generico'} titulo={'Dominio: Generico'} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.habilitareditdominios)}>
                {
                    this.props.competencias_genericas.map((competencia_generica,i) =>
                    <div className="row mb-3"key={i}>
                        <div className="col-md-9 border px-2 py-2 ">
                            {competencia_generica.sigla + ": " + competencia_generica.descripcion}
                        </div>
                        <button type="button" disabled={!this.props.habilitadogeneral} className="btn btn-danger ml-auto"
                        onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                        this.props.borrarElemento('nivel_genericas', competencia_generica.id,this.props.addNotification)}}>
                        <i className="fas fa-times p-r-10"></i>Eliminar</button>
                    </div>
                    )
                }
                {
                    genericasSelect.length > 0 &&
                    <div className="row">
                        <div className="col-6 p-0">
                            <select
                                value={this.state.generica}
                                className="form-control"
                                onChange={(e)=> this.setState({generica: e.target.value})}>
                                <option value="">Seleccione una Opción</option>
                                
                                {
                                    genericasSelect.map((opcionGenerica,i) =>
                                            <option key={i} value={opcionGenerica.id}>{opcionGenerica.sigla + " " + opcionGenerica.descripcion}</option>
                                        )
                                }
                            </select>
                        </div>
                        <div className="col-6 p-0">
                            <div align="right" className="mt-2 mb-1">
                                <button disabled={!this.props.habilitadogeneral || this.state.generica == ""} type="button" className="btn btn-primary" onClick={()=>{this.addElemento('nivel_genericas')}}>      
                                    <i className="fas fa-plus p-r-5" ></i>Asociar Competencia Generica
                                </button>
                            </div> 
                        </div>
                    </div>
                }
                
            </Panel>
            )
        };                        
    }
}