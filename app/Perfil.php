<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'perfiles';

    public function usuarios()
    {
        return $this->hasMany('App\Usuario');
    }
}
