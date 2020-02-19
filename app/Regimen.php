<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Regimen extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'regimenes';

    public function plan_estudios()
    {
        return $this->hasMany('App\PlanEstudio');
    }
}
