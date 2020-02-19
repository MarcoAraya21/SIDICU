<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoHora extends Model
{
    protected $fillable = ['nombre'];

    //verificar
    // public function padre()
    // {
    //     return $this->belongsTo('App\TipoHora');
    // }

    //verificar
    // public function hijos()
    // {
    //     return $this->hasMany('App\TipoHora');
    // }
}
