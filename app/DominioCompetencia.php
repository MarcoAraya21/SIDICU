<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DominioCompetencia extends Model
{
    protected $fillable = ['competencia_id', 'dominio_id'];

    public function competencia()
    {
        return $this->belongsTo('App\Competencia');
    }
    public function dominio()
    {
        return $this->belongsTo('App\Dominio');
    }
}
