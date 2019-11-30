<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dominio extends Model
{
    protected $fillable = ['nombre', 'plan_estudio_id', 'tipo_dominio_id'];

    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
    public function tipo_dominio()
    {
        return $this->belongsTo('App\TipoDominio');
    }

    public function competencias()
    {
        return $this->hasMany('App\Competencia');
    }
}
