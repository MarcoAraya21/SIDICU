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
            var mensaje = verbos.aplicar.join(",\n");
        }
        if(nivel == 4)
        {
            var mensaje = verbos.analizar.join(",\n");
        }
        if(nivel == 5)
        {
            var mensaje = verbos.evaluar.join(",\n");
        }
        if(nivel == 6)
        {
            var mensaje = verbos.crear.join(",\n");
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
            ],
            aplicar: [
                "Aplicar",
                "Bosquejar",
                "Calcular",
                "Catalogar",
                "Clasificar",
                "Completar",
                "Delinear",
                "Demostrar",
                "Desarrollar",
                "Descubrir",
                "Diseñar",
                "Dramatizar",
                "Ejemplificar",
                "Emplear",
                "Examinar",
                "Modificar",
                "Modular",
                "Operar",
                "Organizar",
                "Practicar",
                "Predecir",
                "Preparar",
                "Programar",
                "Resolver",
                "Transferir",
                "Usar",
                "Utilizar"
            ],
            analizar: [
                "Agrupar",
                "Analizar",
                "Calcular",
                "Categorizar",
                "Clasificar",
                "Comparar",
                "Contrastar",
                "Criticar",
                "Debatir",
                "Deducir",
                "Detectar",
                "Diferenciar",
                "Discriminar",
                "Distinguir",
                "Esquematizar",
                "Examinar",
                "Experimentar",
                "Explicar",
                "Identificar",
                "Ilustrar",
                "Inferir",
                "Inspeccionar",
                "Investigar",
                "Ordenar",
                "Plantear",
                "Ponderar",
                "Preguntar",
                "Probar",
                "Reconocer",
                "Relatar",
                "Seleccionar",
                "Separar",
                "Solucionar",
                "Tasar"
            ],
            evaluar: [
                "Acumular",
                "Argumentar",
                "Evidenciar",
                "Calibrar",
                "Categorizar",
                "Comparar",
                "Concluir",
                "Considerar",
                "Contrastar",
                "Criticar",
                "Decidir",
                "Diagnosticar",
                "Discriminar",
                "Enjuiciar",
                "Escoger",
                "Estimar",
                "Evaluar",
                "Hipotetizar",
                "Justificar",
                "Juzgar",
                "Medir",
                "Probar",
                "Predecir",
                "Recomendar",
                "Revisar",
                "Valorar",
                "Verificar"
            ],
            crear: [
                "Arreglar",
                "Combinar",
                "Componer",
                "Construir",
                "Crear",
                "Desarrollar",
                "Diseñar",
                "Escribir",
                "Generar",
                "Generalizar",
                "Idear",
                "Integrar",
                "Investar",
                "Modificar",
                "Organizar",
                "Planificar",
                "Preparar",
                "Producir",
                "Proponer",
                "Rescribir",
                "Reordenar",
                "Sintetizar"
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
                            <button className="dropdown-item" onClick={() => this.addNotificationInfo(verbos, 3)}>Aplicar</button>
                            <button className="dropdown-item" onClick={() => this.addNotificationInfo(verbos, 4)}>Analizar</button>
                            <button className="dropdown-item" onClick={() => this.addNotificationInfo(verbos, 5)}>Evaluar</button>
                            <button className="dropdown-item" onClick={() => this.addNotificationInfo(verbos, 6)}>Crear</button>
                        </div>
                    </div>
                {
                    
                    this.props.competencia.nivel_competencias && this.props.competencia.nivel_competencias.length > 0 ?
                    this.props.competencia.nivel_competencias.map((nivel_competencia,i) =>
                        <Edit key={nivel_competencia.id}
                        nivel_competencia = {nivel_competencia}
                        asignaturas={this.props.asignaturas}
                        i={i}
                        verbos={nivel_competencia.nivel == 1 ? verbos.recordar.concat(verbos.comprender)
                        : nivel_competencia.nivel == 2 ? verbos.aplicar.concat(verbos.analizar)
                        : nivel_competencia.nivel == 3 && verbos.evaluar.concat(verbos.crear)}
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