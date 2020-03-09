import React, { Component } from 'react'
import Panel from '../../../utiles/Panel';

export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }



    
    render() {
        return (
            !this.props.competencias_genericas ?
            <Panel key={'dominio-' + this.props.dominio.id} titulo={'Dominio ' + this.props.dominio.tipo_dominio.nombre + ': ' + ("D" + (this.props.i + 1) + " ") + (this.props.dominio.nombre || 'Sin Nombre')} border={true} collapse={true} expand={true}>
                {
                    this.props.dominio.competencias && this.props.dominio.competencias.length > 0 ?
                    this.props.dominio.competencias.map((competencia,i) =>
                        <div key={competencia.id} className="my-2">
                            <p className="m-0">Descripción de la Competencia: {i + 1}</p>
                            <p>
                                {competencia.descripcion || ''}
                            </p>
                        </div>
                        )
                    :
                    <p>No posee ninguna competencia</p>
                } 
            </Panel>
            :
            <Panel key={'dominio-generico'} titulo={'Dominio: Generico'} border={true} collapse={true} expand={true}>
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