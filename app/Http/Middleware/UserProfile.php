<?php
namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class UserProfile
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $path = $request->path();
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        // ddJWTAuth::toUser($request->token)
        $perfil = JWTAuth::toUser($token)->perfil_id;

        $path_editar = '/^\b(Plan\/Editar\/)+([1-9][0-9]{0,3})$/';
        $path_ver = '/^\b(Plan\/Ver\/)+([1-9][0-9]{0,3})$/';
        $path_basica = '/^\b(InformacionBasica\/)+([1-9][0-9]{0,3})$/';
        if($path == "Administrador" || $path == "AsignarPerfil")
        {
            $path_editar = '/^\b(Plan\/Editar\/)+([1-9][0-9]{0,3})$/';
            $path_ver = '/^\b(Plan\/Ver\/)+([1-9][0-9]{0,3})$/';
            $path_finalizado = '/^\b(Plan\/Finalizado\/)+([1-9][0-9]{0,3})$/';
            $path_editar_info_basica = '/^\b(EditarInfoBasica\/)+([1-9][0-9]{0,3})$/';
            if($path == "Administrador" || 
            $path == "AsignarPerfil" || 
            $path == "Carreras" || 
            $path == "Escuelas" || 
            $path == "Facultades" || 
            $path == "Grados" || 
            $path == "CrearPlanAdm")
            {
                if($perfil == 1)
                {
                    return $next($request);
                }
            }
            if($path == "AsignarPlan")
            {
                if($perfil == 1 || $perfil == 2)
                {
                    return $next($request);
                }
            }
            if($path == "Listado" || $path == "Indicadores" || $path == "CrearPlan" || preg_match($path_editar_info_basica, $path))
            {
                if($perfil == 1 || $perfil == 2)
                {
                    return $next($request);
                }

            }
            if($path == "MisPlanes" || preg_match($path_editar, $path))
            {
                if($perfil == 1 || $perfil == 3 || $perfil == 4)
                {
                    return $next($request);
                }
            }
            if(preg_match($path_ver, $path))
            {
                if($perfil == 1 || $perfil == 2 || $perfil == 3 || $perfil == 4)
                {
                    return $next($request);
                }
            }
            return redirect('/home');
        }
        // PATHS API
        else
        {
            $path = substr( $request->path(), 4);
            $elemento =  explode('/', $path)[0];
            $metodo = $request->method();

            if($elemento == "dominios" || $elemento == "competencias" || $elemento == "nivel_competencias" || $elemento == "logro_aprendizajes")
            {
                if($metodo == "POST" || $metodo == "PUT" || $metodo == "DELETE")
                {
                    if($perfil == 1 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "GET")
                {
                    return $next($request);
                }
            }
            if($elemento == "plan_estudios")
            {
                if($metodo == "POST" || $metodo == "PUT" || $metodo == "DELETE")
                {
                    if($perfil == 1 || $perfil == 2)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "DELETE")
                {
                    if($perfil == 1)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "PUT")
                {
                    if($perfil == 1 || $perfil == 2 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "GET")
                {
                    return $next($request);
                }
            }
            if($elemento == "nivel_competencia_asignaturas" || $elemento == "nivel_genericas" || $elemento == "nivel_generica_asignaturas" || $elemento == "requisitos" || $elemento == "niveles")
            {
                if($metodo == "POST" || $metodo == "DELETE")
                {
                    if($perfil == 1 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "asignaturas")
            {
                if($metodo == "POST" || $metodo == "DELETE")
                {
                    if($perfil == 1 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "PUT")
                {
                    if($perfil == 1 || $perfil == 3 || $perfil == 4)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "GET")
                {
                    return $next($request);
                }
            }
            if($elemento == "asignatura_horas" || $elemento == "finalizar")
            {
                if($metodo == "PUT")
                {
                    if($perfil == 1 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "bibliografias" || $elemento == "unidades" || $elemento == "contenidos")
            {
                if($metodo == "POST" || $metodo == "PUT" || $metodo == "DELETE")
                {
                    if($perfil == 1 || $perfil == 3 || $perfil == 4)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "requisitos")
            {
                if($metodo == "POST" || $metodo == "DELETE")
                {
                    if($perfil == 1 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }

            if($elemento == "asignatura_metodologias" || $elemento == "asignatura_evaluaciones")
            {
                if($metodo == "POST" || $metodo == "DELETE")
                {
                    if($perfil == 1 || $perfil == 3 || $perfil == 4)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "all_carreras" || $elemento == "perfiles")
            {
                if($metodo == "GET")
                {
                    if($perfil == 1)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "carreras_admin" || $elemento == "crear_plan_adm")
            {
                if($metodo == "POST")
                {
                    if($perfil == 1)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "carreras")
            {
                if($metodo == "POST")
                {
                    if($perfil == 1 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "PUT" || $metodo == "DELETE")
                {
                    if($perfil == 1)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "GET")
                {
                    return $next($request);
                }
            }
            if($elemento == "escuelas" || $elemento == "facultades" || $elemento == "grados")
            {
                if($metodo == "POST" || $metodo == "PUT" || $metodo == "DELETE")
                {
                    if($perfil == 1)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
                if($metodo == "GET")
                {
                    return $next($request);
                }
            }
            if($elemento == "usuarios")
            {
                if($metodo == "GET" || $metodo == "PUT" || $metodo == "DELETE")
                {
                    if($perfil == 1)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "asesores" || $elemento == "listado_planes" || $elemento == "all_asesores")
            {
                if($metodo == "GET")
                {
                    if($perfil == 1 || $perfil == 2)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "academicos")
            {
                if($metodo == "GET")
                {
                    if($perfil == 1 || $perfil == 3)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "mis_planes" || $elemento == "editar")
            {
                if($metodo == "GET")
                {
                    if($perfil == 1 || $perfil == 3 || $perfil == 4)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "ver")
            {
                if($metodo == "GET")
                {
                    if($perfil == 1 || $perfil == 2 || $perfil == 3 || $perfil == 4)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "revisar")
            {
                if($metodo == "PUT")
                {
                    if($perfil == 1 || $perfil == 2)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            if($elemento == "informacion_basica")
            {
                if($metodo == "GET" || $metodo == "PUT")
                {
                    if($perfil == 1 || $perfil == 2)
                    {
                        return $next($request);
                    }
                    else
                    {
                        return response()->json(['error' => 'No Autorizado.'], 401);
                    }
                }
            }
            return response()->json(['error' => 'No Autorizado.'], 401);
        }
    }
}