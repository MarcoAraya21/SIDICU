<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Dominio;

class DominioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Dominio = Dominio::all();
        return $Dominio->toJson();
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
        $Dominio = Dominio::create($request->all());
        $Dominio = Dominio::with('tipo_dominio')->findOrFail($Dominio->id);
        return response()->json($Dominio, 201);

        // $SolicitudGasto = SolicitudGasto::with(['gasto_conceptos' => function ($query){
        //     $query 
        //     ->with(['conformidades' => function ($query) {
        //         $query
        //         ->with('contratacion')
        //         ->with(['ultimo_estado_conformidad' => function ($query) {
        //             $query
        //             ->with('estado');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Dominio = Dominio::
            findOrFail($id);
        return $Dominio->toJson();
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
    public function update(Request $request, Dominio $Dominio)
    {
        $Dominio = $Dominio->update($request->all());
        return response()->json($Dominio, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Dominio = Dominio::find($id);
        $Dominio->competencias()->delete();
        $Dominio->delete();
    }

}
