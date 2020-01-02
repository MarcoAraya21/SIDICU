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
Route::apiResource('nivel_competencia_asignaturas', 'NivelCompetenciaAsignaturaController', ['parameters' => [
    'nivel_competencia_asignaturas' => 'nivel_competencia_asignatura']]);
Route::apiResource('nivel_generica_asignaturas', 'NivelGenericaAsignaturaController', ['parameters' => [
    'nivel_generica_asignaturas' => 'nivel_generica_asignatura']]);
Route::apiResource('asignaturas', 'AsignaturaController', ['parameters' => [
    'asignaturas' => 'asignatura']]);
Route::resource('asignatura_horas', 'AsignaturaHoraController', ['only' => ['update']]);
Route::resource('bibliografias', 'BibliografiaController', ['only' => ['store', 'update', 'destroy']]);
Route::resource('requisitos', 'RequisitoController', ['only' => ['store', 'destroy']]);

Route::apiResource('competencia_evaluaciones', 'CompetenciaEvaluacionController', ['parameters' => [
    'competencia_evaluaciones' => 'competencia_evaluacion']]);
Route::apiResource('generica_evaluaciones', 'GenericaEvaluacionController', ['parameters' => [
    'generica_evaluaciones' => 'generica_evaluacion']]);

Route::resource('niveles', 'NivelController', ['only' => ['store', 'destroy']]);

Route::resource('metodologias', 'MetodologiaController', ['only' => ['index']]);
Route::resource('asignatura_metodologias', 'AsignaturaMetodologiaController', ['only' => ['store', 'destroy']]);

Route::get('asignaturas/plan/{plan_id}', 'AsignaturaController@planAsignaturas');

