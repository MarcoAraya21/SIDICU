<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'roles';

    public function plan_estudio_usuarios()
    {
        return $this->hasMany('App\PlanEstudioUsuario');
    }
}
