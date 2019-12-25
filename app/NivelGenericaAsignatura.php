<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NivelGenericaAsignatura extends Model
{
    protected $fillable = ['nivel_generica_id', 'asignatura_id'];

    public function nivel_generica()
    {
        return $this->belongsTo('App\NivelGenerica');
    }

    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }
}
