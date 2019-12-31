<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asignatura;
use App\PlanEstudio;
use app\NivelCompetenciaAsignatura;
use app\NivelGenericaAsignatura;

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
        if(!$request->nivel_id)
        {
            $request->nivel_id = 1;
        }
        $Asignatura = Asignatura::create(['nombre' => $request->nombre, 'nivel_id' => $request->nivel_id]);
        for ($i=1; $i <= 4  ; $i++) {
            $Asignatura->asignatura_horas()->create(['tipo_hora_id' => $i, 'cantidad' => 0]);
        }
        if($request->nivel_competencia_id)
        {
            $Asignatura->nivel_competencia_asignaturas()->create(['nivel_competencia_id' => $request->nivel_competencia_id]);
            $tipo_competencia = NivelCompetenciaAsignatura::where('nivel_competencia_id',$request->nivel_competencia_id)->where('asignatura_id',$Asignatura->id)->with('competencia_evaluaciones')->first();
        }
        else
        {
            if($request->nivel_generica_id)
            {
                $Asignatura->nivel_generica_asignaturas()->create(['nivel_generica_id' => $request->nivel_generica_id]);
                $tipo_competencia = NivelGenericaAsignatura::where('nivel_generica_id',$request->nivel_generica_id)->where('asignatura_id',$Asignatura->id)->with('generica_evaluaciones')->first();
            }
        }
        // dd($request);
        // $Asignatura = Asignatura::create($request->all());
        // for ($i=2; $i <= 5  ; $i++) {
        //     $Asignatura->asignatura_horas()->create(['tipo_hora_id' => $i]);
        // }
        // return 201;
        // $Asignatura = $Asignatura
        // $Asignatura = $Asignatura->refresh();
        $Asignatura = Asignatura::with(['nivel_competencia_asignaturas' => function ($query) {
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
            ->with('tipo_hora');
        }])
        ->with(['asignatura_metodologias' => function ($query) {
            $query
            ->with('metodologia');
        }])
        ->findOrFail($Asignatura->id);
        return response()->json([$Asignatura, $tipo_competencia], 201);

    }

    public function destroy($id)
    {
        $Asignatura = Asignatura::find($id);
        $Asignatura->delete();
    }
}
