<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asignatura;
use App\PlanEstudio;

class AsignaturaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Asignatura = Asignatura::all();
        return $Asignatura->toJson();
    }

    public function planAsignaturas($id)
    {
        $PlanEstudio = PlanEstudio::find($id)->Asignaturas2();
        return $PlanEstudio;
    }

    public function store(Request $request)
    {
        if(!$request->nombre)
        {
            $request->nombre = 'Sin Nombre';
        }
        $Asignatura = Asignatura::create(['nombre' => $request->nombre]);
        for ($i=2; $i <= 5  ; $i++) {
            $Asignatura->asignatura_horas()->create(['tipo_hora_id' => $i]);
        }
        if($request->nivel_competencia_id)
        {
            $Asignatura->nivel_competencia_asignaturas()->create(['nivel_competencia_id' => $request->nivel_competencia_id]);
            $tipo_competencia = array('nivel_competencia_id' => $request->nivel_competencia_id);
        }
        else
        {
            if($request->nivel_generica_id)
            {
                $Asignatura->nivel_generica_asignaturas()->create(['nivel_generica_id' => $request->nivel_generica_id]);
                $tipo_competencia = array('nivel_generica_id' => $request->nivel_generica_id);

            }
        }
        // dd($request);
        // $Asignatura = Asignatura::create($request->all());
        // for ($i=2; $i <= 5  ; $i++) {
        //     $Asignatura->asignatura_horas()->create(['tipo_hora_id' => $i]);
        // }
        // return 201;  
        
        return response()->json([$Asignatura, $tipo_competencia], 201);

    }
}
