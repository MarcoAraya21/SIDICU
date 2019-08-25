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
                        {this.props.dominios.map((dominio,i) =>
                            <Panel key = {i} titulo={dominio.nombre || 'Sin Nombre'}>
                                <Show
                                    i = {i}
                                    dominio = {dominio}/>
                            </Panel>
                        )}
                    </React.Fragment>
                </div>  
            </div>
        );
    }
}