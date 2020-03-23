import React, { Component } from 'react'
import Panel from '../../../utiles/Panel'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default class showcompetencias extends Component {
    constructor (props) {
        super(props)

        this.irAsignatura = this.irAsignatura.bind(this);
        this.notificationDOMRef = React.createRef();

    }

    irAsignatura(asignatura)
    {
        document.querySelector('a[href="#plan-tab-4"]').click();
        document.querySelector('a[href="#nivel-tab-1"]').click();

        // if(asignatura.nivel)
        // nivel tab show 
        // o nivel tab x
        // setTimeout(() => {
        //     document.getElementById('panel-' + solicitud).scrollIntoView();
        // }, 500);
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
                <Panel key = {'competencia-' + this.props.competencia.id} titulo={this.props.competencia.descripcion} border={true} collapse={true} expand={true}>
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
                        <div className="my-2" key={i}>
                            <p className="my-2">
                            Descripción del Nivel {nivel_competencia.nivel}:</p>
                            <p className="px-2 py-2 border">
                                {nivel_competencia.descripcion}
                            </p>
                            <div className="col-12 row mt-2">
                                <div className="col-6">
                                    <strong>Logros de Aprendizaje</strong>
                                    {nivel_competencia.logro_aprendizajes.length > 0 ?
                                    <ol>
                                        {nivel_competencia.logro_aprendizajes.map((logro_aprendizaje,j) =>
                                            <li key={j}>{logro_aprendizaje.descripcion}</li>
                                        )}
                                    </ol>
                                    :
                                    <p>No Posee</p>
                                    }
                                </div>
                                <div className="col-6">
                                    <strong>Asignaturas</strong>
                                    {nivel_competencia.nivel_competencia_asignaturas.length > 0 ?
                                    <ol>
                                        {nivel_competencia.nivel_competencia_asignaturas.map((nivel_competencia_asignatura,j) =>
                                            <li key={j}>
                                                {nivel_competencia_asignatura.asignatura.nombre}
                                                {/* <a className="m-l-5"
                                                    href=""
                                                    // onClick={() => this.irAsignatura(nivel_competencia_asignatura.asignatura)}
                                                    target="_blank">
                                                    <span className="badge badge-info">Ver</span>
                                                </a> */}
                                            </li>
                                        )}
                                    </ol>
                                    :
                                    <p>No Posee</p>
                                    }
                                </div>   
                            </div>
                        </div>
                        )
                    :
                    <p>No posee ningun nivel de competencia</p>
                }
                </Panel>
                
            :
                <Panel key = {'competencia-generica-' + this.props.competencia_generica.id} titulo={this.props.competencia_generica.sigla + ": " + this.props.competencia_generica.descripcion} border={true} collapse={true} expand={true}>
                {
                    this.props.competencia_generica.nivel_competencias.map((nivel_competencia_generica,i) =>
                        <div className="my-2" key={i}>
                            <p className="m-0">Descripción del Nivel {nivel_competencia_generica.nivel}:</p>
                            <p className="px-2 py-2 border">
                                {nivel_competencia_generica.descripcion}
                            </p>
                            <div className="col-12 row">
                                <div className="col-6">
                                    <strong>Logros de Aprendizaje</strong>
                                    {nivel_competencia_generica.logro_aprendizajes.length > 0 ?
                                    <ol>
                                        {nivel_competencia_generica.logro_aprendizajes.map((logro_aprendizaje,j) =>
                                            <li key={j}>{logro_aprendizaje.descripcion}</li>
                                        )}
                                    </ol>
                                    :
                                    <p>No Posee</p>
                                    }
                                </div>
                                <div className="col-6">
                                    <strong>Asignaturas</strong>
                                        {this.props.asignaturas.some(asignatura =>
                                        asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura =>
                                            nivel_generica_asignatura.nivel_generica.nivel_competencia_id == 
                                            nivel_competencia_generica.id
                                        )
                                    ) ?
                                    <ol>
                                        {
                                            this.props.asignaturas.filter(asignatura =>
                                                asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura =>
                                                    nivel_generica_asignatura.nivel_generica.nivel_competencia_id == 
                                                    nivel_competencia_generica.id
                                                )
                                            ).map((asignatura, i) =>
                                                <li key={i}>
                                                    {asignatura.nombre}
                                                    <a className="m-l-5" href="" target="_blank">
                                                        <span className="badge badge-info">Ver</span>
                                                    </a>
                                                </li>
                                            )
                                        }
                                            
                                    </ol>
                                    :
                                    <p>No Posee</p>
                                    }
                                </div>  
                            </div>
                        </div>
                    )
                }
                </Panel>
        );
    }
}