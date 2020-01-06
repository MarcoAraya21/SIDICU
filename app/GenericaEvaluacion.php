<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenericaEvaluacion extends Model
{
    protected $fillable = ['descripcion', 'nivel_generica_asignatura_id'];
    protected $table = 'generica_evaluaciones';

    public function nivel_generica_asignatura()
    {
        return $this->belongsTo('App\NivelGenericaAsignatura');
    }
}
