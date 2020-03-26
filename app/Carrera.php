<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    protected $fillable = ['nombre', 'cod_demre', 'titulo', 'escuela_id', 'estado_id','grado_id', 'tipo_grado_id'];

    public function escuela()
    {
        return $this->belongsTo('App\Escuela');
    }
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }
    public function grado()
    {
        return $this->belongsTo('App\Grado');
    }
    public function tipo_grado()
    {
        return $this->belongsTo('App\TipoGrado');
    }

    public function usuarios()
    {
        return $this->hasMany('App\Usuario');
    }
    public function plan_estudios()
    {
        return $this->hasMany('App\PlanEstudio');
    }
}
