<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Metodologia extends Model
{
    protected $fillable = ['nombre', 'asignatura_id'];

    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }
}
