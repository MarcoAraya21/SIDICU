<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PlanEstudio;
use App\Http\Controllers\PlanEstudioController;

class WordController extends Controller
{



    public function wordview($id)
    {
        $PlanEstudio = json_decode(app('App\Http\Controllers\PlanEstudioController')->show($id,true));
        $Ciclos = json_decode(app('App\Http\Controllers\CicloController')->index());

        return view('word.invoice', compact('PlanEstudio', 'Ciclos'));

    }


    public function pdfasignatura($id)
    {
        $PlanEstudio = json_decode(app('App\Http\Controllers\PlanEstudioController')->show($id,true));
        $pdf = PDF::loadView('pdf.asignatura',compact('PlanEstudio'));
        return $pdf->download('asignatura.pdf');
    }

    public function worddiseño($id)
    {
        $PlanEstudio = json_decode(app('App\Http\Controllers\PlanEstudioController')->show($id,true));
        return view('word.diseño', compact('PlanEstudio'));

    }

    public function wordmalla($id)
    {
        $PlanEstudio = json_decode(app('App\Http\Controllers\PlanEstudioController')->show($id,true));
        return view('word.malla', compact('PlanEstudio'));
    }
    

}
