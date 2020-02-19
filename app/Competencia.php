<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competencia extends Model
{
    protected $fillable = ['descripcion', 'funcion_clave', 'dominio_id'];

    public function dominio()
    {
        return $this->belongsTo('App\Dominio');
    }

    public function nivel_competencias()
    {
        return $this->hasMany('App\NivelCompetencia');
    }
}
