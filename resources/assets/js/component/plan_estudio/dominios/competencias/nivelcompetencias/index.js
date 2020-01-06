import React, { Component } from 'react'
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
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <ul className={"nav nav-tabs " + (!this.props.habilitadogeneral ? "deshabilitado" : "")}>
                            {
                                this.props.dominios.map((dominio, i) =>
                                    i == 0 ? 
                                    <li className="nav-items" key={i}>
                                        <a href="#dominio-tab-show" data-toggle="tab" className="nav-link active">
                                            <span className="d-sm-none">{dominio.nombre}</span>
                                            <span className="d-sm-block d-none">{dominio.nombre}</span>
                                        </a>
                                    </li>
                                    :
                                    <li className="nav-items" key={i}>
                                        <a href={"#dominio-tab-"+i} data-toggle="tab" className="nav-link">
                                            <span className="d-sm-none">{dominio.nombre}</span>
                                            <span className="d-sm-block d-none">{dominio.nombre}</span>
                                        </a>
                                    </li>
                                    )
                                /* <li className="nav-items">
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
                                </li> */   
                            }
                                <li className="nav-items">
                                    <a href="#dominio-transversal-tab" data-toggle="tab" className="nav-link">
                                        <span className="d-sm-none">Transversal</span>
                                        <span className="d-sm-block d-none">Transversal</span>
                                    </a>
                                </li>
                        </ul>
                        <div className="tab-content">
                            {
                                this.props.dominios.map((dominio, i) =>
                                    i == 0 ?
                                    <div className="tab-pane fade active show" id="dominio-tab-show" key={i}>
                                        {
                                        <Show
                                        dominio={dominio}
                                        asignaturas={this.props.asignaturas}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleAddElement = {this.props.handleAddElement}
                                        borrarElemento={this.props.borrarElemento}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}                                      />
                                        }
                                    </div>
                                    :
                                    <div className="tab-pane fade" id={"dominio-tab-"+i} key={i}>
                                        <Show
                                        dominio={dominio}
                                        asignaturas={this.props.asignaturas}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleAddElement = {this.props.handleAddElement}
                                        borrarElemento={this.props.borrarElemento}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}
                                        />
                                    </div>
                                    )
                            }
                                    <div className="tab-pane fade" id={"dominio-transversal-tab"}>
                                        <Show
                                        competencias_genericas={this.props.competencias_genericas}
                                        asignaturas={this.props.asignaturas}
                                        handleInputArrays = {this.props.handleInputArrays}
                                        handleAddElement = {this.props.handleAddElement}
                                        borrarElemento={this.props.borrarElemento}
                                        habilitarGeneral = {this.props.habilitarGeneral}
                                        habilitadogeneral = {this.props.habilitadogeneral}
                                        addNotification = {this.props.addNotification}
                                        />
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