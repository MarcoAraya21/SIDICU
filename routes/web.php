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

Route::group(['middleware' => 'inversejwt.auth'], function () {

    Route::get('/registro', function () {
        return view('/pages/register');    
    });
    Route::get('/recuperar-password', function () {
        return view('/pages/recoverypass');    
    });
    Route::get('/', function () {
        return view('/pages/login');    
    });
    
    Route::get('verificacion/{verification_code}', 'UsuarioController@verifyUser');

});


Route::group(['middleware' => 'jwt.auth'], function () {

    Route::get('/pdf', function () {
        $pdf = PDF::loadView('/pdf/invoice');
        return $pdf->download('invoice.pdf');
        //return $pdf->stream();
    });
    
    Route::get('pdf_descargar/{id}', 'PdfController@pdfview');
    Route::get('pdf_asignatura/{id}', 'PdfController@pdfasignatura');
    Route::get('pdf_diseño/{id}', 'PdfController@pdfdiseño');
    Route::get('pdf_malla/{id}', 'PdfController@pdfmalla');

    Route::get('word_descargar/{id}', 'WordController@wordview');
    Route::get('word_asignatura/{id}', 'WordController@wordasignatura');
    Route::get('word_diseño/{id}', 'WordController@worddiseño');
    Route::get('word_malla/{id}', 'WordController@wordmalla');


    Route::get('/cambiar-password', function () {
        return view('/pages/changepass');    
    });

    Route::group(['middleware' => 'userprofile'], function () {
        Route::get('/Administrador', function () {
            return view('/pages/welcome');
        });
        // VISTAS ADMINISTRADOR
        Route::get('/CrearPlanAdm', function () {
            return view('/pages/welcome');
        });
        Route::get('/Carreras', function () {
            return view('/pages/welcome');
        });
        Route::get('/Escuelas', function () {
            return view('/pages/welcome');
        });
        Route::get('/Facultades', function () {
            return view('/pages/welcome');
        });
        Route::get('/Grados', function () {
            return view('/pages/welcome');
        });
        // CIERRE VISTAS ADMINISTRADOR
        Route::get('/AsignarPerfil', function () {
            return view('/pages/welcome');
        });
        Route::get('/CrearPlan', function () {
            return view('/pages/welcome');
        });
        Route::get('/EditarInfoBasica/{id}', function () {
            return view('/pages/welcome');
        });
        Route::get('/Listado', function () {
            return view('/pages/welcome');
        });
        Route::get('/MisPlanes', function () {
            return view('/pages/welcome');
        });
        Route::get('/Plan/Editar/{id}', function () {
            return view('/pages/welcome');
        });
        // Route::get('/NuevoPlan', function () {
        //     return view('/pages/welcome');
        // });
        Route::get('/Indicadores', function () {
            return view('/pages/welcome');
        });
        Route::get('/Plan/Ver/{id}', function () {
            return view('/pages/welcome');
        });
    });
    
    Route::get('/Plan/Finalizado/{id}', function () {
        return view('/pages/welcome');
    });
    Route::get('/home', function () {
        return view('/pages/welcome');
    });
    
    Route::get('/{path?}', function () {
        return redirect('/home');
    })->where('path', '.*')->where('path', '^((?!assets|api).)*$');
});
// Route::get('/home', function () {
//     return view('pages/welcome');
// })->where('path', '.*')->where('path', '^((?!assets).)*$');




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

