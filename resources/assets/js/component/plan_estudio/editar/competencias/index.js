import React, { Component } from 'react'
import Show from './show';

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }


    render() {
        return (
            <div className="container py-4">
                <div className="border p-3 mb-3">
                    <div className="col ui-sortable-disabled">
                        <legend>Competencias</legend>
                        <React.Fragment>
                            {this.props.dominios.sort((a, b) => a.tipo_dominio_id - b.tipo_dominio_id).map((dominio, i) =>
                                <Show
                                    key={i}
                                    i={i}
                                    dominio={dominio}
                                    handleAddElement={this.props.handleAddElement}
                                    borrarElemento={this.props.borrarElemento}
                                    handleInputArrays={this.props.handleInputArrays}
                                    habilitarGeneral={this.props.habilitarGeneral}
                                    habilitadogeneral={this.props.habilitadogeneral}
                                    addNotification={this.props.addNotification}
                                />
                            )}
                        </React.Fragment>
                    </div>
                </div>
                <div className="border p-3 mb-3">
                    <div className="col ui-sortable-disabled">
                        <legend>Competencias Genericas</legend>
                        <Show
                            competencias_genericas={this.props.competencias_genericas}
                            comp_genericas={this.props.comp_genericas}
                            id={this.props.id}
                            habilitadogeneral={this.props.habilitadogeneral}
                        />
                    </div>
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