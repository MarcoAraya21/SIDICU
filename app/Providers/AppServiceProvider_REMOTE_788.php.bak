<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use View;
use JWTAuth;
use JWTAuthException;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // dd(date('Y-m-d H:i:s',JWTAuth::getPayload($_COOKIE['token'])['exp']));
        // dd(JWTAuth::getPayload($_COOKIE['token']));
        if(isset($_COOKIE['token']))
        {
            try{
                JWTAuth::authenticate($_COOKIE['token']);
            }
            catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                return response()->json(['token_expired'], $e->getStatusCode());
            }
            
            $user = JWTAuth::toUser($_COOKIE['token']);
            // $time_unix = JWTAuth::getPayload($_COOKIE['token'])['exp'];
            // dd(($time_unix - time())/) ;
            // $segundos = $time_unix - time();
            // $tiempo_restante = 
            // $minutos = intval($segundos/60) . ':' . $segundos%60;
            // dd(JWTAuth::getPayload($_COOKIE['token'])['exp']);
            // View::share('inicial', $time_unix);
            View::share('key', $user);
            // View::share('restante', $segundos);
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Schema::defaultStringLength(191);
    }
}
