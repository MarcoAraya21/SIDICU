<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoBibliografia extends Model
{
    protected $fillable = ['nombre'];

    public function bibliografias()
    {
        return $this->hasMany('App\Bibliografia');
    }
}
