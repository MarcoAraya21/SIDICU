<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CompetenciaEvaluacion;

class CompetenciaEvaluacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        $CompetenciaEvaluacion = CompetenciaEvaluacion::create($request->all());
        return response()->json($CompetenciaEvaluacion, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   
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
    public function update(Request $request, CompetenciaEvaluacion $CompetenciaEvaluacion)
    {

        $CompetenciaEvaluacion = $CompetenciaEvaluacion->update($request->all());
        return response()->json($CompetenciaEvaluacion, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $CompetenciaEvaluacion = CompetenciaEvaluacion::find($id);
        $CompetenciaEvaluacion->delete();
    }
}
