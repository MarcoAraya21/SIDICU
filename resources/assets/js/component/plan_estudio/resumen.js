import React, { Component } from 'react'
export default class resumen extends Component {
    constructor (props) {
        super(props)
        this.state = {
            mostrar_advertencias: false,
            guardando: false
        }
        

    }

    advertencias_asignatura(asignatura)
    {
        var campos = [['ciclo_id', 0], ['asignatura_horas', 1], ['tipo_asignatura_id', 2], ['departamento_id', 3], ['descripcion', 4], ['ambientes', 5], ['perfil_docente', 6], ['perfil_ayudante', 7], ['nivel_competencia_asignaturas', 8], ['nivel_generica_asignaturas', 9], ['unidades', 10], ['asignatura_evaluaciones', 11], ['asignatura_metodologias', 12], ['bibliografias', 13]];
        var campos_texto = ['Ciclo', 'Horas', 'Tipo', 'Departamento', 'Descripcion', 'Ambientes', 'Perfil Docente', 'Perfil Ayudante', 'Niveles de Competencia', 'Niveles de Competencia Generica', 'Unidades', 'Evaluaciones', 'Metodologías', 'Bibliografías'];
        var texto = '';
        campos.filter(campo => 
            (campo[0] == 'asignatura_horas')
            ?
                (asignatura[campo[0]].reduce((previous, current) => { return Number(previous) + Number(current.cantidad);}, 0) == 0 ||
                asignatura[campo[0]].reduce((previous, current) => { return Number(previous) + Number(current.cantidad);}, 0) == null)
            :
                ((campo[0] == 'nivel_competencia_asignaturas' || campo[0] == 'nivel_generica_asignaturas' || campo[0] == 'unidades' || campo[0] == 'asignatura_evaluaciones' || campo[0] == 'asignatura_metodologias' || campo[0] == 'bibliografias')
                ?
                    (asignatura[campo[0]].length == 0)
                :
                    (asignatura[campo[0]] == '' || asignatura[campo[0]] == null)
                )
        ).map((campo, i) =>
            (i == 0)
            ?
                (texto = texto + campos_texto[campo[1]])
            :
                (texto = texto + ', ' + campos_texto[campo[1]])
        )
        return texto + " ";
    }


    finalizar()
    {
        this.setState({guardando: true})
        fetch('/api/finalizar/' + this.props.params, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                if(response.redirected)
                {
                    window.location.href = "/";
                }
                throw "Error en la llamada Ajax";
            }
        })
        .then((data) => {
            if(data)
            {
                window.location.replace("/MisPlanes")
            }
            else
            {
                [this.setState({guardando: false}),
                    this.props.addNotificationAlert('No se ha podido guardar.')
                ]
            }
        })
        .catch(() => {[this.setState({guardando: false}),
            this.props.addNotificationAlert('No se ha podido guardar.')
        ]});
    }
    render() {
        var advertencias = false;
        return (
            <div className="container py-4">
                <div className="col-12">
                    <legend>Resumen del Plan de Estudios</legend>
                    <ul>
                        <li>
                            N° de Dominios: 
                            {this.props.dominios.length}
                        </li>
                        <li>N° de Competencias: 
                            {this.props.dominios.reduce((previous, current) => {
                                return previous + current.competencias.length;
                                }, 0)}
                        </li>
                        <li>N° de Logros de Aprendizaje:
                            {this.props.dominios.reduce((previous, current) => {
                                return previous + current.competencias.reduce((previous, current) => {
                                    return previous + current.nivel_competencias.reduce((previous, current) => {
                                        return previous + current.logro_aprendizajes.length;
                                        }, 0);
                                    }, 0);
                                }, 0)}
                        </li>
                        <li>N° de Competencias Genericas:
                            {this.props.competencias_genericas.length}
                        </li>
                        <li>N° de Asignaturas:
                            {this.props.asignaturas.length}
                        </li>
                        <li>N° de SCT:
                        {
                            this.props.asignaturas.reduce((previous, current) => {
                                return previous + current.asignatura_horas.reduce((previous, current) => {
                                    return previous + (current.cantidad/2);
                                    }, 0);
                                }, 0)
                        }
    
                        </li>
                    </ul>
                    <br />
                    <legend>Advertencias</legend>
                    {
                        this.state.mostrar_advertencias &&
                        <div id="accordion" className="card-accordion">
                        {
                            (this.props.proposito == "" || this.props.proposito == null
                            || this.props.objetivo == "" || this.props.objetivo == null
                            || this.props.requisito_admision == "" || this.props.requisito_admision == null
                            || this.props.mecanismo_retencion == "" || this.props.mecanismo_retencion == null
                            || this.props.requisito_obtencion == "" || this.props.requisito_obtencion == null
                            || this.props.campo_desarrollo == "" || this.props.campo_desarrollo == null
                            || this.props.perfil_egresado == "" || this.props.perfil_egresado == null
                            || this.props.perfil_licenciado == "" || this.props.perfil_licenciado == null)
                            &&
                            (advertencias = true,
                            <div className="card">
                                <div className="card-header bg-danger text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#datos">
                                    Otros Datos
                                </div>
                                <div id="datos" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        Debe llenar lo siguiente:
                                        <ul>
                                        {(this.props.proposito == "" || this.props.proposito == null) && <li>Propósito</li>}
                                        {(this.props.objetivo == "" || this.props.objetivo == null) && <li>Objetivo</li>}
                                        {(this.props.requisito_admision == "" || this.props.requisito_admision == null) && <li>Requisito de Admisión</li>}
                                        {(this.props.mecanismo_retencion == "" || this.props.mecanismo_retencion == null) && <li>Mecanismo de Retención</li>}
                                        {(this.props.requisito_obtencion == "" || this.props.requisito_obtencion == null) && <li>Requisito de Obtención de Título</li>}
                                        {(this.props.campo_desarrollo == "" || this.props.campo_desarrollo == null) && <li>Campo de Desarrollo Profesional </li>}
                                        {(this.props.perfil_egresado == "" || this.props.perfil_egresado == null) && <li>Perfil del Egresado</li>}                            
                                        {(this.props.perfil_licenciado == "" || this.props.perfil_licenciado == null) && <li>Perfil del Licenciado</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>)
                        }
                        {
                            (this.props.redaccion == "" || this.props.redaccion == null)
                            &&
                            (advertencias = true,
                            <div className="card">
                                <div className="card-header bg-danger text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#redaccion">
                                    Redacción del Plan
                                </div>
                                <div id="redaccion" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        Debe llenar lo siguiente:
                                        <ul>
                                            {(this.props.redaccion == "" || this.props.redaccion == null) && <li>Texto de la Redacción</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>)
                        }
                        {
                            (this.props.dominios.some( dominio => dominio.descripcion == "" || dominio.descripcion == null || dominio.competencias.length == 0)) &&
                            (advertencias = true,
                            <div className="card">
                                <div className="card-header bg-danger text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#dominios">
                                    Dominios
                                </div>
                                <div id="dominios" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                    Debe llenar lo siguiente:
                                    <ul>
                                    {
                                        this.props.dominios.filter( dominio => 
                                            (dominio.descripcion == "" || dominio.descripcion == null || dominio.competencias.length == 0)
                                        ).map( dominio => 
                                            <li key={dominio.id}>
                                            {
                                                (
                                                    (dominio.descripcion == "" || dominio.descripcion == null) ?
                                                    (
                                                        'Descripción' + 
                                                        (
                                                            (dominio.competencias.length == 0) ? ', Competencias' : ''
                                                        )
                                                    ) 
                                                    :
                                                    (
                                                        (dominio.competencias.length == 0) ? 'Competencias' : ''
                                                    )
                                                )
                                                + ' '
                                            }
                                            del dominio <b>"{dominio.nombre}"</b>
                                            </li>
                                        )
                                    }
                                    </ul>
                                    </div>
                                </div>
                            </div>)
                        }
                        {
                            (this.props.dominios.some( dominio => dominio.competencias.some( competencia => 
                                (competencia.descripcion == "" || competencia.descripcion == null || 
                                competencia.funcion_clave == "" || competencia.funcion_clave == null)
                            ))) &&
                            (advertencias = true,
                            <div className="card">
                                <div className="card-header bg-danger text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#competencias">
                                    Competencias
                                </div>
                                <div id="competencias" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                    Debe llenar lo siguiente:
                                    <ul>
                                    {
                                        this.props.dominios.filter( dominio => dominio.competencias.some( competencia => 
                                            (competencia.descripcion == "" || competencia.descripcion == null || 
                                            competencia.funcion_clave == "" || competencia.funcion_clave == null)
                                        )).map( dominio => 
                                        dominio.competencias.filter( competencia => 
                                            (competencia.descripcion == "" || competencia.descripcion == null || 
                                            competencia.funcion_clave == "" || competencia.funcion_clave == null)
                                        ).map( competencia => 
                                            <li key={competencia.id}>
                                            {
                                                (
                                                    (competencia.descripcion == "" || competencia.descripcion == null) ?
                                                    (
                                                        'Descripción' + 
                                                        (
                                                            (competencia.funcion_clave == "" || competencia.funcion_clave == null) ? ', Función Clave' : ''
                                                        )
                                                    ) 
                                                    :
                                                    (
                                                        (competencia.funcion_clave == "" || competencia.funcion_clave == null) ? 'Función Clave' : ''
                                                    )
                                                )
                                                + ' '
                                            }
                                            de la competencia <b>"{competencia.descripcion}"</b> del dominio <b>"{dominio.nombre}"</b>
                                            </li>
                                        )
                                        )
                                    }
                                    </ul>
                                    </div>
                                </div>
                            </div>)
                        }
                        {
                            (this.props.dominios.some( dominio => dominio.competencias.some( competencia => 
                                (competencia.descripcion == "" || competencia.descripcion == null || 
                                competencia.funcion_clave == "" || competencia.funcion_clave == null || 
                                competencia.nivel_competencias.length == 0)
                            ))) &&
                            (advertencias = true,
                            <div className="card">
                                <div className="card-header bg-danger text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#nivelCompetencias">
                                    Niveles de Competencias
                                </div>
                                <div id="nivelCompetencias" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                    Debe llenar lo siguiente:
                                    <ul>
                                    {
                                        this.props.dominios.filter( dominio => dominio.competencias.some( competencia => 
                                            competencia.nivel_competencias.some( nivel_competencias => 
                                                (nivel_competencias.descripcion == "" || nivel_competencias.descripcion == null || 
                                                nivel_competencias.logro_aprendizajes.length == 0 || 
                                                nivel_competencias.nivel_competencia_asignaturas.length == 0)
                                            )
                                        )).map( dominio => 
                                        dominio.competencias.filter( competencia => 
                                            competencia.nivel_competencias.some( nivel_competencias => 
                                                (nivel_competencias.descripcion == "" || nivel_competencias.descripcion == null || 
                                                nivel_competencias.logro_aprendizajes.length == 0 || 
                                                nivel_competencias.nivel_competencia_asignaturas.length == 0)
                                            )
                                        ).map( competencia => 
                                            competencia.nivel_competencias.filter( nivel_competencias => 
                                                (nivel_competencias.descripcion == "" || nivel_competencias.descripcion == null || 
                                                nivel_competencias.logro_aprendizajes.length == 0 || 
                                                nivel_competencias.nivel_competencia_asignaturas.length == 0)
                                            ).map( nivel_competencia => 
                                                <li key={nivel_competencia.id}>
                                                {
                                                    (
                                                        (nivel_competencia.descripcion == "" || nivel_competencia.descripcion == null) ?
                                                        (
                                                            'Descripción' + 
                                                            (
                                                                (nivel_competencia.logro_aprendizajes.length == 0) ?
                                                                    ', Logros de Aprendizaje' + 
                                                                    (
                                                                        (nivel_competencia.nivel_competencia_asignaturas.length == 0) ? ', Asignaturas' : ''
                                                                    )
                                                                :
                                                                    (
                                                                        (nivel_competencia.nivel_competencia_asignaturas.length == 0) ? ', Asignaturas' : ''
                                                                    )
                                                            )
                                                        ) 
                                                        :
                                                        (
                                                            (nivel_competencia.logro_aprendizajes.length == 0) ?
                                                                'Logros de Aprendizaje' + 
                                                                (
                                                                    (nivel_competencia.nivel_competencia_asignaturas.length == 0) ? ', Asignaturas' : ''
                                                                )
                                                            :
                                                                (
                                                                    (nivel_competencia.nivel_competencia_asignaturas.length == 0) ? 'Asignaturas' : ''
                                                                )
                                                        )
                                                    )
                                                    + ' '
                                                }
                                                del <b>"Nivel {nivel_competencia.nivel}"</b> de la competencia <b>"{competencia.descripcion}"</b> del dominio <b>"{dominio.nombre}"</b>
                                                </li>
                                            )
                                        )
                                        )
                                    }
                                    </ul>
                                    </div>
                                </div>
                            </div>)
                        }
                        {
                            (this.props.asignaturas.some( asignatura => 
                                asignatura.ciclo_id == "" || asignatura.ciclo_id == null ||
                                asignatura.asignatura_horas.reduce((previous, current) => { return Number(previous) + Number(current.cantidad);}, 0) == 0 ||
                                asignatura.asignatura_horas.reduce((previous, current) => { return Number(previous) + Number(current.cantidad);}, 0) == null ||
                                asignatura.tipo_asignatura_id == "" || asignatura.tipo_asignatura_id == null ||
                                asignatura.departamento_id == "" || asignatura.departamento_id == null ||
                                asignatura.descripcion == "" || asignatura.descripcion == null ||
                                asignatura.ambientes == "" || asignatura.ambientes == null ||
                                asignatura.perfil_docente == "" || asignatura.perfil_docente == null ||
                                asignatura.perfil_ayudante == "" || asignatura.perfil_ayudante == null ||
                                asignatura.nivel_competencia_asignaturas.length == 0 ||
                                asignatura.nivel_generica_asignaturas.length == 0 ||
                                asignatura.unidades.length == 0 ||
                                asignatura.asignatura_evaluaciones.length == 0 ||
                                asignatura.asignatura_metodologias.length == 0 ||
                                asignatura.bibliografias.length == 0 
                            )) &&
                            (advertencias = true,
                            <div className="card">
                                <div className="card-header bg-danger text-white pointer-cursor collapsed" data-toggle="collapse" data-target="#asignaturas">
                                    Asignaturas
                                </div>
                                <div id="asignaturas" className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                    Debe llenar lo siguiente:
                                    <ul>
                                    {
                                        this.props.asignaturas.filter( asignatura => 
                                            (asignatura.ciclo_id == "" || asignatura.ciclo_id == null ||
                                            asignatura.asignatura_horas.reduce((previous, current) => { return Number(previous) + Number(current.cantidad);}, 0) == 0 ||
                                            asignatura.asignatura_horas.reduce((previous, current) => { return Number(previous) + Number(current.cantidad);}, 0) == null ||
                                            asignatura.tipo_asignatura_id == "" || asignatura.tipo_asignatura_id == null ||
                                            asignatura.departamento_id == "" || asignatura.departamento_id == null ||
                                            asignatura.descripcion == "" || asignatura.descripcion == null ||
                                            asignatura.ambientes == "" || asignatura.ambientes == null ||
                                            asignatura.perfil_docente == "" || asignatura.perfil_docente == null ||
                                            asignatura.perfil_ayudante == "" || asignatura.perfil_ayudante == null ||
                                            asignatura.nivel_competencia_asignaturas.length == 0 ||
                                            asignatura.nivel_generica_asignaturas.length == 0 ||
                                            asignatura.unidades.length == 0 ||
                                            asignatura.asignatura_evaluaciones.length == 0 ||
                                            asignatura.asignatura_metodologias.length == 0 ||
                                            asignatura.bibliografias.length == 0 )
                                        ).map( asignatura => 
                                            <li key={asignatura.id}>
                                            {
                                                this.advertencias_asignatura(asignatura)
                                            }
                                            de la asignatura <b>"{asignatura.nombre}"</b>
                                            </li>
                                        )
                                    }
                                    </ul>
                                    </div>
                                </div>
                            </div>)
                        }
                        </div>
                    }
                    <button type="button" className="btn btn-danger" onClick={() => this.setState({mostrar_advertencias: !this.state.mostrar_advertencias})}>
                        <i className={"fas fa-"+ (this.state.mostrar_advertencias ? "eye-slash" : "eye") + " p-r-10"} ></i>{this.state.mostrar_advertencias ? "Ocultar " : "Mostrar "}Advertencias
                    </button>
                    {
                        this.props.acceso == 1 &&
                        <div className="text-right border-top mt-3 pt-3">
                            <button type="button" className="btn btn-success" disabled={!this.state.mostrar_advertencias}
                                onClick={()=>{ if(advertencias)
                                    {
                                        if(window.confirm('Tiene advertencias ¿Estas Seguro de querer finalizar?'))
                                        this.finalizar()
                                    }
                                    else{
                                        if(window.confirm('¿Estas Seguro de querer finalizar?'))
                                        this.finalizar()
                                    }
                                }}>
                                <i className="fas fa-check p-r-10" ></i>Finalizar
                            </button>
                        </div>
                    }
                </div>  
            </div>
        );
    }
}