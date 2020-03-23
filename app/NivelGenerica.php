<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NivelGenerica extends Model
{
    protected $fillable = ['plan_estudio_id', 'nivel_competencia_id'];

    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
    public function nivel_competencia()
    {
        return $this->belongsTo('App\NivelCompetencia');
    }

    public function nivel_generica_asignaturas()
    {
        return $this->hasMany('App\NivelGenericaAsignatura');
    }
}
