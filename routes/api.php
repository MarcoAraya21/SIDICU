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

    Route::get('plan_estudios/finalizado/{plan_id}', 'PlanEstudioController@finalizado');
    Route::get('finalizados', 'PlanEstudioController@finalizados');
    

    // VALIDACIONES POR USUARIO
    Route::group(['middleware' => 'userprofile'], function () {

        Route::apiResource('plan_estudios', 'PlanEstudioController', ['parameters' => [
            'plan_estudios' => 'plan_estudio']]);
        Route::get('competencias_genericas', 'CompetenciaController@genericas');
        Route::apiResource('dominios', 'DominioController', ['parameters' => [
            'dominios' => 'dominio']]);
        Route::apiResource('competencias', 'CompetenciaController', ['parameters' => [
            'competencias' => 'competencia']]);
        Route::apiResource('nivel_competencias', 'NivelCompetenciaController', ['parameters' => [
            'nivel_competencias' => 'nivel_competencia']]);
        Route::apiResource('logro_aprendizajes', 'LogroAprendizajeController', ['parameters' => [
            'logro_aprendizajes' => 'logro_aprendizaje']]);

        Route::resource('nivel_competencia_asignaturas', 'NivelCompetenciaAsignaturaController', ['only' => ['store', 'destroy']]);
        Route::resource('nivel_genericas', 'NivelGenericaController', ['only' => ['store', 'destroy']]);
        Route::resource('nivel_generica_asignaturas', 'NivelGenericaAsignaturaController', ['only' => ['store', 'destroy']]);
        Route::apiResource('asignaturas', 'AsignaturaController', ['parameters' => [
            'asignaturas' => 'asignatura']]);
        Route::resource('asignatura_horas', 'AsignaturaHoraController', ['only' => ['update']]);
        Route::resource('bibliografias', 'BibliografiaController', ['only' => ['store', 'update', 'destroy']]);
        Route::resource('requisitos', 'RequisitoController', ['only' => ['store', 'destroy']]);
        Route::resource('niveles', 'NivelController', ['only' => ['store', 'destroy']]);
        Route::resource('asignatura_metodologias', 'AsignaturaMetodologiaController', ['only' => ['store', 'destroy']]);
        Route::resource('asignatura_evaluaciones', 'AsignaturaEvaluacionController', ['only' => ['store', 'destroy']]);
        Route::resource('unidades', 'UnidadController', ['only' => ['store', 'update', 'destroy']]);
        Route::resource('contenidos', 'ContenidoController', ['only' => ['store', 'update', 'destroy']]);

        // ADMIN
        Route::get('all_carreras', 'CarreraController@allCarreras');
        Route::post('carreras_admin', 'CarreraController@crearCarrera');
        Route::apiResource('carreras', 'CarreraController', ['parameters' => [
            'carreras' => 'carrera']]);
        Route::apiResource('escuelas', 'EscuelaController', ['parameters' => [
            'escuelas' => 'escuela']]);
        Route::apiResource('facultades', 'FacultadController', ['parameters' => [
            'facultades' => 'facultad']]);
        Route::apiResource('grados', 'GradoController', ['parameters' => [
            'grados' => 'grado']]);
        Route::resource('perfiles', 'PerfilController', ['only' => ['index']]);
        Route::post('crear_plan_adm', 'PlanEstudioController@createPlanAdm');
        Route::resource('usuarios', 'UsuarioController', ['only' => ['index', 'update', 'destroy']]);
        // CIERRE ADMIN

        Route::get('all_asesores', 'UsuarioController@allAsesores');
        Route::get('asesores', 'UsuarioController@getAsesores');
        Route::get('academicos', 'UsuarioController@getAcademicos');
        Route::get('listado_planes', 'PlanEstudioController@listado');
        Route::get('mis_planes', 'PlanEstudioController@misPlanes');

        Route::get('informacion_basica/{plan_id}', 'PlanEstudioController@getInformacionBasica');
        Route::put('informacion_basica/{plan_id}', 'PlanEstudioController@updateInformacionBasica');

        Route::get('editar/{plan_id}', 'PlanEstudioController@editar');
        Route::get('ver/{plan_id}', 'PlanEstudioController@ver');
        Route::put('finalizar/{plan_id}', 'PlanEstudioController@finalizar');
        Route::put('revisar/{plan_id}', 'PlanEstudioController@revisar');


    });
    
    Route::get('competencias_genericas', 'CompetenciaController@genericas');
    Route::resource('metodologias', 'MetodologiaController', ['only' => ['index']]);    
    Route::resource('evaluaciones', 'EvaluacionController', ['only' => ['index']]);
    
    Route::get('plan_estudios/{plan_id}/datos', 'PlanEstudioController@datos');
    Route::get('asignaturas/plan/{plan_id}', 'AsignaturaController@planAsignaturas');

});





