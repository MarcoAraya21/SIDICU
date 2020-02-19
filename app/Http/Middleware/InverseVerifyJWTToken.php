<?php
namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class InverseVerifyJWTToken
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
        // JWTAuth::toUser($request->token)
        $token = '';
        if(isset($_COOKIE['token']))
        {
            return redirect('/home');
        }
        else {
            return $next($request);
            // return redirect('/');
        }
        
         
    }
}