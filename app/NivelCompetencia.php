<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NivelCompetencia extends Model
{
    protected $fillable = ['descripcion', 'nivel', 'competencia_id'];

    public function competencia()
    {
        return $this->belongsTo('App\Competencia');
    }

    public function logro_aprendizajes()
    {
        return $this->hasMany('App\LogroAprendizaje');
    }
    public function asignaturas()
    {
        return $this->hasMany('App\Asignatura');
    }

    public function plan_estudio_nivel_competencias()
    {
        return $this->hasMany('App\PlanEstudioNivelCompetencia');
    }
}
