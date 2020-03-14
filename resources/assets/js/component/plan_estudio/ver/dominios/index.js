import React, { Component } from 'react'
import Panel from '../../../utiles/Panel'
export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        

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
                                    <Panel key={i} titulo={("D" + (i + 1) + " ") + (dominio.nombre || 'Sin Nombre')} border={true} collapse={true} expand={true}>
                                        <div className="mb-2">
                                            <p className="my-2">Nombre:</p>
                                            <p className="px-2 py-2 border">
                                                {dominio.nombre || ''}
                                            </p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="my-2">Descripción:</p>
                                            <p className="px-2 py-2 border">
                                                {dominio.descripcion || ''}
                                            </p>
                                        </div>
                                    </Panel>
                                )
                            }
                    </React.Fragment>
                </div>  
            </div>
        );
        
    }
}