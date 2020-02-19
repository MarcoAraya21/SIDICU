<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Unidad extends Model
{
    protected $table = 'unidades';
    protected $fillable = ['nombre', 'horas_aula', 'horas_extra_aula', 'asignatura_id'];

    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }

    public function contenidos()
    {
        return $this->hasMany('App\Contenido');
    }
}
