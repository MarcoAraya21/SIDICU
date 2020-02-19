<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NivelGenericaAsignatura;
use App\Asignatura;

class NivelGenericaAsignaturaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $NivelGenericaAsignatura = NivelGenericaAsignatura::all();
        // return $NivelGenericaAsignatura->toJson();
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
        $NivelGenericaAsignatura = NivelGenericaAsignatura::firstOrCreate([
            'nivel_generica_id' => $request->nivel_generica_id,
            'asignatura_id' => $request->asignatura_id,
        ]);
        $NivelGenericaAsignatura = NivelGenericaAsignatura::with('asignatura')->with(['nivel_generica' => function ($query) {
            $query
            ->with('nivel_competencia');
        }])->findOrFail($NivelGenericaAsignatura->id);

        return response()->json($NivelGenericaAsignatura, 201);
        // $NivelGenericaAsignatura = NivelGenericaAsignatura::create($request->all());
        // $NivelGenericaAsignatura = NivelGenericaAsignatura::with('logro_aprendizajes')->with('nivel_Generica_NivelGenericaAsignaturas')->findOrFail($NivelGenericaAsignatura->id);
        // return 201;
        // return response()->json($NivelGenericaAsignatura, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     $NivelGenericaAsignatura = NivelGenericaAsignatura::
    //         findOrFail($id);
    //     return $NivelGenericaAsignatura->toJson();
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
    // public function update(Request $request, NivelGenericaAsignatura $NivelGenericaAsignatura)
    // {
    //     $NivelGenericaAsignatura = $NivelGenericaAsignatura->update($request->all());
    //     return response()->json($NivelGenericaAsignatura, 201);
    // }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $NivelGenericaAsignaturas = NivelGenericaAsignaturas::where('asignatura_id', $idasignatura);
        // $NivelGenericaAsignaturas.length() = 0
        // {
        //     $Asignatura::find($idasignatura)->delete();
        // }
        $NivelGenericaAsignatura = NivelGenericaAsignatura::find($id);
        $NivelGenericaAsignatura->delete();
    }


}
