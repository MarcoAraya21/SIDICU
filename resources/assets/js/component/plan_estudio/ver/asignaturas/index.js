import React, { Component } from 'react'
import Show from './show'

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
                        <ul className="nav nav-tabs">
                            {
                                this.props.niveles.map((nivel, i) =>
                                    i == 0 ? 
                                    <li className="nav-items" key={i}>
                                        <a href="#nivel-tab-show" data-toggle="tab" className="nav-link active">
                                            <span className="d-sm-none">{"Nivel " + nivel.nombre}</span>
                                            <span className="d-sm-block d-none">{"Nivel " + nivel.nombre}</span>
                                        </a>
                                    </li>
                                    :
                                    <li className="nav-items" key={i}>
                                        <a href={"#nivel-tab-"+i} data-toggle="tab" className="nav-link">
                                            <span className="d-sm-none">{"Nivel " + nivel.nombre}</span>
                                            <span className="d-sm-block d-none">{"Nivel " + nivel.nombre}</span>
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                        <div className="tab-content">
                            {
                                this.props.niveles.map((nivelAsignatura, i) =>
                                    i == 0 ?
                                    <div className="tab-pane fade active show" id="nivel-tab-show" key={i}>
                                        {
                                        <Show
                                        nivelAsignatura={nivelAsignatura}
                                        niveles={this.props.niveles}
                                        asignaturas={this.props.asignaturas}                                     />
                                        }
                                    </div>
                                    :
                                    <div className="tab-pane fade" id={"nivel-tab-"+i} key={i}>
                                        <Show
                                        nivelAsignatura={nivelAsignatura}
                                        niveles={this.props.niveles}
                                        asignaturas={this.props.asignaturas}
                                        />
                                    </div>
                                )
                            }
                        </div>			
                    </div>
               </div> 
            </div>
        );
    }
}