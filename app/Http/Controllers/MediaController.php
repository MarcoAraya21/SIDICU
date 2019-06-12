<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function show($media, $file, $file2)
    {
        $rutaDeArchivo = storage_path("app\\" . $media . '\\' . $file);
        if($file2 !== null){
            $rutaDeArchivo = $rutaDeArchivo . '\\' . $file2;
        }
        return response()->file( $rutaDeArchivo);
    }
    
}
