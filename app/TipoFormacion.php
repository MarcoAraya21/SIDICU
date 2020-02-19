<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoFormacion extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'tipo_formaciones';

    public function plan_estudios()
    {
        return $this->hasMany('App\PlanEstudio');
    }
}
