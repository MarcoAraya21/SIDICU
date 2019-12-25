<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Competencia;

class CompetenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Competencia = Competencia::all();
        return $Competencia->toJson();
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

        $Competencia = Competencia::create($request->all());
        for ($i=1; $i <= 3  ; $i++) {
            $Competencia->nivel_competencias()->create(['nivel' => $i, 'descripcion' => 'Sin Nombre']);
        }

        with(['nivel_competencias' => function ($query) {
            $query
            ->with('logro_aprendizajes');
        }]);
        $Competencia = Competencia::with(['nivel_competencias' => function ($query) {
            $query
            ->with('logro_aprendizajes')
            ->with('nivel_competencia_asignaturas');
        }])->findOrFail($Competencia->id);
        return response()->json($Competencia, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Competencia = Competencia::
            findOrFail($id);
        return $Competencia->toJson();
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
    public function update(Request $request, Competencia $Competencia)
    {
        $Competencia = $Competencia->update($request->all());
        return response()->json($Competencia, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Competencia = Competencia::find($id);
        // $NivelCompetencias = $Competencia->nivel_competencias()->get();
        // foreach ($NivelCompetencias as $key => $NivelCompetencia) {
        //     $NivelCompetencia->nivel_competencias()->delete();
        // }
        // $Dominio->competencias()->delete();
        // $Dominio->delete();

        $Competencia->delete();
    }


}
