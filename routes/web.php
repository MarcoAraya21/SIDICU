<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::get('/', function () {
// 	return redirect('/login');
// });
Route::get('documentos/{media}/{ruta?}/{ruta2?}', 'MediaController@show'); 


Route::get('/login', function () {
    return view('/pages/login');    
});

Route::get('/pdf', function () {
    $pdf = PDF::loadView('/pdf/invoice');
    //return $pdf->download('invoice.pdf');
    return $pdf->stream();
});

Route::get('/pdf_descargar', 'PdfController@pdfview');

Route::get('/{path?}', function () {
    return view('pages/welcome');
})->where('path', '.*')->where('path', '^((?!assets).)*$');




// Route::get('{reactRoutes}', function () {
//     return view('home/index'); // your start view
// })->where('reactRoutes', '^((?!api).)*$'); // except 'api' word


// Route::get('/proyectos_internos/postulacion', function () {
//     return view('proyectos_internos/new');
// });


// Route::get('/proyectos_internos', function () {
//     return view('proyectos_internos/index');
// })->name('proyectos_internos');
// Route::get('/postulacion', function () {
//     return view('postulacion/formulario');
// });

// Route::get('/login', function () {
//     return view('home/login');
// });

// Route::get('/dashboard/v2', function () {
//     return view('pages/dashboard-v2');
// });

