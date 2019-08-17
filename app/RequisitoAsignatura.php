<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequisitoAsignatura extends Model
{
    protected $fillable = ['asignatura_id', 'requisito_id'];

    //verificar
    // public function plan_asignatura()
    // {
    //     return $this->belongsTo('App\Asignatura');
    // }
    //verificar
    // public function requisito()
    // {
    //     return $this->belongsTo('App\Asignatura');
    // }
}
