<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dominio extends Model
{
    protected $fillable = ['nombre', 'plan_estudio_id'];

    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }

    public function competencias()
    {
        return $this->hasMany('App\Competencia');
    }
}
