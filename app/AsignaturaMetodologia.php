<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AsignaturaMetodologia extends Model
{
    protected $fillable = ['asignatura_id', 'metodologia_id'];

    public function asignatura()
    {
        return $this->belongsTo('App\Asignatura');
    }
    public function metodologia()
    {
        return $this->belongsTo('App\Metodologia');
    }
}
