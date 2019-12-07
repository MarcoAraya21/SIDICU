<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    protected $fillable = ['nombre', 'codigo', 'descripcion', 'relacion_egreso', 'metodologias', 'ambientes', 'perfil_docente', 'perfil_ayudante', 'tipo_asignatura_id', 'modalidad_id', 'regimen_id', 'ciclo_id', 'requisito_id', 'departamento_id', 'nivel_competencia_id'];

    public function tipo_asignatura()
    {
        return $this->belongsTo('App\TipoAsignatura');
    }
    public function modalidad()
    {
        return $this->belongsTo('App\Modalidad');
    }
    public function regimen()
    {
        return $this->belongsTo('App\Regimen');
    }
    public function ciclo()
    {
        return $this->belongsTo('App\Ciclo');
    }
    public function departamento()
    {
        return $this->belongsTo('App\Departamento');
    }
    public function nivel_competencia()
    {
        return $this->belongsTo('App\NivelCompetencia');
    }
    public function plan_estudio_nivel_competencia()
    {
        return $this->belongsTo('App\PlanEstudioNivelCompetencia');
    }

    public function bibliografias()
    {
        return $this->hasMany('App\Bibliografia');
    }
    public function asignatura_horas()
    {
        return $this->hasMany('App\AsignaturaHora');
    }
    public function evaluaciones()
    {
        return $this->hasMany('App\Evaluacion');
    }
    public function metodologias()
    {
        return $this->hasMany('App\Metodologia');
    }
    public function unidades()
    {
        return $this->hasMany('App\Unidad');
    }

    //Hacer funcion que retorne el padre
    // public function requisitos()
    // {
    //     return $this->hasMany('App\RequisitoPlanAsignatura');
    // }
}
