import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Panel from '../../../utiles/Panel'
import Show from './show';

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
                    <legend>Competencias</legend>
                    <React.Fragment>
                        {this.props.dominios.sort((a, b) => a.tipo_dominio_id - b.tipo_dominio_id).map((dominio,i) =>
                            <Panel key = {i} titulo={'Dominio ' + dominio.tipo_dominio.nombre + ': ' +  (dominio.nombre || 'Sin Nombre')}>
                                <Show
                                    i = {i}
                                    dominio = {dominio}
                                    handleAddElement = {this.props.handleAddElement}
                                    borrarElemento={this.props.borrarElemento}
                                    handleInputArrays = {this.props.handleInputArrays}
                                    />
                            </Panel>
                        )}
                    </React.Fragment>
                    <legend>Competencias Genericas</legend>
                    <React.Fragment>
                        <Panel titulo={'Dominio Generico: '}>
                            <Show
                                competencias_genericas = {this.props.competencias_genericas}
                            />  
                        </Panel>
                    </React.Fragment>
                </div>
                {/* <div className="col-12">
                    <legend>Competencias</legend>
                    <React.Fragment>
                        {this.props.dominios.sort((a, b) => a.tipo_dominio_id - b.tipo_dominio_id).map((dominio,i) =>
                            <Panel key = {i} titulo={'Dominio ' + dominio.tipo_dominio.nombre + ': ' +  (dominio.nombre || 'Sin Nombre')}>
                                <Show
                                    i = {i}
                                    dominio = {dominio}
                                    handleAddElement = {this.props.handleAddElement}
                                    borrarElemento={this.props.borrarElemento}
                                    handleInputArrays = {this.props.handleInputArrays}
                                    />
                            </Panel>
                        )}
                    </React.Fragment>
                </div> */}
            </div>
        );
    }
}