<?php
namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class VerifyJWTToken
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
            $token = $_COOKIE['token'];
        }
        $olvidarToken = \Cookie::forget('token');
        // dd(JWTAuth::parseToken());
        try{
            if (! $user = JWTAuth::toUser($token)) {
                
                return redirect('/')->withCookie($olvidarToken);
                // return redirect('/');
            }
            
        }catch (JWTException $e) {
            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                // return response()->json(['token_expired'], $e->getStatusCode());
                return redirect('/')->withCookie($olvidarToken);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                // return response()->json(['token_invalid'], $e->getStatusCode());
                return redirect('/')->withCookie($olvidarToken);
            }else{
                // return response()->json(['error'=>'Token is required']);
                return redirect('/')->withCookie($olvidarToken);
            }
        }
       return $next($request);
    }
}