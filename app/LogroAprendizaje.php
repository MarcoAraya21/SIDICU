<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogroAprendizaje extends Model
{
    protected $fillable = ['descripcion', 'nivel_competencia_id'];

    public function nivel_competencia()
    {
        return $this->belongsTo('App\NivelCompetencia');
    }
}
