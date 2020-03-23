import React, { Component } from 'react'

export default class show extends Component {
    constructor (props) {
        super(props)
       
    }

   
    render() {
        return (
            <div className="container py-4">
                <div className="col-12">
                    <legend>Datos Iniciales del Plan</legend>
                    <div className="col row">
                        <p className="col-6"><b>Nombre</b></p>
                        <p className="col-6">{this.props.nombre}</p>
                    </div>
                    <div className="col row">
                        <p className="col-6"><b>Observación</b></p>
                        <p className="col-6">{this.props.observacion}</p>
                    </div>
                    <div className="col row">
                        <div className="col-4">
                            <p className="mb-1"><b>Carrera</b></p>
                            <p>{this.props.carrera && this.props.carrera.nombre}</p> 
                        </div>
                        <div className="col-4">
                            <p className="mb-1"><b>Tipo de Plan</b></p>
                            <p>{this.props.tipo_plan && this.props.tipo_plan.nombre}</p> 
                        </div>
                        <div className="col-4">
                            <p className="mb-1"><b>Tipo de Ingreso</b></p>
                            <p>{this.props.tipo_ingreso && this.props.tipo_ingreso.nombre}</p> 
                        </div>
                    </div>
                    <div className="col row">
                        <div className="col-6">
                            <p className="mb-1"><b>Encargado UIC</b></p>
                            <p>{this.props.asesor_uic && this.props.asesor_uic.nombre} {this.props.asesor_uic && this.props.asesor_uic.apellido_paterno} {this.props.asesor_uic && this.props.asesor_uic.apellido_materno}</p>
                        </div>
                        <div className="col-6">
                            <p className="mb-1"><b>Coordinador del Cómite</b></p>
                            <p>{this.props.coordinador && this.props.coordinador.nombre} {this.props.coordinador && this.props.coordinador.apellido_paterno} {this.props.coordinador && this.props.coordinador.apellido_materno}</p>
                        </div>
                    </div>
                    <legend>Otros Datos</legend>
                    <div className="form-group">
                        <label>Proposito</label>
                        <p className="px-2 py-2 border">
                            {this.props.proposito || ''}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Objetivo</label>
                        <p className="px-2 py-2 border">
                            {this.props.objetivo || ''}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Requisito de Admisión</label>
                        <p className="px-2 py-2 border">
                            {this.props.requisito_admisin || ''}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Mecanismo de Retención</label>
                        <p className="px-2 py-2 border">
                            {this.props.mecanismo_retencon || ''}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Requisito de Obtención</label>
                        <p className="px-2 py-2 border">
                            {this.props.requisito_obtencon || ''}
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Campo de Desarrollo</label>
                        <p className="px-2 py-2 border">
                            {this.props.campo_desarrollo|| ''}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}