import React, { Component } from 'react'
import Edit from './edit';
import Panel from '../../../utiles/Panel'

export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editandodominio: false
        }

        this.habilitareditdominios = this.habilitareditdominios.bind(this);

        
    }

    habilitareditdominios(estado){
        this.setState({editandodominio: estado});
    }

    addElemento(variable){
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
            ,
            body: JSON.stringify(
                {dominio_id:  this.props.dominio.id}
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
    }
    

    
    render() {
        return (
            !this.props.competencias_genericas ?
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
            :
            <Panel key={'dominio-generico'} titulo={'Dominio: Generico'} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.habilitareditdominios)}>
                {
                    this.props.competencias_genericas.map((competencia_generica,i) =>
                    <div key={i} className="border px-2 py-2 mb-3">
                        {competencia_generica.sigla + ": " + competencia_generica.descripcion}
                    </div>
                    )
                }
            </Panel>
            
            
        );
    }
}