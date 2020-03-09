import React, { Component } from 'react'
import ShowCompetencias from './showcompetencias';



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
                                        <div className="border p-3 mb-3">
                                            <div className="col ui-sortable-disabled">
                                                <legend>Competencias</legend>
                                                {
                                                    dominio &&  dominio.competencias &&
                                                    dominio.competencias.length > 0 ?
                                                       dominio.competencias.map((competencia,i) =>
                                                           <ShowCompetencias
                                                               key={i}
                                                               competencia={competencia}
                                                               asignaturas={this.props.asignaturas}
                                                           />
                                                        )
                                                    :
                                                        'No Posee Competencias en este dominio'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="tab-pane fade" id={"dominio-tab-"+i} key={i}>
                                        <div className="border p-3 mb-3">
                                            <div className="col ui-sortable-disabled">
                                                <legend>Competencias</legend>
                                                {
                                                    dominio &&  dominio.competencias &&
                                                    dominio.competencias.length > 0 ?
                                                       dominio.competencias.map((competencia,i) =>
                                                           <ShowCompetencias
                                                               key={i}
                                                               competencia={competencia}
                                                               asignaturas={this.props.asignaturas}
                                                           />
                                                        )
                                                    :
                                                        'No Posee Competencias en este dominio'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                                    <div className="tab-pane fade" id={"dominio-transversal-tab"}>
                                        <div className="border p-3 mb-3">
                                            <div className="col ui-sortable-disabled">
                                                <legend>Competencias {this.props.competencias_genericas && 'Genericas'}</legend>
                                                {
                                                    this.props.competencias_genericas.map((competencia_generica,i) =>
                                                        <ShowCompetencias
                                                            key={i}
                                                            competencia_generica={competencia_generica}
                                                            asignaturas={this.props.asignaturas}
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                        </div>			
                    </div>
               </div> 
            </div>
        );
    }
}