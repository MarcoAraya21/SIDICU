<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Perfil;
use App\Http\Requests;
use App\Http\Controllers\Controller;


class PerfilController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

            $perfiles = Perfil::where('id', '!=', '1')
            ->get();
            return $perfiles->toJson();
    }



}
