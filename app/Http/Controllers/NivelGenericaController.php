<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NivelGenerica;
use App\Competencia;

class NivelGenericaController extends Controller
{

    public function store(Request $request)
    {


        $competencia = Competencia::where('dominio_id', 1)->where('id', $request->competencia_id)->first();
        $nivel_competencias = $competencia->nivel_competencias()->get();
        foreach ($nivel_competencias as $key => $nivel_competencia) {
            NivelGenerica::firstOrCreate(['nivel_competencia_id' => $nivel_competencia['id'], 'plan_estudio_id' => $request->plan_estudio_id]);
        }

        // dd(NivelGenerica::where('plan_estudio_id', $request->plan_estudio_id)->competencia()->where());
        // SELECT nv.* FROM `nivel_genericas` as nv left join `nivel_competencias` as nc on nv.nivel_competencia_id = nc.id where nc.competencia_id = 7
        $nivel_genericas = NivelGenerica::join('nivel_competencias', 'nivel_genericas.nivel_competencia_id', '=', 'nivel_competencias.id')
        ->select('nivel_genericas.*')
        ->where('nivel_competencias.competencia_id', $request->competencia_id)->get();
        $competencia_generica = Competencia::where('dominio_id', 1)->where('id', $request->competencia_id)->with(['nivel_competencias' => function ($query) {
                                $query
                                    ->with('logro_aprendizajes');
                                }])->first();

        return response()->json([$nivel_genericas, $competencia_generica], 201);

    }

    public function destroy($id)
    {
        // $NivelGenericaAsignaturas = NivelGenericaAsignaturas::where('asignatura_id', $idasignatura);
        // $NivelGenericaAsignaturas.length() = 0
        // {
        //     $Asignatura::find($idasignatura)->delete();
        // }
        $NivelGenericaAsignatura = NivelGenericaAsignatura::find($id);
        $NivelGenericaAsignatura->delete();
    }


}

