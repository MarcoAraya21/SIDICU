<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanEstudio extends Model
{
    protected $fillable = ['nombre','observacion'];

    public function dominios()
    {
        return $this->hasMany('App\Dominio');
    }
}
