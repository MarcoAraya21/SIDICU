<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use App\PlanEstudioUsuario;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use JWTAuthException;
use Tymon\JWTAuth\Providers\AbstractProvider;
use Tymon\JWTAuth\Providers\ProviderInterface;
use Validator;
use Response;
use Auth;
use Mail;
use DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // if(JWTAuth::authenticate()->perfil_id == "1")
        // {
            $Usuarios = Usuario::where('perfil_id', '!=', '1')
            ->with('perfil')
            ->get();
            return $Usuarios->toJson();
        // }
        // else
        // {
        //     return response()->json(['status'=>'denied','message'=>'No tiene permiso para acceder.']);
        // }
    }

    public function getAsesores()
    {
        $Usuarios = Usuario::where('perfil_id', 3)->get();
        return $Usuarios->toJson();
    }

    public function allAsesores()
    {
        $Usuarios = Usuario::whereIn('perfil_id', [1, 3])->get();
        return $Usuarios->toJson();
    }

    public function getAcademicos()
    {
        $Usuarios = Usuario::where('perfil_id', 4)->get();
        return $Usuarios->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario $Usuario)
    {
        if($request->get('perfil') != "1" && $request->get('perfil') != "")
        {
            $Usuario = $Usuario->update(['perfil_id' => $request->get('perfil')]);
            return response()->json($Usuario, 201);
        }
        else
        {
            return response()->json(['error' => 'Acceso no permitido.'],403);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Usuario = Usuario::find($id);
        $Planes_Usuario = PlanEstudioUsuario::where('usuario_id', $id)->get();
        if(sizeof($Planes_Usuario) == 0 && ($Usuario->perfil_id == 4 || $Usuario->perfil_id == 5))
        {
            $Usuario->delete();
        }
        else
        {
            return response()->json(['error' => 'Acceso no permitido.'],202);
        }
    }



    public function register(Request $request){
        // dd($request);
        $fecha = $request->get('fec_nac');
        $fecha_format = explode("/", $fecha);
        $fecha_nacimiento = $fecha_format[2]. '/' . $fecha_format[1] . "/" . $fecha_format[0];
        $verification_code = str_random(30);
        try
        {
            $Usuario = Usuario::create([
                'nombre' => $request->get('nombre'),
                'apellido_paterno' => $request->get('apellido_paterno'),
                'apellido_materno' => $request->get('apellido_materno'),
                'correo' => $request->get('correo'),
                'rut' => $request->get('rut'),
                'password' => bcrypt($request->get('password')),
                'fec_nac' => $fecha_nacimiento,
                'fono_fijo' => $request->get(''),
                'fono_celular' => $request->get(''),
                'perfil_id' => 5,
                'carrera_id' => $request->get(''),
                'estado_id' => 1
            ]);
        }
        catch(\Illuminate\Database\QueryException $e)
        {
            return response()->json(['status'=>'warning','message'=>'El correo o rut ingresados ya se encuentran registrado.']);
        }
        $Usuario->usuario_verificaciones()->create(['verification_code' => $verification_code, 'activo' => 1]);
        $nombre = $request->get('nombre');
        $correo = $request->get('correo');
        $rut = $request->get('rut');
        $password = $request->get('password');
        $asunto = 'Registro SIDECU';
        Mail::send('email.verify', ['name' => $nombre, 'rut' => $rut, 'password' => $password, 'verification_code' => $verification_code],
            function($mail) use ($correo, $nombre, $asunto){
                $mail->to($correo, $nombre);
                $mail->subject($asunto);
            });
        return response()->json(['status'=>'success','message'=>'Se ha registrado correctamente','correo'=>$correo]);
    }

    public function verifyUser($verification_code)
    {
        $check = DB::table('usuario_verificaciones')->where('verification_code',$verification_code)->first();

        if(!is_null($check)){
            $usuario = Usuario::find($check->usuario_id);

            if($usuario->validado == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Ya se ha validado su cuenta.'
                ]);
            }

            $usuario->update(['validado' => 1]);
            DB::table('usuario_verificaciones')->where('verification_code',$verification_code)->delete();

            return view('pages.verification', ['status' => 'success', 'mensaje' => 'Tu cuenta se ha validado correctamente.']);
        }

        return view('pages.verification', ['status' => 'error', 'mensaje' => 'Su codigo de verificación es incorrecto.']);
        // return  response()->json(['success'=> false, 'error'=> "Su codigo de verificación es incorrecto"]);

    }

    public function login(Request $request){
        
        $credentials = $request->only('rut', 'password');
        $token = null;
        try {
           if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['status'=>'warning','message'=>'Usuario o Contraseña incorrectos.']);
           }
        } catch (JWTAuthException $e) {
            return response()->json(['status'=>'warning','message'=>'Error al crear el token.']);
        }
 
 
        // Retorno los datos dentro de un token en formato JSON:
        // return response()->json(compact('token'));
        // dd(compact('token')['token']);
        if(JWTAuth::toUser(JWTAuth::attempt($credentials))->validado == 0)
        {
            return response()->json(['status'=>'warning','message'=>'Aun no ha validado su correo.']);
        }
        else
        {
            if(JWTAuth::toUser(JWTAuth::attempt($credentials))->validado == 1)
            {
                return response()->json(['status'=>'success'])->withCookie('token', compact('token')['token']);
                // return redirect('/home')->withCookie('token', compact('token')['token'], 120);
            }
        }
    }

    public function forgot(Request $request){
        // dd($request);
        $fecha = $request->get('fec_nac');
        $fecha_format = explode("/", $fecha);
        $fecha_nacimiento = $fecha_format[2]. '/' . $fecha_format[1] . "/" . $fecha_format[0];
        $rut = $request->get('rut');
        $usuario = Usuario::where(['rut' => $rut])->first();    
        if($usuario)
        {
            $usuario = $usuario->where(['fec_nac' => $fecha_nacimiento])->first();
            if($usuario)
            {
                $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
                $NuevaPass = "";
                for($i=0;$i<15;$i++) {
                    $NuevaPass .= substr($str,rand(0,62),1);
                }
                $usuario->update([
                    'password' => bcrypt($NuevaPass),
                ]);
                $correo = $usuario['correo'];
                $nombre = $usuario['nombre'];
                $asunto = 'Contraseña Nueva SIDECU';
                Mail::send('email.newpass', ['name' => $nombre, 'password' => $NuevaPass],
                    function($mail) use ($correo, $nombre, $asunto){
                        $mail->to($correo, $nombre);
                        $mail->subject($asunto);
                    });
                return response()->json(['status'=>'success','message'=>'Password recuperada correctamente','correo'=>$correo]);
            }
            else
            {
                return response()->json(['status'=>'warning','message'=>'La fecha no coincide con nuestros datos']);
            }
        }
        else
        {
            return response()->json(['status'=>'warning','message'=>'El usuario ingresado no existe']);
        }
        
    }

    public function change(Request $request){
        $fecha = $request->get('fec_nac');
        $fecha_format = explode("/", $fecha);
        $fecha_nacimiento = $fecha_format[2]. '-' . $fecha_format[1] . "-" . $fecha_format[0];
        $password = $request->get('password');
        if(JWTAuth::authenticate()->fec_nac == $fecha_nacimiento)
        {
            $usuario = Usuario::where(["rut" => JWTAuth::authenticate()->rut])->first();
            $usuario->update([
                'password' => bcrypt($password),
            ]);
            return response()->json(['status'=>'success','message'=>'Contraseña Actualizada']);
        }
        else
        {
            return response()->json(['status'=>'warning','message'=>'La fecha no coincide con nuestros datos']);
        }
        
    }

    public function logout()
    {
        $token = '';
        if(isset($_COOKIE['token']))
        {
            $token = $_COOKIE['token'];
        }
        $olvidarToken = \Cookie::forget('token');
        try {
            JWTAuth::invalidate($token);
            return response()->json(['status' => 'success', 'message'=> "Has cerrado sesión satisfactoriamente!"])->withCookie($olvidarToken);;
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => 'error', 'message' => 'Failed to logout, please try again.']);
        }
    }

    public function getAuthUser(Request $request){
        $Usuario = JWTAuth::toUser($request->token);
        return response()->json(['result' => $Usuario]);
    }

}
