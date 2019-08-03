<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modalidad extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'modalidades';

    public function asignaturas()
    {
        return $this->hasMany('App\Asignatura');
    }
}
