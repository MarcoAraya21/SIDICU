<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\PlanEstudio;
use App\Competencia;
use JWTAuth;
use App\Usuario;
use App\PlanEstudioUsuario;
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

    public function listado()
    {
        $PlanEstudio = PlanEstudio::where('estado_id', '!=', 4)
        ->get();
        return $PlanEstudio->toJson();
    }

    public function finalizado($id)
    {
        if($PlanEstudio = PlanEstudio::find($id))
        {
            if($PlanEstudio->estado_id == "4")
            {
                $PlanEstudio = $PlanEstudio->with(['dominios' => function ($query) {
                        $query
                        ->with('tipo_dominio')
                        ->with(['competencias' => function ($query) {
                            $query
                            ->with(['nivel_competencias' => function ($query) {
                                $query
                                ->with('logro_aprendizajes')
                                ->with(['nivel_competencia_asignaturas' => function ($query) {
                                    $query
                                    ->with('asignatura');
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
                    ->with('nivel_genericas')
                    ->with('tipo_formacion')
                    ->findOrFail($id);
                return $PlanEstudio->toJson();
            }
            else
            {
                return response()->json(['status'=>'danger','message'=>'Acceso Denegado']);
            }
        }
        else
        {
            return response()->json(['status'=>'danger','message'=>'Acceso Denegado']);
        }
    }

    public function finalizados()
    {
        $PlanEstudio = PlanEstudio::where('estado_id', 4)
        ->get();
        return $PlanEstudio->toJson();
    }

    public function misPlanes()
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $usuario_id = JWTAuth::toUser($token)->id;
        // $PlanEstudio = PlanEstudioUsuario::where([['usuario_id', $usuario_id], ['rol_id', 1]])->plan_estudio()->where('estado_id', 1)->get();
        // $PlanEstudio = PlanEstudio::where('estado_id', 1)->plan_estudio_usuarios()->where('usuario_id',$usuario_id);
        $PlanEstudio = Usuario::find($usuario_id)->plan_estudios()->whereIn('estado_id', [2, 3])->get();
        // ->get();
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
    public function createPlanAdm(Request $request)
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $perfil_id = JWTAuth::toUser($token)->perfil_id;
        $id = JWTAuth::toUser($token)->id;
        $request["regimen_id"] = 1;
        $request["tipo_ingreso_id"] = 1;
        $request["estado_id"] = 2;
        if($perfil_id == 1)
        {
            $this->validate($request, [
                'nombre' => 'required',
                'tipo_formacion_id' => 'required|numeric|min:1',  
                'carrera_id' => 'required|numeric|min:1',
                'tipo_plan_id' => 'required|numeric|min:1',
                'jornada_id' => 'required|numeric|min:1',
                'modalidad_id' => 'required|numeric|min:1',
                'academico_id' => 'required|numeric|min:1'
            ]);
            
            $PlanEstudio = PlanEstudio::create($request->all());

            $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $id,'rol_id' => 1]);
            $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->academico_id,'rol_id' => 2]);

            for ($i=0; $i <= 1  ; $i++) {
                $PlanEstudio->dominios()->create(['tipo_dominio_id' => 1, 'nombre' => 'Sin Nombre']);
            }

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
            return response()->json($PlanEstudio->id, 201);
        }
        else
        {
            return response()->json(['status'=>'danger','message'=>'Acceso Denegado']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editar($id)
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $usuario = JWTAuth::toUser($token);
        $acceso = 'denegado';
        if($usuario->perfil_id == 1)
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
                                    ->with('asignatura');
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
                    ->with('nivel_genericas')
                    ->with('tipo_formacion')
                    ->findOrFail($id);
            if($PlanEstudio->estado_id == 2)
            {
                return response()->json([$PlanEstudio, 1], 200);
            }
        }
        else
        {
            $PlanEstudioUsuarios = PlanEstudio::with('plan_estudio_usuarios')->findOrFail($id)->plan_estudio_usuarios;
            foreach ($PlanEstudioUsuarios as $key => $PlanEstudioUsuario) {
                if($PlanEstudioUsuario->usuario_id == $usuario->id)
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
                                        ->with('asignatura');
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
                        ->with('nivel_genericas')
                        ->with('tipo_formacion')
                        ->findOrFail($id);
                    if($PlanEstudio->estado_id == 2)
                    {
                        return response()->json([$PlanEstudio, $PlanEstudioUsuario->rol_id], 200);
                    }
                }
            }
        }
        return response()->json(['error' => 'Acceso no permitido.'],403);
    }

    public function ver($id)
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
                            ->with('asignatura');
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
            ->with('nivel_genericas')
            ->with('tipo_formacion')
            ->findOrFail($id);
        return response()->json($PlanEstudio, 200);
    }

    // FINALIZADOS
    Public function show($id, $pdf = false)
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
                            ->with('asignatura');
                        }]);
                    }]);
                }]);
            }])
            ->with(['carrera' => function ($query){
                $query
                ->with('grado');
            }])
            ->with('tipo_plan')
            ->with('tipo_ingreso')
            ->with(['plan_estudio_usuarios' => function ($query) {
                $query
                ->with('usuario');
            }])
            ->with('niveles')
            ->with('nivel_genericas')
            ->with('tipo_formacion')
            ->with('jornada')
            ->with('modalidad')
            ->findOrFail($id);
        if ($pdf)
        {
            return $PlanEstudio;
        }
        else{
            return response()->json($PlanEstudio, 200);
        }
    }

    public function store(Request $request)
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $perfil_id = JWTAuth::toUser($token)->perfil_id;
        $id = JWTAuth::toUser($token)->id;
        $request["regimen_id"] = 1;
        $request["tipo_ingreso_id"] = 1;
        $request["estado_id"] = 2;
        if($perfil_id == 1)
        {
            $this->validate($request, [
                'nombre' => 'required',
                'tipo_formacion_id' => 'required|numeric|min:1',  
                'carrera_id' => 'required|numeric|min:1',
                'tipo_plan_id' => 'required|numeric|min:1',
                'jornada_id' => 'required|numeric|min:1',
                'modalidad_id' => 'required|numeric|min:1',
                'asesor_id' => 'required|numeric|min:1',
                'academico_id' => 'required|numeric|min:1'
            ]);
            
            $PlanEstudio = PlanEstudio::create($request->all());

            $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->asesor_id,'rol_id' => 1]);
            $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->academico_id,'rol_id' => 2]);

            for ($i=0; $i <= 1  ; $i++) {
                $PlanEstudio->dominios()->create(['tipo_dominio_id' => 1, 'nombre' => 'Sin Nombre']);
            }

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
            return response()->json($PlanEstudio->id, 201);
        }
        else
        {
            return response()->json(['status'=>'danger','message'=>'Acceso Denegado']);
        }

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
            if($casilla_logros_dominios == 0)
            {
                $casilla_logros_dominios = 1;
            }
            $auxiliar[$key] = (object) ['id' => $dominio->id, 'casilla_competencias' => $casilla_competencias, 'competencias' => $casilla_logros, 'casilla_logros' => $casilla_logros_dominios];
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
        // $this->validate($request, [
        //     'proposito' => 'required',
        //     'objetivo' => 'required',
        //     'requisito_admision' => 'required',
        //     'mecanismo_retencion' => 'required',
        //     'requisito_obtencion' => 'required',
        //     'campo_desarrollo' => 'required'
        // ]);
        
        $PlanEstudio = $PlanEstudio->update($request->all());
        return response()->json($PlanEstudio, 201);
    }

    public function finalizar(Request $request, PlanEstudio $PlanEstudio, $id)
    {
        $PlanEstudio = $PlanEstudio->find($id);
        $PlanEstudio = $PlanEstudio->update(['estado_id' => 3]);
        return response()->json($PlanEstudio, 201);
    }

    public function revisar(Request $request, PlanEstudio $PlanEstudio, $id)
    {
        $PlanEstudio = $PlanEstudio->find($id);
        if($request[0] == "aprobar")
        {
            $PlanEstudio = $PlanEstudio->update(['estado_id' => 4]);
        }
        if($request[0] == "rechazar")
        {
            $PlanEstudio = $PlanEstudio->update(['estado_id' => 2]);
        }
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
        $PlanEstudio->delete();
    }

    public function getInformacionBasica($id)
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $usuario = JWTAuth::toUser($token);
        if($usuario->perfil_id == 1 || $usuario->perfil_id == 2)
        {
            $PlanEstudio = PlanEstudio::with("carrera")->findOrFail($id);

            return response()->json($PlanEstudio, 200);
        }
        else
        {
            $PlanEstudioUsuarios = PlanEstudio::with('plan_estudio_usuarios')->findOrFail($id)->plan_estudio_usuarios;
            foreach ($PlanEstudioUsuarios as $key => $PlanEstudioUsuario) {
                if($PlanEstudioUsuario->usuario_id == $usuario->id)
                {
                    $PlanEstudio = PlanEstudio::with("carrera")->findOrFail($id);
        
                    return response()->json($PlanEstudio, 200);
                }
            }
        }
        return response()->json(['error' => 'Acceso no permitido.'],403);
        // if($PlanEstudio->estado_id == 2)
        // if($PlanEstudio->estado_id == 2)
        // {
        //     // return response()->json(['status'=>'success','plan'=>$PlanEstudio]);
        //     return response()->json(['status'=>'success']);
        // }
        // else
        // {
        //     return response()->json(['status'=>'warning','message'=>'Ya ha validado este plan.']);
        // }
    }

    public function updateInformacionBasica(Request $request, PlanEstudio $PlanEstudio, $id)
    {
        $this->validate($request, [
            'nombre' => 'required',
            'observacion' => 'required',
            'tipo_formacion_id' => 'required|numeric|min:1',  
            'carrera_id' => 'required|numeric|min:1',
            'tipo_plan_id' => 'required|numeric|min:1',
            'jornada_id' => 'required|numeric|min:1',
            'modalidad_id' => 'required|numeric|min:1',
            'asesor_id' => 'required|numeric|min:1',
            'academico_id' => 'required|numeric|min:1'
        ]);

        $asesor_id = $request['asesor_id'];
        $academico_id = $request['academico_id'];

        $PlanEstudio = $PlanEstudio->find($id);
        $PlanEstudioUsuarioUic = PlanEstudioUsuario::where('plan_estudio_id', $id)->where('rol_id', 1);
        $PlanEstudioUsuarioAcademico = PlanEstudioUsuario::where('plan_estudio_id', $id)->where('rol_id', 2);

        $PlanEstudioUsuarioUic->update(["usuario_id" => $asesor_id]);
        $PlanEstudioUsuarioAcademico->update(["usuario_id" => $academico_id]);

        $PlanEstudio = $PlanEstudio->update([
            "nombre" => $request['nombre'],
            "observacion" => $request['observacion'],
            "nueva_oferta" => $request['nueva_oferta'],
            "carrera_id" => $request['carrera_id'],
            "tipo_plan_id" => $request['tipo_plan_id'],
            "tipo_formacion_id" => $request['tipo_formacion_id'],
            "modalidad_id" => $request['modalidad_id'],
            "jornada_id" => $request['jornada_id'],
            "titulo_intermedio" => $request['titulo_intermedio'],
            "minor" => $request['minor'],
            "diploma" => $request['diploma'],
            "regimen_id" => 1,
            "tipo_ingreso_id" => 1
        ]);
        return response()->json($id, 201);        
    }


    public function indicadores()
    {
        $indicadores = [];
        $indicadores["EnProceso"] = PlanEstudio::where("estado_id", 2)->count();
        $indicadores["EnRevision"] = PlanEstudio::where("estado_id", 3)->count();
        $indicadores["Finalizados"] = PlanEstudio::where("estado_id", 4)->count();
        $indicadores["sinGenericas"] = [];
        foreach (PlanEstudio::get() as $key => $plan) {
            if(sizeof($plan->competencias_genericas) == 0)
            {
                array_push($indicadores["sinGenericas"], (object) ['id' => $plan->id, 'nombre' => $plan->nombre, 'asesor' => $plan->asesor_uic->nombre." ".$plan->asesor_uic->apellido_paterno]);
            }

        }
        $indicadores["CompetenciaMasUsada"] = DB::table('nivel_genericas as ng')
        ->select('c.id', 'c.descripcion', DB::raw('count(*) as total'))
        ->leftJoin('nivel_competencias as nc', 'ng.nivel_competencia_id', '=', 'nc.id')
        ->leftJoin('competencias as c', 'nc.competencia_id', '=', 'c.id')
        ->groupBy('c.id', 'c.descripcion')
        ->first();
        $indicadores["MetodologiaMasUsada"] = DB::table('asignatura_metodologias as am')
        ->select('m.id', 'm.nombre', DB::raw('count(*) as total'))
        ->leftJoin('metodologias as m', 'am.metodologia_id', '=', 'm.id')
        ->groupBy('m.id','m.nombre')
        ->first();
        $indicadores["EvaluacionMasUsada"] = DB::table('asignatura_evaluaciones as ae')
        ->select('e.id', 'e.nombre', DB::raw('count(*) as total'))
        ->leftJoin('evaluaciones as e', 'ae.evaluacion_id', '=', 'e.id')
        ->groupBy('e.id','e.nombre')
        ->first();


        $sub_query = DB::table('plan_estudios as p')
        ->select('p.id as plan_id', 'c.id as competencia_id', 'c.descripcion', 'c.sigla')
        ->leftJoin('nivel_genericas as ng', 'ng.plan_estudio_id', '=', 'p.id')
        ->leftJoin('nivel_competencias as nc', 'ng.nivel_competencia_id', '=', 'nc.id')
        ->rightJoin('competencias as c', 'nc.competencia_id', '=', 'c.id')
        ->whereRaw('c.dominio_id = 1')
        ->distinct();

        $indicadores["UsoCompetencias"] = DB::table( DB::raw("({$sub_query->toSql()}) as t") )
        ->select('competencia_id', 'descripcion', 'sigla', DB::raw('(count(*) - sum(case when plan_id is null then 1 else 0 end)) as total '))
        ->groupBy('competencia_id', 'descripcion', 'sigla')
        ->get();
        // $indicadores["UsoCompetencias"] = DB::table('(select distinct p.id, c.id, c.descripcion
        // from plan_estudios as p 
        // left join nivel_genericas as ng on p.id = ng.plan_estudio_id 
        // left join nivel_competencias as nc on ng.nivel_competencia_id = nc.id 
        // right join competencias as c on nc.competencia_id = c.id where c.dominio_id = 1) as t')
        // ->select('competencia_id', 'descripcion', DB::raw('(count(*) - sum(case when plan_id is null then 1 else 0 end)) as total '))
        // ->groupBy('competencia_id', 'descripcion')
        // ->get();
        // select competencia_id, descripcion, (count(*) - sum(case when plan_id is null then 1 else 0 end)) as total 
        // from (select distinct p.id plan_id, c.id as competencia_id, c.descripcion 
        // from plan_estudios p 
        // left join nivel_genericas ng on p.id = ng.plan_estudio_id 
        // left join nivel_competencias nc on ng.nivel_competencia_id = nc.id 
        // right join competencias c on nc.competencia_id = c.id where c.dominio_id = 1) as t 
        // group by competencia_id
        return response()->json($indicadores, 200); 


        // $arreglo = [];
        // $proyectos = Proyecto::with('presupuesto_items')->get();
        // $indicadores = [];
        // $indicadores['monto_total_adjudicado'] = 0;
        // $indicadores['monto_L3'] = 0;
        // $indicadores['monto_L_1_2'] = 0;
        // $monto_linea3 = 0;
        // //calcula monto adjudicado total por cada proyecto
        // // foreach ($proyectos as $key => $proyecto) {
        // //     $arreglo[$proyecto->id] = 0;
        // //     foreach ($proyecto->presupuesto_items as $key => $presupuesto) {
        // //         $arreglo[$proyecto->id] = $presupuesto->monto_adjudicado + $arreglo[$proyecto->id];
        // //     }
        // // };

        // foreach ($proyectos as $key => $proyecto) {
        //     foreach ($proyecto->presupuesto_items as $key => $presupuesto) {
        //         $indicadores['monto_total_adjudicado'] += $presupuesto->monto_adjudicado;
        //         if($proyecto->base->concurso->sigla == "L3")
        //         {
        //             $indicadores['monto_L3'] += $presupuesto->monto_adjudicado;
        //         }
        //         else{
        //             $indicadores['monto_L_1_2'] += $presupuesto->monto_adjudicado;
        //         }
        //     }
        // };
        // //-------------------------------------------------------------//
        // $adjudicados = [];
        // $i = 0;

        // foreach ($proyectos as $key => $proyecto) {
        //     if($proyecto->adjudicado)
        //     {
        //         $adjudicados[$i] = $proyecto;
        //         $i = $i + 1;
        //     }
        // }        
        // $arreglo2 = json_decode(file_get_contents('../public/assets/doc_sistema/internos.json'));
        // $alladjudicados = array_merge($adjudicados, $arreglo2);
        // $año = [];
        // $facultad = [];
        // $j = 0;
        // foreach ($alladjudicados as $key => $adjudicado) {
        //     $año[$j] = $adjudicado->adjudicado;
        //     $facultad[$j] = $adjudicado->equipos[0]->departamento->facultad->sigla;
        //     $j = $j + 1;
        // }
        // // $indicadores['asd'] = $alladjudicados['adjudicado']; 
        // $indicadores['adjudicadosXaño'] = array_count_values($año);
        // $indicadores['facultades'] = array_count_values($facultad);
        // //-------------------------------------------------//
        // $añoext = [];
        // $z = 0;
        // foreach(json_decode(file_get_contents('../public/assets/doc_sistema/externos.json'))  as $key => $externo)
        // {
        //     if($externo->Año != 2011 and $externo->Año != 2012 and $externo->Año != 2013 and $externo->Año != 2019)
        //     {
        //         $añoext[$z] = $externo->Año;
        //         $z = $z + 1;
        //     }
        // }
        // $indicadores['adjudicadosXañoExt'] = array_count_values($añoext);
    }
}
