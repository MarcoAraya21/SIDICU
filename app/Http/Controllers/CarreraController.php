<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Carrera;


class CarreraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $carreras = Carrera::with('escuela')->with('grado')->where('estado_id', 4)->get();
        return $carreras->toJson();
    }

    public function allCarreras()
    {
        $carreras = Carrera::with('escuela')->with('grado')->get();
        return $carreras->toJson();
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
        $this->validate($request, [
            'nombre' => 'required',
            'titulo' => 'required',
            'escuela_id' => 'required|numeric|min:1',
            'grado_id' => 'required|numeric|min:1',
            'tipo_grado_id' => 'required|numeric|min:1',
        ]);
        $request['estado_id'] = 1;
        $Carrera = Carrera::Create($request->all());
        return response()->json($Carrera, 201);
    }

    public function crearCarrera(Request $request)
    {
        $request['estado_id'] = 1;
        if($request->nombre == "")
        {
            $request['nombre'] = "Sin Nombre";
        }
        $Carrera = Carrera::Create($request->all());
        return response()->json($Carrera, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $carrera = Carrera::
            with('grado')
            ->with(['escuela' => function ($query) {
                $query
                ->with('facultad');
            }])
            ->findOrFail($id);
        return $carrera->toJson();
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
    public function update(Request $request, Carrera $Carrera)
    {
        if($Carrera = $Carrera->update($request->all()))
        {
            return response()->json(Carrera::with('escuela')->with('grado')->get()->find($request->id), 201);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Carrera = Carrera::find($id);
        try{
            $Carrera->delete();
        }
        catch(\Illuminate\Database\QueryException $e){
            abort(400, 'No Permitido');
        }
        return response(null, 204);
    }
}
