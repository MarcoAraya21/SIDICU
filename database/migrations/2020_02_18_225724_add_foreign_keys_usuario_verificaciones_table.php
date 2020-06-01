<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysUsuarioVerificacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuario_verificaciones', function (Blueprint $table) {
            $table->unsignedInteger('usuario_id')->nullable(); 
            $table->foreign('usuario_id')->references('id')->on('usuarios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usuario_verificaciones', function (Blueprint $table) {
            $table->dropForeign('usuario_verificaciones_usuario_id_foreign');
        });
    }
}
