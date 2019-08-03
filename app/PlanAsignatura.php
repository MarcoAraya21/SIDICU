<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanAsignatura extends Model
{
    protected $fillable = ['relacion_egreso', 'metodologias', 'ambientes', 'perfil_docente', 'perfil_ayudante', 'plan_estudio_id', 'asignatura_id'];

    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }

    public function logro_aprendizajes()
    {
        return $this->hasMany('App\LogroAprendizaje');
    }
    public function plan_asignatura_horas()
    {
        return $this->hasMany('App\PlanAsignaturaHora');
    }

    //Hacer funcion que retorne el padre
    // public function requisitos()
    // {
    //     return $this->hasMany('App\RequisitoPlanAsignatura');
    // }
}
