<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $fillable = ['nombre'];

    public function asignaturas()
    {
        return $this->hasMany('App\Asignatura');
    }
}
