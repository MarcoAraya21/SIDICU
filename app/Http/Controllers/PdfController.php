<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\PlanEstudio;
use App\Http\Controllers\PlanEstudioController;

class PdfController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }




    public function pdfview($id)
    {
        // Set extra option
    	//PDF::setOptions(['dpi' => 150, 'defaultFont' => 'sans-serif']);
        // pass view file
        $PlanEstudio = json_decode(app('App\Http\Controllers\PlanEstudioController')->show($id));



        // $PlanEstudio = PlanEstudio::
        // with('carrera')
        // ->with('tipo_plan')
        // ->with(['plan_estudio_usuarios' => function ($query){
        //     $query
        //     ->with('usuario');
        // }])
        // ->with('tipo_ingreso')
        // ->findOrFail($id);


        $pdf = PDF::loadView('pdf.invoice',compact('PlanEstudio'));
        // download pdf
        return $pdf->download('datos-iniciales.pdf');
        //return $pdf->stream('datos-iniciales');
    }


    public function pdfasignatura($id)
    {
        $Asignatura = json_decode(app('App\Http\Controllers\PlanEstudioController')->show($id));

        $pdf = PDF::loadView('pdf.asignatura',compact('Asignaruta'));
        // download pdf
        return $pdf->download('Aginatura.pdf');
        //return $pdf->stream('datos-iniciales');
    }


}
