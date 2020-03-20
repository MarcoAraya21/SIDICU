import React, { Component } from 'react'
import Edit from './edit';
import Panel from '../../../utiles/Panel'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default class showcompetencias extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editandocompetencias: false
        }

        this.habilitareditcompetencias = this.habilitareditcompetencias.bind(this);
        this.notificationDOMRef = React.createRef();

    }


    addNotificationInfo(verbos, nivel) {
        if(nivel == 1)
        {
            var mensaje = verbos.recordar.join(",\n");
        }
        if(nivel == 2)
        {
            var mensaje = verbos.comprender.join(",\n");
        }
        if(nivel == 3)
        {
            
        }
        if(nivel == 4)
        {
            
        }
        if(nivel == 5)
        {
            
        }
        if(nivel == 6)
        {
            
        }
        this.notificationDOMRef.current.addNotification({ 
        title: "Utilice uno de los siguientes verbos",
        message: mensaje,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "zoomIn"],
        animationOut: ["animated", "zoomOut"],
        dismiss: {
            duration: 20000,
          },
        dismissable: { click: true }
        });
    }

    habilitareditcompetencias(estado){
        this.setState({editandocompetencias: estado});
    }

    addElemento(variable){
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
            ,
            body: JSON.stringify(
                {competencia_id:  this.props.competencia.id}
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         
         })
         .then( data => this.props.handleAddElement(variable, data));
         
        
    }
    
    render() {
        let verbos = {
            recordar: [
                "Anotar",
                "Archivar",
                "Bosquejar",
                "Citar",
                "Contar",
                "Deducir",
                "Definir",
                "Distinguir",
                "Enumerar",
                "Escribir",
                "Especificar",
                "Identificar",
                "Indicar",
                "Leer",
                "Listar",
                "Memorizar",
                "Mencionar",
                "Nombrar",
                "Recordar",
                "Recitar",
                "Reconocer",
                "Registrar",
                "Relatar",
                "Repetir",
                "Seleccionar",
                "Señalar",
                "Subrayar"
            ],
            comprender: [
                "Asociar",
                "Cambiar",
                "Concluir",
                "Comparar",
                "Contrastar",
                "Describir",
                "Determinar",
                "Diferenciar",
                "Discutir",
                "Distinguir",
                "Explicar",
                "Expresar",
                "Formular",
                "Identificar",
                "Ilustrar",
                "Informar",
                "Interpretar",
                "Localizar",
                "Manifestar",
                "Notificar",
                "Opinar",
                "Predecir",
                "Preparar",
                "Referir",
                "Relacionar",
                "Relatar",
                "Resumir",
                "Revelar",
                "Revisar",
                "Traducir"
            ]
        };
        return (
            !this.props.competencia_generica
            ?
                <Panel key = {'competencia-' + this.props.competencia.id} titulo={this.props.competencia.descripcion} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandocompetencias)}>
                    <ReactNotification ref={this.notificationDOMRef}/>
                    <div className="dropdown text-right">
                        <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Taxonomía Bloom <i className="fas fa-info-circle"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={() => this.addNotificationInfo(verbos, 1)}>Recordar</button>
                            <button className="dropdown-item" onClick={() => this.addNotificationInfo(verbos, 2)}>Comprender</button>
                        </div>
                    </div>
                {
                    
                    this.props.competencia.nivel_competencias && this.props.competencia.nivel_competencias.length > 0 ?
                    this.props.competencia.nivel_competencias.map((nivel_competencia,i) =>
                        <Edit key={nivel_competencia.id}
                        nivel_competencia = {nivel_competencia}
                        asignaturas={this.props.asignaturas}
                        i={i}
                        handleInputArrays = {this.props.handleInputArrays}
                        borrarElemento = {this.props.borrarElemento}
                        handleAddElement = {this.props.handleAddElement}
                        habilitarGeneral = {this.props.habilitarGeneral}
                        habilitadogeneral = {this.props.habilitadogeneral}
                        habilitareditcompetencias = {this.habilitareditcompetencias}
                        addNotification = {this.props.addNotification}/>
                        )
                    :
                    <p>No posee ningun nivel de competencia</p>
                }
                </Panel>
                
            :
                <Panel key = {'competencia-generica-' + this.props.competencia_generica.id} titulo={this.props.competencia_generica.sigla + ": " + this.props.competencia_generica.descripcion} border={true} collapse={true} expand={true} habilitado={(!this.props.habilitadogeneral && !this.state.editandocompetencias)}>
                {
                    this.props.competencia_generica.nivel_competencias.map((nivel_competencia_generica,i) =>
                        <Edit key={nivel_competencia_generica.id}
                        nivel_competencia_generica = {nivel_competencia_generica}
                        asignaturas={this.props.asignaturas}
                        plan_generica={this.props.plan_genericas.find(plan_generica => 
                            plan_generica.nivel_competencia_id == nivel_competencia_generica.id)}
                        i={i}
                        handleInputArrays = {this.props.handleInputArrays}
                        borrarElemento = {this.props.borrarElemento}
                        handleAddElement = {this.props.handleAddElement}
                        habilitarGeneral = {this.props.habilitarGeneral}
                        habilitadogeneral = {this.props.habilitadogeneral}
                        habilitareditcompetencias = {this.habilitareditcompetencias}
                        addNotification = {this.props.addNotification}/>
                    )
                }
                </Panel>
        );
    }
}