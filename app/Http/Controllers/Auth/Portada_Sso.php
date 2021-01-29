<?php
        
namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
/**
 * Controlador de la portada
 */
class Portada_Sso extends Controller{

    /**
     * Ruta principal
     * /
     * @param \Base $fat
     */

    public function pre_login() {
        include(dirname(__FILE__).'/sso.html');
    }
    public function post_login(Request $request) {
        if( isset($request->token)){
            $token = ($request->token);
            return response(200)->cookie(
                'SESSION_acesstoken', $token, strtotime('-1 year')
            );
            echo 200;
        }else{
            echo 403;
        }
    }

    public function login(Request $request) {
        $token = $request->cookie('SESSION_acesstoken');
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://sso.utem.cl/auth/realms/utem/protocol/openid-connect/userinfo",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/x-www-form-urlencoded",
                "Authorization: Bearer ".$token
            ),
        ));
        $response = curl_exec($curl);
        $response_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        if($response_code!=200){
            return redirect('/')->with('status', 'Error '.$response_code.' con el servidor de inicio de sesion(SSO).');
        }
        $arrayres = json_decode($response, true);
        $rut = $arrayres['employeeNumber'];
        $vl_nombre = $arrayres['name'];
        $vl_email = $arrayres['email'];
        $vl_username = $arrayres['preferred_username'];
        $sub = $arrayres['sub'];
        $usuario_ret = User::where('email', $vl_email)->first();
        if($usuario_ret && \Auth::loginUsingId($usuario_ret->id)){
            return redirect('admin');
        }else{
            return redirect('/')->with('status', 'El usuario no tiene acceso.');
        }

    }
}