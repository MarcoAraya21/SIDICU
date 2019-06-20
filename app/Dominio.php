<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dominio extends Model
{
    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
}
