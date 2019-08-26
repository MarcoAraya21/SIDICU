<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PlanEstudio;

class PlanEstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $PlanEstudio = PlanEstudio::
        with(['dominios' => function ($query) {
            $query
            ->with('competencias');
        }])
        ->get();
        return $PlanEstudio->toJson();
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
        //dd($request);
        $this->validate($request, [
            'nombre' => 'required',
            'observacion' => 'required',
            'carrera_id' => 'required|numeric|min:1',
            'tipo_plan_id' => 'required|numeric|min:1',
            'tipo_ingreso_id' => 'required|numeric|min:1',
            
        ]);

        $PlanEstudio = PlanEstudio::create($request->all());
        for ($i=0; $i <= 1  ; $i++) {
            $PlanEstudio->dominios()->create(['tipo_dominio_id' => 1]);
        }
        $PlanEstudio->dominios()->create(['tipo_dominio_id' => 2]);
        $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->uic_id,'rol_id' => 1]);
        $PlanEstudio->plan_estudio_usuarios()->create(['usuario_id'=> $request->academico_id,'rol_id' => 2]);
        return response()->json($PlanEstudio, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $PlanEstudio = PlanEstudio::
            with(['dominios' => function ($query) {
                $query
                ->with('tipo_dominio')
                ->with(['competencias' => function ($query) {
                    $query
                    ->with('nivel_competencias');
                }]);
            }])
            ->with('carrera')
            ->with('tipo_plan')
            ->with('tipo_ingreso')
            ->with(['plan_estudio_usuarios' => function ($query) {
                $query
                ->with('usuario');
            }])
            ->findOrFail($id);
        return $PlanEstudio->toJson();
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
    public function update(Request $request, PlanEstudio $PlanEstudio)
    {
        $this->validate($request, [
            'proposito' => 'required',
            'objetivo' => 'required',
            'requisito_admision' => 'required',
            'mecanismo_retencion' => 'required',
            'requisito_obtencion' => 'required',
            'campo_desarrollo' => 'required'
        ]);
        
        $PlanEstudio = $PlanEstudio->update($request->all());
        return response()->json($PlanEstudio, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $PlanEstudio = PlanEstudio::find($id);
        $Dominios = $PlanEstudio->dominios()->get();
        foreach ($Dominios as $key => $dominio) {
            $dominio->competencias()->delete();
        }
        // $Dominios->delete();
        $PlanEstudio->dominios()->delete();
        $PlanEstudio->delete();
    }

}
