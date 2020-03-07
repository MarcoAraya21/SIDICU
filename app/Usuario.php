<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;

class Usuario extends Model implements AuthenticatableContract
{
    use Authenticatable;

    protected $fillable = ['nombre','apellido_paterno', 'apellido_materno', 'correo', 'rut', 'password', 'fec_nac', 'fono_fijo', 'fono_celular', 'validado',
                            'perfil_id', 'carrera_id', 'estado_id'];
    protected $hidden = ['password', 'remember_token', 'validado', 'perfil_id', 'estado_id', ];
    protected $appends = ['planes_pendientes', 'planes_asignados'];
    public function perfil()
    {
        return $this->belongsTo('App\Perfil');
    }
    public function carrera()
    {
        return $this->belongsTo('App\Carrera');
    }
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

    public function plan_estudio_usuarios()
    {
        return $this->hasMany('App\PlanEstudioUsuario');
    }

    public function getPlanesPendientesAttribute()
    {
        // return $this->hasMany('App\PlanEstudioUsuario');


        // ->with(['presupuesto_items_rh' => function ($query) {
        //     $query
        //     ->with('item')
        //     ->with(['gasto_conceptos' => function ($query) {
        //         $query
        //         // ->makeVisible('estado_solicitud')
        //         ->with(['conformidades' => function ($query) {
        //             $query
        //             ->with(['ultimo_estado_conformidad' => function ($query) {
        //                 $query
        //                 ->with('conformidad_anexo')
        //                 ->with('estado');
        //             }]);
        //         }]);
        //     }]);
        // }])   
        // $monto_adjudicado_total = 0;
        // $presupuestos = $this->presupuesto_items()->get();
        // foreach ($presupuestos as $key => $value) {
        //     $monto_adjudicado_total += $value->monto_adjudicado;
        // }
        // return ('$'.number_format($monto_adjudicado_total, 0, ',', '.').'');

        // return $this->presupuesto_items()->join('items', 'items.id', '=', 'presupuesto_items.item_id')
        // ->select('presupuesto_items.*')
        // ->where('items.recurso_humano', 1);
        return $this->plan_estudio_usuarios()->join('plan_estudios', 'plan_estudios.id', '=', 'plan_estudio_usuarios.plan_estudio_id')
        ->select('plan_estudio_usuarios.*')
        ->where('plan_estudios.estado_id', 1)
        ->count();
    }

    public function getPlanesAsignadosAttribute()
    {
        return $this->plan_estudio_usuarios()->join('plan_estudios', 'plan_estudios.id', '=', 'plan_estudio_usuarios.plan_estudio_id')
        ->select('plan_estudio_usuarios.*')
        ->where('plan_estudios.estado_id', '!=', 4)
        ->count();
    }


    public function usuario_verificaciones()
    {
        return $this->hasMany('App\UsuarioVerificacion');
    }

    public function plan_estudios()
    {
        return $this->belongsToMany('App\PlanEstudio','plan_estudio_usuarios','usuario_id','plan_estudio_id');
    }
}
