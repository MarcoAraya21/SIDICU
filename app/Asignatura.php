<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    protected $fillable = ['nombre', 'codigo', 'descripcion', 'tipo_asignatura_id', 'modalidad_id', 'regimen_id', 'ciclo_id', 'requisito_id', 'departamento_id'];

    public function tipo_asignatura()
    {
        return $this->belongsTo('App\TipoAsignatura');
    }
    public function modalidad()
    {
        return $this->belongsTo('App\Modalidad');
    }
    public function regimen()
    {
        return $this->belongsTo('App\Regimen');
    }
    public function ciclo()
    {
        return $this->belongsTo('App\Ciclo');
    }
    public function departamento()
    {
        return $this->belongsTo('App\Departamento');
    }

    public function bibliografias()
    {
        return $this->hasMany('App\Bibliografia');
    }
    public function plan_asignaturas()
    {
        return $this->hasMany('App\PlanAsignatura');
    }


}
