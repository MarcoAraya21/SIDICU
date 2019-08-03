<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bibliografia extends Model
{
    protected $fillable = ['nombre_autor', 'apellido_autor', 'año', 'titulo', 'editorial', 'pais', 'tipo_bibliografia_id', 'asignatura_id'];

    public function tipo_bibliografia()
    {
        return $this->belongsTo('App\TipoBibliografia');
    }
    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }   
}
