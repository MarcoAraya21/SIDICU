<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AsignaturaHora extends Model
{
    protected $fillable = ['cantidad', 'tipo_hora_id', 'asignatura_id'];

    public function tipo_hora()
    {
        return $this->belongsTo('App\TipoHora');
    }
    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }
}
