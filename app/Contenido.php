<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contenido extends Model
{
    protected $fillable = ['nombre', 'unidad_id'];

    public function unidad()
    {
        return $this->belongsTo('App\Unidad');
    }
}
