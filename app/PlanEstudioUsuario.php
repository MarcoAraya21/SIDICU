<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanEstudioUsuario extends Model
{
    protected $fillable = ['usuario_id', 'plan_estudio_id', 'rol_id'];

    public function usuario()
    {
        return $this->belongsTo('App\Usuario');
    }
    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
    public function rol()
    {
        return $this->belongsTo('App\Rol');
    }
}
