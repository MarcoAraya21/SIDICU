<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanEstudio extends Model
{
    protected $fillable = ['nombre', 'observacion', 'proposito', 'objetivo', 'requisito_admision', 'mecanismo_retencion', 'requisito_obtencion', 'campo_desarrollo',
                            'carrera_id', 'tipo_plan_id', 'tipo_ingreso_id', 'padre_id', 'estado_id'];
    protected $appends = ['competencias_genericas','asignaturas'];


    public function carrera()
    {
        return $this->belongsTo('App\Carrera');
    }
    public function tipo_plan()
    {
        return $this->belongsTo('App\TipoPlan');
    }
    public function tipo_ingreso()
    {
        return $this->belongsTo('App\TipoIngreso');
    }
    //verificar
    public function padre()
    {
        return $this->belongsTo('App\PlanEstudio');
    }
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

    public function anexos()
    {
        return $this->hasMany('App\Anexo');
    }
    //verificar
    public function hijos()
    {
        return $this->hasMany('App\PlanEstudio');
    }
    //verificar
    public function plan_estudio_usuarios()
    {
        return $this->hasMany('App\PlanEstudioUsuario');
    }
    public function dominios()
    {
        return $this->hasMany('App\Dominio');
    }

    public function usuarios()
    {
        return $this->belongsToMany('App\Usuario','plan_estudio_usuarios','plan_estudio_id','usuario_id');
    }

    public function nivel_genericas()
    {
        return $this->hasMany('App\NivelGenerica');
    }

    public function getCompetenciasGenericasAttribute()
    {
        $i = 0;
        $plan_niveles = $this->nivel_genericas()
        ->with(['nivel_competencia' => function ($query) {
            $query
            ->with(['competencia' => function ($query) {
                $query
                ->with(['nivel_competencias' => function ($query) {
                    $query
                    ->with('logro_aprendizajes')
                    ->with('nivel_genericas');
                }]);
            }]);
        }])->get();
        
        foreach ($plan_niveles as $key => $plan_nivel) {
            $plan_niveles[$i] = $plan_nivel->nivel_competencia->competencia;
            $i = $i + 1;
        }
        return $plan_niveles->unique();
            // foreach ($plan_niveles as $key => $plan_nivel) {
            //     if($i == 0){
            //         return $plan_nivel->nivel_competencia;
            //     }
            //     $i = $i + 1;
            // }
    }

    public function getAsignaturasAttribute()
    {
        $i = 0;
        $plan_niveles = $this->nivel_genericas()
        ->with(['nivel_generica_asignaturas' => function ($query) {
            $query
            ->with('asignatura');
        }])
        ->get();
        
        // foreach ($plan_niveles as $key => $plan_nivel) {
        //     $plan_niveles[$i] = $plan_nivel->nivel_competencia->competencia;
        //     $i = $i + 1;
        // }
        return $plan_niveles;
            // foreach ($plan_niveles as $key => $plan_nivel) {
            //     if($i == 0){
            //         return $plan_nivel->nivel_competencia;
            //     }
            //     $i = $i + 1;
            // }
    }
}
