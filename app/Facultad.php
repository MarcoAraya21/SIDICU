<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Facultad extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'facultades';

    public function escuelas()
    {
        return $this->hasMany('App\Escuela');
    }
    public function departamentos()
    {
        return $this->hasMany('App\Departamento');
    }
}
