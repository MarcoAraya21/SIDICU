<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Escuela extends Model
{
    protected $fillable = ['nombre', 'facultad_id'];

    public function facultad()
    {
        return $this->belongsTo('App\Facultad');
    }

    public function carreras()
    {
        return $this->hasMany('App\Carrera');
    }
}
