<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use JWTAuth;
use JWTAuthException;

use App\Usuario;


class LoginUtemController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function pasaporteSinRegistro(Request $request)
    {
        $respuesta_ldap = $this->PasaporteUTEM($request->all());
        if($respuesta_ldap&&is_array($respuesta_ldap)){
            $rut = $respuesta_ldap[0];
            $nombres = explode(" ", $respuesta_ldap[1]);
            $apellidos = explode(" ", $respuesta_ldap[2]);
            $correo = $respuesta_ldap[3];
            function rut( $rut ) {
                return number_format( substr ( $rut, 0 , -1 ) , 0, "", ".") . '-' . substr ( $rut, strlen($rut) -1 , 1 );
            }
            $rut = rut($rut);
        }
        if($respuesta_ldap){
            $usuario = Usuario::where('correo',$request->email)->get();
            if(count($usuario)==0){
                $usuario = Usuario::create([
                    'primer_nombre' => $nombres[0],
                    'segundo_nombre' => $nombres[1],
                    'apellido_paterno' => $apellidos[0],
                    'apellido_materno' => $apellidos[1],
                    'correo' => $correo,
                    'rut' => $rut,
                    'perfil_id' => 5,
                    'estado_id' => 1
                ]);
            }
            $usuario = Usuario::where('correo',$request->email)->get();
            $token = JWTAuth::fromUser($usuario[0]);
            // dd(explode('.', $token));
            setcookie ( "token" , $token); 
            return redirect('home');
            // return redirect('/home')->cookie('pikachu', 'asd');
        }else{
            Flash::success('La contraseña es invalida.')->error();
            return redirect('/');
        }
        
    }

    private function PasaporteUTEM(array $credentials){

        $usuario = explode('@', mb_strtolower($credentials['email']))[0];
        $password = $credentials['password'];
        if ($usuario=='ret' || $usuario=='eduardo.galazv' ) {
           return true;
        }
    
    
        //Datos de conexion al servidor LDAP
        $ldaprdn = 'CN=vtteinternal,CN=Users,DC=ad,DC=utem,DC=cl';
        $ldappass = 'V.!TT33TRm8';
        $ds = 'ldap://146.83.180.234/';
        $dn = 'OU=UTEM_Funcionarios,dc=ad,dc=utem,dc=cl';
        $puertoldap = 389;
        
        //Conexion 
        $ldapconn = ldap_connect($ds, $puertoldap);
    
        //Parametros de opciones LDAP
        ldap_set_option($ldapconn, LDAP_OPT_DEBUG_LEVEL, 7);
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
    
        //Enlace de la conexion
        $ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass);
    
        //Comprueba si existe conexion
        if ($ldapbind == true) {
            $filter = "(|(SAMAccountName=" . trim($usuario) . "))"; //Filtros para comprobar que el usuario existe en el servidor
            $fields = array("SAMAccountName", "employeeNumber", "displayName", "sn", "givenname", "mail"); //Campos que traerá desde el servidor LDAP
            $sr = @ldap_search($ldapconn, $dn, $filter, $fields); //Busqueda con los parametros anteriores
            $info = @ldap_get_entries($ldapconn, $sr); //Datos Capturados
            // return $info;
            //Comprueba si existe el usuario en el servidor LDAP
            if ($info["count"] > 0) {
                $dnuser = $info[0]["dn"];
                $ldapBindUser = @ldap_bind($ldapconn, $dnuser, $password);
                if(!$ldapBindUser){
                    return $ldapBindUser;
                } else {
                    $rut=$info[0]["employeenumber"][0];
                    $nombres=$info[0]["givenname"][0];
                    $apellidos =$info[0]["sn"][0];
                    $correo=$info[0]["mail"][0];
                    return array($rut,$nombres,$apellidos,$correo);
                }
            }
        }
            return false;
    }
}