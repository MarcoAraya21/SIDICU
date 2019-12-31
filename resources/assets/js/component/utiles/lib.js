// export const SUCCESS_NOTIFICACION = {
//     title: "Guardado",
//     message: "La información ha sido almacenada",
//     type: "info",
//     insert: "top",
//     container: "top-right",
//     animationIn: ["animated", "zoomIn"],
//     animationOut: ["animated", "zoomOut"],
//     dismiss: { duration: 3000 },
//     dismissable: { click: true }
// }

// export const ERROR_NOTIFICACION = {
//     title: "Error",
//     message: "Ha surgido un conflicto en el proceso de almacenamiento",
//     type: "danger",
//     insert: "top",
//     container: "top-right",
//     animationIn: ["animated", "zoomIn"],
//     animationOut: ["animated", "zoomOut"],
//     dismiss: { duration: 3000 },
//     dismissable: { click: true }
// }

//Manipula el estado los inputs, recibe un evento en primer parmatro
// export function handleInput(e, objeto, propiedad) {
//     // console.log( e)
//     var key = ''
//     if(propiedad){
//         key = propiedad
//     }else{
//         key = e.target.getAttribute('name')
//     }
//     if(objeto){
//         var state = Object.assign({}, this.state[objeto]); 
//         state[key] = e.target.value ;
//         this.setState({[objeto]: state });
//     } else{
//         var state = Object.assign({}, this.state); 
//         state[key] = e.target.value;
//         this.setState(state);
//     }

// }

export function handleInput(e, objeto, atributo, id) {
    // let dominio = this.state[objeto].find( dominio => dominio.id = id);
    // dominio[atributo] = e.target.value;
    // this.setState({plan_estudios: {...this.state,
    //                 dominios: {...this.state['plan_estudios'][objeto], dominio}}});
}

export function handleInputArrays(e, objeto, propiedad, indice) {
    if (objeto == "competencias") {
        var dominios = this.state['dominios'].map(dominio => {
            return {
                ...dominio, competencias: dominio.competencias.map(competencia => {
                    return {
                        ...competencia,
                        descripcion: (competencia.id == indice) ?
                            (e.target ? e.target.value : e) : competencia.descripcion
                    }
                })
            }
        });
        this.setState({ dominios: dominios });
    }
    else {
        if (objeto == "nivel_competencias") {
            var dominios = this.state['dominios'].map(dominio => {
                return {
                    ...dominio, competencias: dominio.competencias.map(competencia => {
                        return {
                            ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                return {
                                    ...nivel_competencia,
                                    descripcion: (nivel_competencia.id == indice) ?
                                        (e.target ? e.target.value : e) : nivel_competencia.descripcion
                                }
                            })
                        }
                    })
                }
            });
            this.setState({ dominios: dominios });
        }
        else {
            if (objeto == "logro_aprendizajes") {
                var dominios = this.state['dominios'].map(dominio => {
                    return {
                        ...dominio, competencias: dominio.competencias.map(competencia => {
                            return {
                                ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                    return {
                                        ...nivel_competencia, logro_aprendizajes: nivel_competencia.logro_aprendizajes.map(logro_aprendizaje => {
                                            return {
                                                ...logro_aprendizaje,
                                                descripcion: (logro_aprendizaje.id == indice) ?
                                                    (e.target ? e.target.value : e) : logro_aprendizaje.descripcion
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
                this.setState({ dominios: dominios });
            }
            else {
                if (objeto == "asignaturas") {
                    var state = this.state[objeto];
                    if (e.target) {
                        state.find(asignatura => asignatura.id == indice)[propiedad] = e.target.value;
                    }
                    else {
                        state.find(asignatura => asignatura.id == indice)[propiedad] = e;
                    }

                    this.setState({ [objeto]: state });
                }
                else {
                    var state = this.state[objeto];
                    if (e.target) {
                        state.find(dominio => dominio.id == indice)[propiedad] = e.target.value;
                    }
                    else {
                        state.find(dominio => dominio.id == indice)[propiedad] = e;
                    }

                    this.setState({ [objeto]: state });
                }
            }
        }
    }
}

export function handleInputArraysAsignatura(e, objeto, propiedad, indice, idAsignatura) {
    var asignaturas = this.state['asignaturas'].map(asignatura => {
        if (asignatura.id == idAsignatura) {
            return {
                ...asignatura, [objeto]: asignatura[objeto].map(objetoSingle => {
                    return {
                        ...objetoSingle,
                        [propiedad]: (objetoSingle.id == indice) ?
                            (e.target ? e.target.value : e) : objetoSingle[propiedad]
                    }
                })
            }
        }
        else {
            return asignatura;
        }
    });
    this.setState({ asignaturas: asignaturas });
}



export function handleAddElement(key, elemento) {
    if (key == "competencias") {
        let dominio1 = this.state['dominios'].find(dominio => dominio.id == elemento.dominio_id);
        dominio1[key].push(elemento);
        let dominios1 = this.state.dominios.map(dominio =>
            dominio.id == elemento.dominio_id ?
                dominio1
                :
                dominio);
        this.setState({ dominios: dominios1 })
    }
    else {
        if (key == "nivel_competencias") {
            let dominios1 = this.state['dominios'].map(dominio => {
                return {
                    ...dominio, competencias: dominio.competencias.map(competencia => {
                        if (competencia.id == elemento.competencia_id) {
                            return { ...competencia, nivel_competencias: [...competencia.nivel_competencias, elemento] };
                        }
                        else {
                            return competencia;
                        }
                    }
                    )
                }
            }
            )
            this.setState({ dominios: dominios1 })
        }
        else {
            if (key == "logro_aprendizajes") {
                let dominios1 = this.state['dominios'].map(dominio => {
                    return {
                        ...dominio, competencias: dominio.competencias.map(competencia => {
                            return {
                                ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                    if (nivel_competencia.id == elemento.nivel_competencia_id) {
                                        return { ...nivel_competencia, logro_aprendizajes: [...nivel_competencia.logro_aprendizajes, elemento] };
                                    }
                                    else {
                                        return nivel_competencia;
                                    }
                                }
                                )
                            }
                        }
                        )
                    }
                }
                )
                this.setState({ dominios: dominios1 })
            }
            else {
                if (key == "nivel_competencia_asignaturas") {
                    let dominios1 = this.state['dominios'].map(dominio => {
                        return {
                            ...dominio, competencias: dominio.competencias.map(competencia => {
                                return {
                                    ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                        if (nivel_competencia.id == elemento.nivel_competencia_id) {
                                            return { ...nivel_competencia, nivel_competencia_asignaturas: [...nivel_competencia.nivel_competencia_asignaturas, elemento] };
                                        }
                                        else {
                                            return nivel_competencia;
                                        }
                                    }
                                    )
                                }
                            }
                            )
                        }
                    }
                    )
                    this.setState({ dominios: dominios1 })
                    let newElement = {
                        asignatura_id: elemento.asignatura_id,
                        created_at: elemento.created_at,
                        id: elemento.id,
                        nivel_competencia_id: elemento.nivel_competencia_id,
                        nivel_competencia: elemento.nivel_competencia,
                        updated_at: elemento.updated_at
                    };
                    let asignaturas = this.state.asignaturas.map(asignatura => {
                        if (asignatura.id == elemento.asignatura_id) {
                            return { ...asignatura, nivel_competencia_asignaturas: [...asignatura.nivel_competencia_asignaturas, newElement] };
                        }
                        else {
                            return asignatura;
                        }
                    })
                    this.setState({ asignaturas: asignaturas })
                }
                else {
                    if (key == "nivel_generica_asignaturas") {
                        let competencias_genericas = this.state['competencias_genericas'].map(competencias_generica => {
                            return {
                                ...competencias_generica, nivel_competencias: competencias_generica.nivel_competencias.map(nivel_competencia => {
                                    if (nivel_competencia.nivel_genericas[0].id == elemento.nivel_generica_id) {
                                        return {
                                            ...nivel_competencia,
                                            nivel_genericas:
                                                [
                                                    {
                                                        ...nivel_competencia.nivel_genericas[0],
                                                        nivel_generica_asignaturas: [...nivel_competencia.nivel_genericas[0].nivel_generica_asignaturas, elemento]
                                                    }
                                                ]
                                        }
                                    }
                                    else {
                                        return nivel_competencia;
                                    }
                                })
                            }
                        })
                        this.setState({ competencias_genericas: competencias_genericas })

                        let newElement = {
                            asignatura_id: elemento.asignatura_id,
                            created_at: elemento.created_at,
                            id: elemento.id,
                            nivel_generica_id: elemento.nivel_generica_id,
                            nivel_generica: elemento.nivel_generica,
                            updated_at: elemento.updated_at
                        };
                        let asignaturas = this.state.asignaturas.map(asignatura => {
                            if (asignatura.id == elemento.asignatura_id) {
                                return { ...asignatura, nivel_generica_asignaturas: [...asignatura.nivel_generica_asignaturas, newElement] };
                            }
                            else {
                                return asignatura;
                            }
                        })
                        this.setState({ asignaturas: asignaturas })
                    }
                    else {
                        if (key == "asignaturas") {
                            let asignaturas = [...this.state.asignaturas, elemento[0]];
                            this.setState({ asignaturas: asignaturas })
                            if (elemento[1].nivel_competencia_id) {
                                let dominios1 = this.state['dominios'].map(dominio => {
                                    return {
                                        ...dominio, competencias: dominio.competencias.map(competencia => {
                                            return {
                                                ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                                    if (nivel_competencia.id == elemento[1].nivel_competencia_id) {
                                                        return { ...nivel_competencia, nivel_competencia_asignaturas: [...nivel_competencia.nivel_competencia_asignaturas, { ...elemento[1], asignatura: elemento[0] }] };
                                                    }
                                                    else {
                                                        return nivel_competencia;
                                                    }
                                                }
                                                )
                                            }
                                        }
                                        )
                                    }
                                }
                                )
                                console.log('dominio', dominios1);
                                this.setState({ dominios: dominios1 })
                            }
                            else {
                                if (elemento[1].nivel_generica_id) {
                                    let dominios1 = this.state['competencias_genericas'].map(competencias_generica => {
                                        return {
                                            ...competencias_generica, nivel_competencias: competencias_generica.nivel_competencias.map(nivel_competencia => {
                                                if (nivel_competencia.nivel_genericas[0].id == elemento[1].nivel_generica_id) {
                                                    return {
                                                        ...nivel_competencia,
                                                        nivel_genericas:
                                                            [
                                                                {
                                                                    ...nivel_competencia.nivel_genericas[0],
                                                                    nivel_generica_asignaturas: [...nivel_competencia.nivel_genericas[0].nivel_generica_asignaturas, { ...elemento[1], asignatura: elemento[0] }]
                                                                }
                                                            ]
                                                    }
                                                }
                                                else {
                                                    return nivel_competencia;
                                                }
                                            })
                                        }
                                    })
                                    this.setState({ competencias_genericas: dominios1 })
                                }
                            }
                        }
                        else {
                            if (key == "competencia_evaluaciones") {
                                let dominios = this.state.dominios.map(dominio => {
                                    return {
                                        ...dominio, competencias: dominio.competencias.map(competencia => {
                                            return {
                                                ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                                    return {
                                                        ...nivel_competencia, nivel_competencia_asignaturas: nivel_competencia.nivel_competencia_asignaturas.map(nivel_competencia_asignatura => {
                                                            if (nivel_competencia_asignatura.id == elemento.nivel_competencia_asignatura_id) {
                                                                return {
                                                                    ...nivel_competencia_asignatura, competencia_evaluaciones: [...nivel_competencia_asignatura.competencia_evaluaciones, elemento]
                                                                }
                                                            }
                                                            else {
                                                                return nivel_competencia_asignatura;
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                                this.setState({ dominios: dominios })
                            }
                            else {
                                if (key == "generica_evaluaciones") {
                                    let competencias_genericas = this.state.competencias_genericas.map(competencias_generica => {
                                        return {
                                            ...competencias_generica, nivel_competencias: competencias_generica.nivel_competencias.map(nivel_competencia => {
                                                return {
                                                    ...nivel_competencia, nivel_genericas: nivel_competencia.nivel_genericas.map(nivel_generica => {
                                                        return {
                                                            ...nivel_generica, nivel_generica_asignaturas: nivel_generica.nivel_generica_asignaturas.map(nivel_generica_asignatura => {
                                                                if (nivel_generica_asignatura.id == elemento.nivel_generica_asignatura_id) {
                                                                    return {
                                                                        ...nivel_generica_asignatura, generica_evaluaciones: [...nivel_generica_asignatura.generica_evaluaciones, elemento]
                                                                    }
                                                                }
                                                                else {
                                                                    return nivel_generica_asignatura;
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                    this.setState({ competencias_genericas: competencias_genericas })
                                }
                                else {
                                    var state = this.state[key];
                                    state.push(elemento);
                                    this.setState({ [key]: state });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export function handleAddElementAsignatura(key, elemento, idAsignatura) {
    let asignaturas = this.state.asignaturas.map(asignatura => {
        if (asignatura.id == idAsignatura) {
            return {
                ...asignatura, [key]: [...asignatura[key], elemento]
            }
        }
        else {
            return asignatura;
        }
    });
    this.setState({ asignaturas: asignaturas });
}
//Permite manipular el estado cuando son checkbox
export function handleTiposResultado(e) {
    let valor = e.target.value;
    if (e.target.checked) {
        this.setState({
            avance_resultados: this.state.avance_resultados.concat([{ tipo_resultado_id: valor }])
        })
    } else {
        //   let arreglo = [...this.state.tipos_resultado];
        //   arreglo.splice( arreglo.indexOf(valor), 1 )
        this.setState({
            avance_resultados: this.state.avance_resultados.filter((obj) => {
                return obj.tipo_resultado_id != valor;
            })
        })
        // console.log(valor)
    }
}

export function handleContenido(e) {
    let valor = e.target.value;
    if (e.target.checked) {
        this.setState({
            contenidos: this.state.contenidos.concat([{ contenido_id: valor }])
        })
    } else {
        this.setState({
            contenidos: this.state.contenidos.filter((obj) => {
                return obj.contenido_id != valor;
            })
        })
    }
}

//Se usan cuando e no es un evento , ex: React-Datatable
export function handleInput2(e, objeto, propiedad) {
    var key = ''
    if (propiedad) {
        key = propiedad
    } else {
        key = e.target.getAttribute('name')
    }
    if (objeto) {
        var state = Object.assign({}, this.state[objeto]);
        state[key] = e;
        this.setState({ [objeto]: state });
    } else {
        var state = Object.assign({}, this.state);
        state[key] = e;
        this.setState(state);
    }

}
export function handleInputOtros(e, id, object = 'tipo_resultado_id', key = 'tipo_resultado_id') {
    let valor = e.target.value;
    this.setState({
        [object]: this.state[object].map((obj) => {
            return obj[key] == id ? { [key]: id, descripcion: valor } : obj
        })
    })
    // console.log( this.state.avance_resultados.map(( obj ) => {
    //     return obj.id
    // }) );
    // console.info(id)
}

export function borrarElemento(objeto, propiedad, addNotification) {
    //e.preventDefault();
    fetch(`/api/${objeto}/${propiedad}/`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw "Error en la llamada Ajax";
            }

        })
        .then(() => {
            if (objeto == 'competencias') {
                let dominios1 = this.state.dominios.map(dominio => {
                    return {
                        ...dominio, competencias: dominio.competencias.filter(competencia =>
                            competencia.id != propiedad)
                    }
                });

                this.setState({ dominios: dominios1 })
            }
            else {
                if (objeto == 'nivel_competencias') {
                    let dominios1 = this.state.dominios.map(dominio => {
                        return {
                            ...dominio, competencias: dominio.competencias.map(competencia => {
                                return {
                                    ...competencia, nivel_competencias: competencia.nivel_competencias.filter(nivel_competencia =>
                                        nivel_competencia.id != propiedad)
                                }
                            }
                            )
                        }
                    });

                    this.setState({ dominios: dominios1 })
                }
                else {
                    if (objeto == 'logro_aprendizajes') {
                        let dominios1 = this.state.dominios.map(dominio => {
                            return {
                                ...dominio, competencias: dominio.competencias.map(competencia => {
                                    return {
                                        ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                            return {
                                                ...nivel_competencia, logro_aprendizajes: nivel_competencia.logro_aprendizajes.filter(logro_aprendizaje =>
                                                    logro_aprendizaje.id != propiedad)
                                            }
                                        }
                                        )
                                    }
                                }
                                )
                            }
                        });

                        this.setState({ dominios: dominios1 })
                    }
                    else {
                        if (objeto == 'nivel_competencia_asignaturas') {
                            let dominios1 = this.state.dominios.map(dominio => {
                                return {
                                    ...dominio, competencias: dominio.competencias.map(competencia => {
                                        return {
                                            ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                                return {
                                                    ...nivel_competencia, nivel_competencia_asignaturas: nivel_competencia.nivel_competencia_asignaturas.filter(nivel_competencia_asignatura =>
                                                        nivel_competencia_asignatura.id != propiedad)
                                                }
                                            }
                                            )
                                        }
                                    }
                                    )
                                }
                            });
                            this.setState({ dominios: dominios1 })

                            let asignaturas = this.state.asignaturas.map(asignatura => {
                                return {
                                    ...asignatura, nivel_competencia_asignaturas: asignatura.nivel_competencia_asignaturas.filter(nivel_competencia_asignatura =>
                                        nivel_competencia_asignatura.id != propiedad)
                                }
                            });

                            this.setState({ asignaturas: asignaturas })
                        }
                        else {
                            if (objeto == 'nivel_generica_asignaturas') {
                                let competencias_genericas = this.state.competencias_genericas.map(competencias_generica => {
                                    return {
                                        ...competencias_generica, nivel_competencias: competencias_generica.nivel_competencias.map(nivel_competencia => {
                                            return {
                                                ...nivel_competencia, nivel_genericas: nivel_competencia.nivel_genericas.map(nivel_generica => {
                                                    return {
                                                        ...nivel_generica, nivel_generica_asignaturas: nivel_generica.nivel_generica_asignaturas.filter(nivel_generica_asignatura =>
                                                            nivel_generica_asignatura.id != propiedad)
                                                    }

                                                })
                                            }
                                        })
                                    }
                                });
                                this.setState({ competencias_genericas: competencias_genericas })

                                let asignaturas = this.state.asignaturas.map(asignatura => {
                                    return {
                                        ...asignatura, nivel_generica_asignaturas: asignatura.nivel_generica_asignaturas.filter(nivel_generica_asignatura =>
                                            nivel_generica_asignatura.id != propiedad)
                                    }
                                });

                                this.setState({ asignaturas: asignaturas })
                            }
                            else {
                                if (objeto == 'asignaturas') {
                                    let dominios1 = this.state.dominios.map(dominio => {
                                        return {
                                            ...dominio, competencias: dominio.competencias.map(competencia => {
                                                return {
                                                    ...competencia, nivel_competencias: competencia.nivel_competencias.map(nivel_competencia => {
                                                        return {
                                                            ...nivel_competencia, nivel_competencia_asignaturas: nivel_competencia.nivel_competencia_asignaturas.filter(nivel_competencia_asignatura =>
                                                                nivel_competencia_asignatura.asignatura.id != propiedad)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    });
                                    this.setState({ dominios: dominios1 })

                                    let competencias_genericas = this.state.competencias_genericas.map(competencias_generica => {
                                        return {
                                            ...competencias_generica, nivel_competencias: competencias_generica.nivel_competencias.map(nivel_competencia => {
                                                return {
                                                    ...nivel_competencia, nivel_genericas: nivel_competencia.nivel_genericas.map(nivel_generica => {
                                                        return {
                                                            ...nivel_generica, nivel_generica_asignaturas: nivel_generica.nivel_generica_asignaturas.filter(nivel_generica_asignatura =>
                                                                nivel_generica_asignatura.asignatura.id != propiedad)
                                                        }

                                                    })
                                                }
                                            })
                                        }
                                    });
                                    this.setState({ competencias_genericas: competencias_genericas })


                                    let asignaturas = this.state.asignaturas.filter(asignatura =>
                                        asignatura.id != propiedad
                                    );

                                    this.setState({ asignaturas: asignaturas })

                                }
                                else {
                                    let newstate = this.state[objeto].filter((el) => el.id != propiedad)
                                    this.setState({ [objeto]: newstate })
                                }
                            }
                        }
                    }
                }
            }
        }
        )
        .finally(() => { addNotification() });
}

export function borrarElementoAsignatura(objeto, propiedad, addNotification, idAsignatura) {
    //e.preventDefault();
    fetch(`/api/${objeto}/${propiedad}/`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw "Error en la llamada Ajax";
            }

        })
        .then(() => {
            let asignaturas = this.state.asignaturas.map(asignatura => {
                if (asignatura.id == idAsignatura) {
                    return {
                        ...asignatura, [objeto]: asignatura[objeto].filter(objetoSingle =>
                            objetoSingle.id != propiedad
                        )
                    }
                }
                else {
                    return asignatura;
                }
            })
            this.setState({ asignaturas: asignaturas })
        })
        .finally(() => { addNotification() });
}

export const CONF_DATATABLE = {
    buttons: ['copy', 'csv', 'excel'],
    "dom": '<"toolbar d-flex justify-content-end" f>rtip',
    "language": {
        "lengthMenu": "Mostrando _MENU_ proyectos por página",
        "zeroRecords": "Sin proyectos",
        "info": "Mostrando _PAGE_ de _PAGES_ páginas",
        "infoEmpty": "Sin proyectos",
        "infoFiltered": "(Filtrados de un total de _MAX_ proyectos)",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Anterior",
            "previous": "Siguiente"
        },
        'search': "Buscar: ",
    },
    "destroy": true,
    responsive: true,
    columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 }
    ]
}