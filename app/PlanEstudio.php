<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanEstudio extends Model
{
    protected $fillable = ['nombre', 'observacion', 'proposito', 'objetivo', 'requisito_admision', 'mecanismo_retencion', 'requisito_obtencion', 'campo_desarrollo',
                            'carrera_id', 'tipo_plan_id', 'tipo_ingreso_id', 'padre_id', 'estado_id'];

    public function carrera()
    {
        return $this->belongsTo('App\Carrera');
    }
    public function tipo_plan()
    {
        return $this->belongsTo('App\TipoPlan');
    }
    public function tipo_ingreso()
    {
        return $this->belongsTo('App\TipoIngreso');
    }
    //verificar
    public function padre()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

    public function anexos()
    {
        return $this->hasMany('App\Anexo');
    }
    //verificar
    public function hijos()
    {
        return $this->hasMany('App\PlanEstudio');
    }
    //verificar
    public function plan_estudio_usuarios()
    {
        return $this->hasMany('App\PlanEstudioUsuario');
    }
    public function dominios()
    {
        return $this->hasMany('App\Dominio');
    }
}
