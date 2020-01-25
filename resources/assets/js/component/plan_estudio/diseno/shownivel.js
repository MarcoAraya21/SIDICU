import React, { Component } from 'react'
import Panel from '../../utiles/Panel'

export default class show extends Component {
    constructor (props) {
        super(props)
        this.state = {
            deshabilitado: true,
        }

        this.habilitar = this.habilitar.bind(this);
        // this.habilitareditdominios = this.habilitareditdominios.bind(this);

        
    }


    habilitar() {
        this.setState({ deshabilitado: false });
    }
    // habilitareditdominios(estado){
    //     this.setState({editandodominio: estado});
    // }

    // addElemento(variable){
    //     //e.preventDefault();
    //     fetch(`/api/${variable}/`, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type':'application/json'
    //         }
    //         ,
    //         body: JSON.stringify(
    //             {dominio_id:  this.props.dominio.id}
    //         )
    //     })
    //     .then(function(response) {
    //         if(response.ok) {
    //             return response.json();
    //         } else {
    //             throw "Error en la llamada Ajax";
    //         }
         
    //      })
    //     .then(data => {[this.props.handleAddElement(variable, data),this.props.addNotification()]} )
    //     .catch(function(error) {
    //         console.log('Hubo un problema con la petición Fetch:' + error.message);
    //     })
    // }
    

    
    render() {
        return (
            <Panel key={'Nivel-' + this.props.nivelAsignatura.nombre} titulo={'Nivel ' + this.props.nivelAsignatura.nombre} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandodominio)}>
            {
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ciclo</th>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>SCT-Chile</th>
                                <th>Requisitos</th>
                                <th>Cambiar Nivel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.asignaturas && 
                                this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).length > 0 ?
                                    this.props.asignaturas.filter(asignatura => asignatura.nivel_id == this.props.nivelAsignatura.id).map( (asignatura,i) =>
                                        <tr>
                                            <td>
                                                <select defaultValue={""}
                                                    disabled={this.state.deshabilitado}
                                                    className="form-control "
                                                    onChange={(e) => this.props.handleInputArrays(e, 'asignaturas', 'ciclo_id', this.props.asignatura.id)}>
                                                    <option disabled value="">Seleccione una Opción</option>
                                                    <option value='1'>Ciclo Cientifico Tecnológico</option>
                                                    <option value='2'>Ciclo de Especialización</option>
                                                    <option value='3'>Ciclo de Titulación</option>
                                                    <option value='4'>Programa de Desarrollo Personal y Social</option>
                                                    <option value='5'>Programa de Bienestar Físico y Deportes</option>
                                                    <option value='6'>Programa de Inglés</option>
                                                </select>
                                            </td>
                                            <td>Código</td>
                                            <td>Nombre</td>
                                            <td>
                                                {(aulas.reduce((previous, current) => {
                                                    return Number(previous) + Number(current.cantidad);
                                                }, 0) +
                                                    extra_aulas.cantidad) / 2}
                                            </td>
                                            <td>
                                                <button type="button" disabled={(!this.state.editando && !this.props.habilitadogeneral) || !this.state.deshabilitado} className="btn btn-primary" onClick={() => { this.handleOpenRequisitos() }}>
                                                    <i className="fas fa-plus p-r-5" ></i>Ver Requisitos
                                                </button>
                                            </td>
                                            <td>
                                                <select disabled={requisitosAsignatura.length == 0 || this.state.deshabilitado} defaultValue={""}
                                                    className="form-control "
                                                    onChange={(e) => this.setState({ nivel: {id: Number(e.target.value), nombre: Number(e.target.options[e.target.selectedIndex].text.slice(5)) }})}>
                                                    <option disabled value="">Seleccione una Opción</option>
                                                    {
                                                        requisitosAsignatura.map((requisitoAsignatura, i) =>
                                                            <option key={i} value={requisitoAsignatura.id}>Nivel {requisitoAsignatura.nombre}</option>
                                                        )
                                                    }
                                                </select>
                                            </td> 
                                        </tr>
                                    )
                                :
                                    'No existen asignaturas en este nivel'
                            }
                        </tbody>
                    </table>
                </div>
            }
            {/* <div align="right" className="mt-2 mb-1">
                <button disabled={!this.props.habilitadogeneral} type="button" className="btn btn-primary" onClick={()=>{this.addElemento('competencias')}}>      
                    <i className="fas fa-plus p-r-5" ></i>Crear Competencia
                </button>
            </div>  */}
            </Panel>
        );
    }
}