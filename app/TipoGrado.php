<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoGrado extends Model
{
    protected $fillable = ['nombre'];

    public function carreras()
    {
        return $this->hasMany('App\Carrera');
    }
}
