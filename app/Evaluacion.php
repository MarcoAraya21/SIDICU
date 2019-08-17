<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{
    protected $table = 'evaluaciones';
    protected $fillable = ['nombre', 'asignatura_id'];

    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }

}
