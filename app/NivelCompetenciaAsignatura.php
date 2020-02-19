<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NivelCompetenciaAsignatura extends Model
{
    protected $fillable = ['nivel_competencia_id', 'asignatura_id'];

    public function nivel_competencia()
    {
        return $this->belongsTo('App\NivelCompetencia');
    }

    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }
}
