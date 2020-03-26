<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grado extends Model
{
    protected $fillable = ['nombre', 'estado_id'];

    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

    public function carreras()
    {
        return $this->hasMany('App\Carrera');
    }
}
