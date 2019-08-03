<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $fillable = ['nombre', 'rut', 'contraseña', 'fec_nac', 'fono_fijo', 'fono_celular',
                            'perfil_id', 'carrera_id'];

    public function perfil()
    {
        return $this->belongsTo('App\Perfil');
    }
    public function carrera()
    {
        return $this->belongsTo('App\Carrera');
    }

    public function plan_estudio_usuarios()
    {
        return $this->hasMany('App\PlanEstudioUsuario');
    }
}
