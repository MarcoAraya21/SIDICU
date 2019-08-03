<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanAsignaturaHora extends Model
{
    protected $fillable = ['cantidad', 'tipo_hora_id', 'plan_asignatura_id'];

    public function tipo_hora()
    {
        return $this->belongsTo('App\TipoHora');
    }
    public function plan_asignatura()
    {
        return $this->belongsTo('App\PlanAsignatura');
    }
}
