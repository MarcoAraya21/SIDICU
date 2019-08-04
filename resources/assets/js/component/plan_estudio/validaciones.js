
export function validaciones(values){
    const campo_mensaje = 'Este campo es requerido';
    const archivo_mensaje = 'Este archivo es requerido';
    const entero_mensaje = 'Este campo debe ser un numero entero'
    let errors = {};
    //Campos Base
    if (!values.nombre) {
        errors.nombre = campo_mensaje;
    }
    if (!values.observacion) {
        errors.observacion = campo_mensaje;
    }
    if (!values.carrera_id) {
        errors.carrera_id = campo_mensaje;
    }
    if (!values.tipo_plan_id) {
        errors.tipo_plan_id = campo_mensaje;
    }
    if (!values.tipo_ingreso_id) {
        errors.tipo_ingreso_id = campo_mensaje;
    }

    

    
    // console.log('errors', errors);
    return errors;
}
