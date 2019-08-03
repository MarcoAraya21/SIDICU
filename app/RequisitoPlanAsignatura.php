<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequisitoPlanAsignatura extends Model
{
    protected $fillable = ['plan_asignatura_id', 'requisito_id'];

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
