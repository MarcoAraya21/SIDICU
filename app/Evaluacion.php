<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'evaluaciones';

    public function asignatura_evaluaciones()
    {
        return $this->hasMany('App\AsignaturaEvaluacion');
    }
}
