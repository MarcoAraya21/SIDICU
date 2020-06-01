
export function validaciones(plan, carrera, otros){
    const campo_mensaje = 'Este campo es requerido';
    let errores = {plan: {}, carrera: {}};
    //Campos Base
    if (!plan.nombre) {
        errores.plan.nombre = campo_mensaje;
    }
    // if (!plan.observacion) {
    //     errores.plan.observacion = campo_mensaje;
    // }
    if (!plan.tipo_formacion_id) {
        errores.plan.tipo_formacion_id = campo_mensaje;
    }
    if (plan.nueva_oferta == false) {
        if (!plan.carrera_id) {
            errores.plan.carrera_id = campo_mensaje;
        }
    }
    else
    {
        if (!carrera.nombre) {
            errores.carrera.nombre = campo_mensaje;
        }
        if (!carrera.titulo) {
            errores.carrera.titulo = campo_mensaje;
        }
        if (!carrera.escuela_id) {
            errores.carrera.escuela_id = campo_mensaje;
        }
    }
    if (!plan.tipo_plan_id) {
        errores.plan.tipo_plan_id = campo_mensaje;
    }
    else
    {
        if (!plan.tipo_grado_id) {
            errores.plan.tipo_grado_id = campo_mensaje;
        }
    }
    if (!plan.grado_id) {
        errores.plan.grado_id = campo_mensaje;
    }
    if (!plan.jornada_id) {
        errores.plan.jornada_id = campo_mensaje;
    }
    if (!plan.modalidad_id) {
        errores.plan.modalidad_id = campo_mensaje;
    }
    if (!plan.academico_id) {
        errores.plan.academico_id = campo_mensaje;
    }
    if (!plan.asesor_id) {
        errores.plan.asesor_id = campo_mensaje;
    }
    if (otros.titulo_intermedio) {
        if (!plan.titulo_intermedio) {
            errores.plan.titulo_intermedio = campo_mensaje;
        }
    }
    if (otros.minor) {
        if (!plan.minor) {
            errores.plan.minor = campo_mensaje;
        }
    }
    if (otros.diploma) {
        if (!plan.diploma) {
            errores.plan.diploma = campo_mensaje;
        }
    }

    console.log('errores', errores);
    return errores;
}
