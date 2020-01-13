<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PlanEstudio;
use App\Competencia;

class PlanEstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $PlanEstudio = PlanEstudio::
        with(['dominios' => function ($query) {
            $query
            ->with(['competencias' => function ($query) {
                $query
                ->with(['nivel_competencias' => function ($query) {
                    $query
                    ->with('logro_aprendizajes');
                }]);
            }]);
        }])
        ->get();
        return $PlanEstudio->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $this->validate($request, [
            'nombre' => 'required',
            'observacion' => 'required',
            'carrera_id' => 'required|numeric|min:1',
            'tipo_plan_id' => 'required|numeric|min:1',
            'tipo_ingreso_id' => 'required|numeric|min:1',
            
        ]);

        $PlanEstudio = PlanEstudio::create($request->all());
        for ($i=0; $i <= 1  ; $i++) {
            $PlanEstudio->dominios()->create(['tipo_dominio_id' => 1, 'nombre' => 'Sin Nombre']);
        }
        // $PlanEstudio->dominios()->create(['tipo_dominio_id' => 2]);
        $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->uic_id,'rol_id' => 1]);
        $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->academico_id,'rol_id' => 2]);
        $PlanEstudio->niveles()->create(['nombre'=> 1]);

        $competencias = Competencia::where('dominio_id', 1)->get();
        $i = 0;
        foreach ($competencias as $key => $competencia) {
            if($i < 4)
            {
                $nivel_competencias = $competencia->nivel_competencias()->get();
                foreach ($nivel_competencias as $key => $nivel_competencia) {
                    $PlanEstudio->nivel_genericas()->create(['nivel_competencia_id' => $nivel_competencia['id']]);
                }
            }
            $i = $i + 1;
        }
        return response()->json($PlanEstudio, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $PlanEstudio = PlanEstudio::
            with(['dominios' => function ($query) {
                $query
                ->with('tipo_dominio')
                ->with(['competencias' => function ($query) {
                    $query
                    ->with(['nivel_competencias' => function ($query) {
                        $query
                        ->with('logro_aprendizajes')
                        ->with(['nivel_competencia_asignaturas' => function ($query) {
                            $query
                            ->with('asignatura')
                            ->with('competencia_evaluaciones');
                        }]);
                    }]);
                }]);
            }])
            ->with('carrera')
            ->with('tipo_plan')
            ->with('tipo_ingreso')
            ->with(['plan_estudio_usuarios' => function ($query) {
                $query
                ->with('usuario');
            }])
            ->with('niveles')
            ->findOrFail($id);
        return $PlanEstudio->toJson();
    }


    public function datos($id)
    {
        $PlanEstudio = PlanEstudio::
            with(['dominios' => function ($query) {
                $query
                 ->with(['competencias' => function ($query) {
                    $query
                    ->with(['nivel_competencias' => function ($query) {
                        $query
                        ->with('logro_aprendizajes');
                    }]);
                }]);
            }])
            ->findOrFail($id);
        $auxiliar = $PlanEstudio->dominios;
        // $auxiliar = [];

        $auxiliar = [];

        foreach ($PlanEstudio->dominios as $key => $dominio) {
            $casilla_logros_dominios = 0;
            $casilla_competencias = count($dominio->competencias);
            if($casilla_competencias == 0)
            {
                $casilla_competencias = 1;
            };
            $casilla_logros = [];
            foreach ($dominio->competencias as $key2 => $competencia) {
                $casilla_logros[$key2] = (object) ['id' => $competencia->id, 'casilla_logros' => 0];
                foreach ($competencia->nivel_competencias as $key3 => $nivel_competencia) {
                    $casilla_nivel_logros = count($nivel_competencia->logro_aprendizajes);
                    if($casilla_nivel_logros == 0)
                    {
                        $casilla_nivel_logros = 1;
                    }
                    $casilla_logros[$key2]->casilla_logros = $casilla_logros[$key2]->casilla_logros + $casilla_nivel_logros;
                    $casilla_logros_dominios = $casilla_logros_dominios + $casilla_nivel_logros;
                };
            };

            $auxiliar[$key] = (object) ['id' => $dominio->id, 'count_competencias' => $casilla_competencias, 'competencias' => $casilla_logros, 'casilla_logros' => $casilla_logros_dominios];
            // $casilla = count($element->competencias);
            // if($casilla == 0)
            // {
            //     $casilla = 1;
            // }
            // $auxiliar[$key] = object('nombre' => $element->id, '2');
        }

        // $auxiliar[0] =
        
        return $auxiliar;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PlanEstudio $PlanEstudio)
    {
        $this->validate($request, [
            'proposito' => 'required',
            'objetivo' => 'required',
            'requisito_admision' => 'required',
            'mecanismo_retencion' => 'required',
            'requisito_obtencion' => 'required',
            'campo_desarrollo' => 'required'
        ]);
        
        $PlanEstudio = $PlanEstudio->update($request->all());
        return response()->json($PlanEstudio, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $PlanEstudio = PlanEstudio::find($id);
        // $Dominios = $PlanEstudio->dominios()->get();
        // foreach ($Dominios as $key => $dominio) {
        //     $dominio->competencias()->delete();
        // }
        // // $Dominios->delete();
        // $PlanEstudio->dominios()->delete();
        $PlanEstudio->delete();
    }

}
