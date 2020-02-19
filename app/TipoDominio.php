<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoDominio extends Model
{
    protected $fillable = ['nombre'];

    public function dominios()
    {
        return $this->hasMany('App\Dominio');
    }
}
