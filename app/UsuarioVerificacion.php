<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioVerificacion extends Model
{
    protected $table = 'usuario_verificaciones';
    protected $fillable = ['verification_code', 'activo', 'usuario_id'];

    public function usuario()
    {
        return $this->belongsTo('App\Usuario');
    }
}
