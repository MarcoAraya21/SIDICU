<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NivelCompetenciaAsignatura;
use App\Asignatura;

class NivelCompetenciaAsignaturaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $NivelCompetenciaAsignatura = NivelCompetenciaAsignatura::all();
        // return $NivelCompetenciaAsignatura->toJson();
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
        // dd($request);
        // $Asignatura = App\Asignatura::firstOrCreate([
        //     'provider_id' => $provider,
        //     'barcode' => $barcode,
        // ]);
        $NivelCompetenciaAsignatura = NivelCompetenciaAsignatura::firstOrCreate([
            'nivel_competencia_id' => $request->nivel_competencia_id,
            'asignatura_id' => $request->asignatura_id,
        ]);
        $NivelCompetenciaAsignatura = NivelCompetenciaAsignatura::with('asignatura')->findOrFail($NivelCompetenciaAsignatura->id);

        return response()->json($NivelCompetenciaAsignatura, 201);

        // $NivelCompetenciaAsignatura = NivelCompetenciaAsignatura::create($request->all());
        // $NivelCompetenciaAsignatura = NivelCompetenciaAsignatura::with('logro_aprendizajes')->with('nivel_competencia_NivelCompetenciaAsignaturas')->findOrFail($NivelCompetenciaAsignatura->id);
        // return response()->json($NivelCompetenciaAsignatura, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     $NivelCompetenciaAsignatura = NivelCompetenciaAsignatura::
    //         findOrFail($id);
    //     return $NivelCompetenciaAsignatura->toJson();
    // }

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
    // public function update(Request $request, NivelCompetenciaAsignatura $NivelCompetenciaAsignatura)
    // {
    //     $NivelCompetenciaAsignatura = $NivelCompetenciaAsignatura->update($request->all());
    //     return response()->json($NivelCompetenciaAsignatura, 201);
    // }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $NivelCompetenciaAsignaturas = NivelCompetenciaAsignaturas::where('asignatura_id', $idasignatura);
        // $NivelCompetenciaAsignaturas.length() = 0
        // {
        //     $Asignatura::find($idasignatura)->delete();
        // }
        $NivelCompetenciaAsignatura = NivelCompetenciaAsignatura::find($id);
        $NivelCompetenciaAsignatura->delete();
    }


}
