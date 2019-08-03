<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grado extends Model
{
    protected $fillable = ['nombre', 'perfil'];

    public function carreras()
    {
        return $this->hasMany('App\Carrera');
    }
}
