<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ciclo extends Model
{
    protected $fillable = ['nombre','sigla'];

    public function asignaturas()
    {
        return $this->hasMany('App\Asignatura');
    }
}
