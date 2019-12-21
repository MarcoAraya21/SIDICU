<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('carreras', 'CarreraController');
Route::apiResource('plan_estudios', 'PlanEstudioController', ['parameters' => [
    'plan_estudios' => 'plan_estudio']]);
Route::apiResource('usuarios', 'UsuarioController', ['parameters' => [
    'usuarios' => 'usuario']]);
Route::apiResource('dominios', 'DominioController', ['parameters' => [
    'dominios' => 'dominio']]);
Route::apiResource('competencias', 'CompetenciaController', ['parameters' => [
    'competencias' => 'competencia']]);
Route::apiResource('nivel_competencias', 'NivelCompetenciaController', ['parameters' => [
    'nivel_competencias' => 'nivel_competencia']]);
Route::apiResource('logro_aprendizajes', 'LogroAprendizajeController', ['parameters' => [
    'logro_aprendizajes' => 'logro_aprendizaje']]);

Route::get('asignaturas/plan/{plan_id}', 'AsignaturaController@AsignaturaPlan');

