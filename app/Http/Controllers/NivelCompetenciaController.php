<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NivelCompetencia;

class NivelCompetenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $NivelCompetencia = NivelCompetencia::all();
        return $NivelCompetencia->toJson();
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
        $request['descripcion'] = 'Sin Nombre';
        $NivelCompetencia = NivelCompetencia::create($request->all());
        $NivelCompetencia = NivelCompetencia::with('logro_aprendizajes')->with('asignaturas')->findOrFail($NivelCompetencia->id);
        return response()->json($NivelCompetencia, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $NivelCompetencia = NivelCompetencia::
            findOrFail($id);
        return $NivelCompetencia->toJson();
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
    public function update(Request $request, NivelCompetencia $NivelCompetencia)
    {
        $NivelCompetencia = $NivelCompetencia->update($request->all());
        return response()->json($NivelCompetencia, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $NivelCompetencia = NivelCompetencia::find($id);
        $NivelCompetencia->delete();
    }


}
