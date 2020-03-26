<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanEstudio extends Model
{
    protected $fillable = ['nombre', 'observacion', 'proposito', 'objetivo', 'requisito_admision', 'mecanismo_retencion', 'requisito_obtencion', 'campo_desarrollo', 'nueva_oferta', 'perfil_egresado', 'perfil_licenciado', 'titulo_intermedio', 'minor', 'diploma',
                            'carrera_id', 'tipo_plan_id', 'tipo_ingreso_id', 'estado_id', 'modalidad_id', 'regimen_id', 'tipo_formacion_id', 'jornada_id'];
    protected $appends = ['competencias_genericas', 'asignaturas', 'sct_totales', 'asesor_uic', 'coordinador'];


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
    public function modalidad()
    {
        return $this->belongsTo('App\Modalidad');
    }
    public function regimen()
    {
        return $this->belongsTo('App\Regimen');
    }
    public function tipo_formacion()
    {
        return $this->belongsTo('App\TipoFormacion');
    }
    public function jornada()
    {
        return $this->belongsTo('App\Jornada');
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
                    ->with('logro_aprendizajes');
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
        $niveles = $this->niveles()->with(['asignaturas' => function ($query) {
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
            ->with(['asignatura_evaluaciones' => function ($query) {
                $query
                ->with('evaluacion');
            }])
            ->with(['asignatura_metodologias' => function ($query) {
                $query
                ->with('metodologia');
            }]);
        }])->get();
        $asignaturas = [];
        $i = 0;
        foreach ($niveles as $key => $nivel) {
            foreach ($nivel->asignaturas as $key => $asignatura) {
                $asignaturas[$i] = $asignatura;
                $i = $i + 1;
            }
        }
        return $asignaturas;
    }

    public function getSctTotalesAttribute()
    {
        $niveles = $this->niveles()->with(['asignaturas' => function ($query) {
            $query
            ->with('asignatura_horas');
            }])->get();
        $Sct_totales = 0;
        foreach ($niveles as $key => $nivel) {
            foreach ($nivel->asignaturas as $key => $asignatura) {
                foreach ($asignatura->asignatura_horas as $key => $asignatura_hora) {
                    $Sct_totales = $Sct_totales + $asignatura_hora->cantidad;
                }
            }
        }
        return $Sct_totales/2;
    }

    public function getAsesorUicAttribute()
    {
        $plan_usuarios = $this->plan_estudio_usuarios()->where('rol_id', 1)->with('usuario')->get();
        
        foreach ($plan_usuarios as $key => $plan_usuario) {
            return $plan_usuario->usuario;
        }
    }

    public function getCoordinadorAttribute()
    {
        $plan_usuarios = $this->plan_estudio_usuarios()->where('rol_id', 2)->with('usuario')->get();
        
        foreach ($plan_usuarios as $key => $plan_usuario) {
            return $plan_usuario->usuario;
        }
    }

    public function scopeAcceso($usuario_id)
    {
        $acceso = $this->plan_estudio_usuarios()->where('usuario_id', $usuario_id)->get();
        return $acceso; 
        // foreach ($plan_usuarios as $key => $plan_usuario) {
        //     return $plan_usuario->usuario;
        // }
        // return $this->plan_estudio_usuarios()->join('plan_estudios', 'plan_estudios.id', '=', 'plan_estudio_usuarios.plan_estudio_id')
        // ->select('plan_estudio_usuarios.*')
        // ->where('plan_estudios.estado_id', '!=', 4)
        // ->count();
    }
}