<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\LogroAprendizaje;

class LogroAprendizajeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $LogroAprendizaje = LogroAprendizaje::all();
        return $LogroAprendizaje->toJson();
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
        $LogroAprendizaje = LogroAprendizaje::create($request->all());
        return response()->json($LogroAprendizaje, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $LogroAprendizaje = LogroAprendizaje::
            findOrFail($id);
        return $LogroAprendizaje->toJson();
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
    public function update(Request $request, LogroAprendizaje $LogroAprendizaje)
    {
        $LogroAprendizaje = $LogroAprendizaje->update($request->all());
        return response()->json($LogroAprendizaje, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $LogroAprendizaje = LogroAprendizaje::find($id);
        $LogroAprendizaje->delete();
    }


}
