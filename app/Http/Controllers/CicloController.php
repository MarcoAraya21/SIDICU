<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ciclo;

class CicloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Ciclo = Ciclo::all();
        return $Ciclo->toJson();
    }
}
