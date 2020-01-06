<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Metodologia extends Model
{
    protected $fillable = ['nombre'];

    public function asignatura_metodologias()
    {
        return $this->hasMany('App\AsignaturaMetodologia');
    }
}
