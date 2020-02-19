<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Anexo extends Model
{
    protected $fillable = ['nombre', 'documento', 'plan_estudios_id'];

    public function plan_estudio()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
}
