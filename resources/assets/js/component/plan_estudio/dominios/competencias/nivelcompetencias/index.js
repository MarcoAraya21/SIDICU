import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
// import { handleInput, handleAddElement, handleInputArrays, borrarElemento } from '../utiles/lib'
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
                <ReactNotification ref={this.notificationDOMRef}/>
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <ul className="nav nav-tabs">
                            <li className="nav-items">
                                <a href="#dominio-tab-show" data-toggle="tab" className="nav-link active">
                                    <span className="d-sm-none">{this.props.dominios[0] && this.props.dominios[0].nombre}</span>
                                    <span className="d-sm-block d-none">{this.props.dominios[0] && this.props.dominios[0].nombre}</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#dominio-tab-show" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">{this.props.dominios[1] && this.props.dominios[1].nombre}</span>
                                    <span className="d-sm-block d-none">{this.props.dominios[1] && this.props.dominios[1].nombre}</span>
                                </a>
                            </li>
                            {/* <li className="nav-items">
                                <a href="#dominio-tab-1" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Dominios</span>
                                    <span className="d-sm-block d-none">Dominios del Plan</span>
                                </a>
                            </li>
                            <li className="nav-items">
                                <a href="#dominio-tab-2" data-toggle="tab" className="nav-link">
                                    <span className="d-sm-none">Competencias</span>
                                    <span className="d-sm-block d-none">Competencias del Plan</span>
                                </a>
                            </li> */}
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="dominio-tab-show">
                                {
                                <Show dominio={this.props.dominios[0]}/>
                                }
                            </div>
                            {/* <div className="tab-pane fade" id="dominio-tab-1">
                                <Dominios
                                id={this.state.id}
                                dominios={this.state.dominios}
                                handleInput = {this.handleInput}
                                handleInputArrays = {this.handleInputArrays}
                                borrarElemento = {this.borrarElemento}
                                handleAddElement = {this.handleAddElement}
                                />
                            </div>
                            <div className="tab-pane fade" id="plan-tab-2">
                                <Competencias
                                id={this.state.id}
                                dominios={this.state.dominios}
                                handleInputArrays = {this.handleInputArrays}
                                borrarElemento = {this.borrarElemento}
                                handleAddElement = {this.handleAddElement}
                                />
                            </div>
                            <div className="tab-pane fade" id="dominio-tab-2">
                                <NivelCompetencias
                                dominios={this.state.dominios}
                                />
                            </div> */}
                        </div>			
                    </div>
               </div> 
            </div>

        );
    }
}