<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    protected $fillable = ['nombre', 'plan_estudio_id'];
    protected $table = 'niveles';
    
    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }

    public function asignaturas()
    {
        return $this->hasMany('App\Asignatura');
    }
}
