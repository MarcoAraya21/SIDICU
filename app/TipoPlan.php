<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoPlan extends Model
{
    protected $table = 'tipo_planes';
    protected $fillable = ['nombre'];

    public function plan_estudios()
    {
        return $this->hasMany('App\PlanEstudio');
    }
}
