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


Route::post('auth/register', 'UsuarioController@register');
Route::post('auth/login', 'UsuarioController@login');
Route::post('auth/forgot', 'UsuarioController@forgot');
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('auth/authenticate', 'UsuarioController@getAuthUser');
    Route::post('auth/change', 'UsuarioController@change');
    Route::get('auth/logout', 'UsuarioController@logout');
    Route::get('asesores', 'UsuarioController@getAsesores');
    Route::get('academicos', 'UsuarioController@getAcademicos');
    Route::get('informacion_basica/{plan_id}', 'PlanEstudioController@getInformacionBasica');
    Route::put('informacion_basica/{plan_id}', 'PlanEstudioController@updateInformacionBasica');
    Route::get('listado_planes', 'PlanEstudioController@listado');
    Route::get('mis_planes', 'PlanEstudioController@misPlanes');
    Route::get('plan_estudios/finalizado/{plan_id}', 'PlanEstudioController@finalizado');
    Route::get('finalizados', 'PlanEstudioController@finalizados');
    Route::get('pendientes', 'PlanEstudioController@misPendientes');
    Route::apiResource('plan_estudios', 'PlanEstudioController', ['parameters' => [
        'plan_estudios' => 'plan_estudio']]);

    Route::resource('perfiles', 'PerfilController', ['only' => ['index']]);
    // SEPARACION
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
    
    Route::resource('niveles', 'NivelController', ['only' => ['store', 'destroy']]);
    
    Route::resource('metodologias', 'MetodologiaController', ['only' => ['index']]);
    Route::resource('asignatura_metodologias', 'AsignaturaMetodologiaController', ['only' => ['store', 'destroy']]);
    
    Route::resource('evaluaciones', 'EvaluacionController', ['only' => ['index']]);
    Route::resource('asignatura_evaluaciones', 'AsignaturaEvaluacionController', ['only' => ['store', 'destroy']]);
    
    Route::apiResource('unidades', 'UnidadController', ['parameters' => [
        'unidades' => 'unidad']]);
    Route::apiResource('contenidos', 'ContenidoController', ['parameters' => [
        'contenidos' => 'contenido']]);
    
    Route::get('plan_estudios/{plan_id}/datos', 'PlanEstudioController@datos');
    Route::get('asignaturas/plan/{plan_id}', 'AsignaturaController@planAsignaturas');

    Route::resource('carreras', 'CarreraController', ['only' => ['index', 'store']]);
    Route::resource('escuelas', 'EscuelaController', ['only' => ['index']]);
    Route::resource('grados', 'GradoController', ['only' => ['index']]);



    Route::apiResource('usuarios', 'UsuarioController', ['parameters' => [
        'usuarios' => 'usuario']]);
});





