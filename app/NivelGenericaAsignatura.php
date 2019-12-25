<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NivelGenericaAsignatura extends Model
{
    public function nivel_generica()
    {
        return $this->belongsTo('App\NivelGenerica');
    }
}
