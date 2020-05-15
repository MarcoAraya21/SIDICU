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
            if($perfil == 1)
            {
                return $next($request);
            }
            else
            {
                return redirect('/home');
            }
        }
        if($path == "AsignarPlan")
        {
            if($perfil == 1 || $perfil == 2)
            {
                return $next($request);
            }
            else
            {
                return redirect('/home');
            }
        }
        if($path == "Listado" || $path == "Indicadores")
        {
            if($perfil == 1 || $perfil == 2)
            {
                return $next($request);
            }
            else
            {
                return redirect('/home');
            }
        }
        if($path == "Pendientes" || preg_match($path_basica, $path))
        {
            if($perfil == 1 || $perfil == 3)
            {
                return $next($request);
            }
            else
            {
                return redirect('/home');
            }
        }
        if($path == "MisPlanes" || preg_match($path_editar, $path))
        {
            if($perfil == 1 || $perfil == 3 || $perfil == 4)
            {
                return $next($request);
            }
            else
            {
                return redirect('/home');
            }
        }
        if(preg_match($path_ver, $path))
        {
            if($perfil == 1 || $perfil == 2 || $perfil == 3 || $perfil == 4)
            {
                return $next($request);
            }
            else
            {
                return redirect('/home');
            }
        }
    }
}