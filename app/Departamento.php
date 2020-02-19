<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $fillable = ['nombre'];

    public function facultad()
    {
        return $this->belongsTo('App\Facultad');
    }


    public function asignaturas()
    {
        return $this->hasMany('App\Asignatura');
    }
}
