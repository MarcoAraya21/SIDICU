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

    public function niveles()
    {
        return $this->hasMany('App\Nivel');
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
                    ->with(['nivel_genericas' => function ($query) {
                        $query
                        ->with(['nivel_generica_asignaturas' => function ($query) {
                            $query
                            ->with('asignatura')
                            ->with('generica_evaluaciones');
                        }]);
                    }]);
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
        $asignaturas_1 = [];
        $asignaturas_2 = [];
        $profesionales = $this->dominios()
        ->with(['competencias' => function ($query) {
            $query
            ->with(['nivel_competencias' => function ($query) {
                $query
                ->with(['nivel_competencia_asignaturas' => function ($query) {
                    $query
                    ->with(['asignatura' => function ($query) {
                        $query
                        ->with(['nivel_competencia_asignaturas' => function ($query) {
                            $query
                            ->with('nivel_competencia');
                        }])
                        ->with(['nivel_generica_asignaturas' => function ($query) {
                            $query
                            ->with(['nivel_generica' => function ($query) {
                                $query
                                ->with('nivel_competencia');
                            }]);
                        }])
                        ->with('tipo_asignatura')
                        ->with('modalidad')
                        ->with('regimen')
                        ->with('ciclo')
                        ->with('departamento')
                        ->with('nivel')
                        ->with(['bibliografias' => function ($query) {
                            $query
                            ->with('tipo_bibliografia');
                        }])
                        ->with(['unidades' => function ($query) {
                            $query
                            ->with('contenidos');
                        }])
                        ->with(['asignatura_horas' => function ($query) {
                            $query
                            ->with('tipo_hora');
                        }])
                        ->with(['requisitos' => function ($query) {
                            $query
                            ->with(['requisito' => function ($query) {
                                $query
                                ->with('nivel');
                            }]);
                        }])
                        ->with(['asignatura_metodologias' => function ($query) {
                            $query
                            ->with('metodologia');
                        }]);
                    }]);
                }]);
            }]);
        }])
        ->get();
        $genericas = $this->nivel_genericas()
        ->with(['nivel_generica_asignaturas' => function ($query) {
            $query
            ->with(['asignatura' => function ($query) {
                $query
                ->with(['nivel_competencia_asignaturas' => function ($query) {
                    $query
                    ->with('nivel_competencia');
                }])
                ->with(['nivel_generica_asignaturas' => function ($query) {
                    $query
                    ->with(['nivel_generica' => function ($query) {
                        $query
                        ->with('nivel_competencia');
                    }]);
                }])
                ->with('tipo_asignatura')
                ->with('modalidad')
                ->with('regimen')
                ->with('ciclo')
                ->with('departamento')
                ->with('nivel')
                ->with(['bibliografias' => function ($query) {
                    $query
                    ->with('tipo_bibliografia');
                }])
                ->with(['unidades' => function ($query) {
                    $query
                    ->with('contenidos');
                }])
                ->with(['asignatura_horas' => function ($query) {
                    $query
                    ->with('tipo_hora');
                }])
                ->with(['requisitos' => function ($query) {
                    $query
                    ->with(['requisito' => function ($query) {
                        $query
                        ->with('nivel');
                    }]);
                }])
                ->with(['asignatura_metodologias' => function ($query) {
                    $query
                    ->with('metodologia');
                }]);
            }]);
        }])
        ->get();
        foreach ($profesionales as $key => $profesional) {
            foreach ($profesional->competencias as $key => $competencia) {
                foreach ($competencia->nivel_competencias as $key => $nivel_competencia) {
                    if(sizeof($nivel_competencia->nivel_competencia_asignaturas) > 0)
                    {
                        foreach ($nivel_competencia->nivel_competencia_asignaturas as $key => $nivel_competencia_asignatura) {
                            $asignaturas_1[$i] = $nivel_competencia_asignatura->asignatura;
                            $i = $i + 1;
                        }
                    }
                }
            }
        }
        $i = 0;
        foreach ($genericas as $key => $generica) {
            if(sizeof($generica->nivel_generica_asignaturas) > 0)
            {
                foreach ($generica->nivel_generica_asignaturas as $key => $nivel_generica_asignatura) {
                    $asignaturas_2[$i] = $nivel_generica_asignatura->asignatura;
                    $i = $i + 1;
                } 
            }
        }
        return array_values(array_unique(array_merge($asignaturas_1,$asignaturas_2)));
        // return array_unique(array_merge(array_unique($asignaturas_1),array_unique($asignaturas_2)));
            // foreach ($plan_niveles as $key => $plan_nivel) {
            //     if($i == 0){
            //         return $plan_nivel->nivel_competencia;
            //     }
            //     $i = $i + 1;
            // }
    }

    public function Asignaturas2()
    {
        $i = 0;
        $asignaturas_1 = [];
        $asignaturas_2 = [];
        $profesionales = $this->dominios()
        ->with(['competencias' => function ($query) {
            $query
            ->with(['nivel_competencias' => function ($query) {
                $query
                ->with(['nivel_competencia_asignaturas' => function ($query) {
                    $query
                    ->with(['asignatura' => function ($query) {
                        $query
                        ->with('nivel_competencia_asignaturas')
                        ->with('nivel_generica_asignaturas');
                    }]);
                }]);
            }]);
        }])
        ->get();
        $genericas = $this->nivel_genericas()
        ->with(['nivel_generica_asignaturas' => function ($query) {
            $query
            ->with(['asignatura' => function ($query) {
                $query
                ->with('nivel_competencia_asignaturas')
                ->with('nivel_generica_asignaturas');
            }]);
        }])
        ->get();
        foreach ($profesionales as $key => $profesional) {
            foreach ($profesional->competencias as $key => $competencia) {
                foreach ($competencia->nivel_competencias as $key => $nivel_competencia) {
                    if(sizeof($nivel_competencia->nivel_competencia_asignaturas) > 0)
                    {
                        foreach ($nivel_competencia->nivel_competencia_asignaturas as $key => $nivel_competencia_asignatura) {
                            $asignaturas_1[$i] = $nivel_competencia_asignatura->asignatura;
                            $i = $i + 1;
                        }
                    }
                }
            }
        }
        $i = 0;
        foreach ($genericas as $key => $generica) {
            if(sizeof($generica->nivel_generica_asignaturas) > 0)
            {
                foreach ($generica->nivel_generica_asignaturas as $key => $nivel_generica_asignatura) {
                    $asignaturas_2[$i] = $nivel_generica_asignatura->asignatura;
                    $i = $i + 1;
                } 
            }
        }
        return array_values(array_unique(array_merge($asignaturas_1,$asignaturas_2)));
        // return array_unique(array_merge(array_unique($asignaturas_1),array_unique($asignaturas_2)));
            // foreach ($plan_niveles as $key => $plan_nivel) {
            //     if($i == 0){
            //         return $plan_nivel->nivel_competencia;
            //     }
            //     $i = $i + 1;
            // }
    }
}
