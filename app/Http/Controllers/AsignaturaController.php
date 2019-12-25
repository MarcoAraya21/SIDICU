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
        // dd($request);
        // $Asignatura = Asignatura::create($request->all());
        // for ($i=2; $i <= 5  ; $i++) {
        //     $Asignatura->asignatura_horas()->create(['tipo_hora_id' => $i]);
        // }
        return 201;
        // return response()->json($Asignatura, 201);

    }
}
