<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

    public function misPendientes()
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $usuario_id = JWTAuth::toUser($token)->id;
        // $PlanEstudio = PlanEstudioUsuario::where([['usuario_id', $usuario_id], ['rol_id', 1]])->plan_estudio()->where('estado_id', 1)->get();
        // $PlanEstudio = PlanEstudio::where('estado_id', 1)->plan_estudio_usuarios()->where('usuario_id',$usuario_id);
        $PlanEstudio = Usuario::find($usuario_id)->plan_estudios()->where('estado_id', 1)->get();
        // ->get();
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
        $PlanEstudio = Usuario::find($usuario_id)->plan_estudios()->where('estado_id', 2)->get();
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
                'observacion' => 'required',
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
    public function show($id)
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $usuario_id = JWTAuth::toUser($token)->id;
        $acceso = 'denegado';
        $PlanEstudioUsuarios = PlanEstudio::with('plan_estudio_usuarios')->findOrFail($id)->plan_estudio_usuarios;
        foreach ($PlanEstudioUsuarios as $key => $PlanEstudioUsuario) {
            if($PlanEstudioUsuario->usuario_id == $usuario_id)
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
                return response()->json([$PlanEstudio, $PlanEstudioUsuario->rol_id], 200);
            }
        }
        return response()->json(['error' => 'Acceso no permitido.'],403);
    }



    public function store(Request $request)
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $perfil_id = JWTAuth::toUser($token)->perfil_id;
        if($perfil_id == 1 || $perfil_id == 2)
        {
            $PlanEstudio = PlanEstudio::create(['estado_id' => 1]);
            $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id' => $request->usuario_id, 'rol_id' => 1]);
            return response()->json($PlanEstudio, 201);
        }
        else
        {
            return response()->json(['status'=>'danger','message'=>'Acceso Denegado']);
        }
        


        // $PlanEstudio = PlanEstudio::create($request->all());
        // for ($i=0; $i <= 1  ; $i++) {
        //     $PlanEstudio->dominios()->create(['tipo_dominio_id' => 1, 'nombre' => 'Sin Nombre']);
        // }
        // // $PlanEstudio->dominios()->create(['tipo_dominio_id' => 2]);
        // $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->uic_id,'rol_id' => 1]);
        // $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->academico_id,'rol_id' => 2]);
        // $PlanEstudio->niveles()->create(['nombre'=> 1]);

        // $competencias = Competencia::where('dominio_id', 1)->get();
        // $i = 0;
        // foreach ($competencias as $key => $competencia) {
        //     if($i < 4)
        //     {
        //         $nivel_competencias = $competencia->nivel_competencias()->get();
        //         foreach ($nivel_competencias as $key => $nivel_competencia) {
        //             $PlanEstudio->nivel_genericas()->create(['nivel_competencia_id' => $nivel_competencia['id']]);
        //         }
        //     }
        //     $i = $i + 1;
        // }
        // return response()->json($PlanEstudio, 201);

    }

    public function getInformacionBasica($id)
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $usuario_id = JWTAuth::toUser($token)->id;
        // $PlanEstudio = PlanEstudioUsuario::where([['usuario_id', $usuario_id], ['rol_id', 1]])->plan_estudio()->where('estado_id', 1)->get();
        // $PlanEstudio = PlanEstudio::where('estado_id', 1)->plan_estudio_usuarios()->where('usuario_id',$usuario_id);
        $PlanEstudio = Usuario::find($usuario_id)->plan_estudio_usuarios()->where('plan_estudio_id', $id)->get();
        if(count($PlanEstudio) == 1)
        {
            $PlanEstudio = PlanEstudio::findOrFail($id);
            if($PlanEstudio->estado_id == 1)
            {
                // return response()->json(['status'=>'success','plan'=>$PlanEstudio]);
                return response()->json(['status'=>'success']);
            }
            else
            {
                return response()->json(['status'=>'warning','message'=>'Ya ha validado este plan.']);
            }
        }
        else
        {
            if(count($PlanEstudio) == 0)
            {
                return response()->json(['status'=>'danger','message'=>'Acceso Denegado']);
            }
        }
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
            'academico_id' => 'required|numeric|min:1'
        ]);

        $academico_id = $request['academico_id'];

        $PlanEstudio = $PlanEstudio->find($id);
        if($PlanEstudio->estado_id == 1)
        {
            $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id' => $academico_id, 'rol_id' => 2]);

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
                "tipo_ingreso_id" => 1,
                "estado_id" => 2
            ]);
            return response()->json($id, 201);
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
