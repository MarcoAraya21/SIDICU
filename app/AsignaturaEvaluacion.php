<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AsignaturaEvaluacion extends Model
{
    protected $fillable = ['asignatura_id', 'evaluacion_id'];
    protected $table = 'asignatura_evaluaciones';

    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }
    public function evaluacion()
    {
        return $this->belongsTo('App\Evaluacion');
    }
}
