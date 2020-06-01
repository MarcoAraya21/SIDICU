<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;

class Usuario extends Model implements AuthenticatableContract
{
    use Authenticatable;

    protected $fillable = ['nombre','apellido_paterno', 'apellido_materno', 'correo', 'rut', 'password', 'fec_nac', 'fono_fijo', 'fono_celular', 'validado',
                            'perfil_id', 'carrera_id', 'estado_id'];
    protected $hidden = ['fec_nac', 'password', 'remember_token', 'validado', 'perfil_id', 'estado_id', ];
    public function perfil()
    {
        return $this->belongsTo('App\Perfil');
    }
    public function carrera()
    {
        return $this->belongsTo('App\Carrera');
    }
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

    public function plan_estudio_usuarios()
    {
        return $this->hasMany('App\PlanEstudioUsuario');
    }

    public function usuario_verificaciones()
    {
        return $this->hasMany('App\UsuarioVerificacion');
    }

    public function plan_estudios()
    {
        return $this->belongsToMany('App\PlanEstudio','plan_estudio_usuarios','usuario_id','plan_estudio_id');
    }
}
