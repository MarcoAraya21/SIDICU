<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompetenciaEvaluacion extends Model
{
    protected $fillable = ['descripcion', 'nivel_competencia_asignatura_id'];
    protected $table = 'competencia_evaluaciones';

    public function nivel_competencia_asignatura()
    {
        return $this->belongsTo('App\NivelCompetenciaAsignatura');
    }
}
