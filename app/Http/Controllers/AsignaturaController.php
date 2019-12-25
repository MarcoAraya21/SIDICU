<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asignatura;
use App\PlanEstudio;

class AsignaturaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Asignatura = Asignatura::all();
        return $Asignatura->toJson();
    }

    public function AsignaturaPlan($plan_id)
    {
        $PlanEstudio = PlanEstudio::all();
        return $PlanEstudio->toJson();
    }
}
