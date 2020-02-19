<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $fillable = ['nombre'];

    public function plan_estudios()
    {
        return $this->hasMany('App\PlanEstudio');
    }
    public function carreras()
    {
        return $this->hasMany('App\Carrera');
    }
    public function estados()
    {
        return $this->hasMany('App\Estado');
    }
}
