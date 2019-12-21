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

    public function nivel_competencia_asignaturas()
    {
        return $this->hasMany('App\NivelCompetenciaAsignatura');
    }

    public function nivel_genericas()
    {
        return $this->hasMany('App\NivelGenerica');
    }
}
