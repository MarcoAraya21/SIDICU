<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogroAprendizaje extends Model
{
    protected $fillable = ['descripcion', 'plan_asignatura_id', 'nivel_competencia_id'];

    public function plan_asignatura()
    {
        return $this->belongsTo('App\PlanAsignatura');
    }
    public function nivel_competencia()
    {
        return $this->belongsTo('App\NivelCompetencia');
    }
}
