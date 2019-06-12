<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->unsignedInteger('perfil_id')->nullable(); 
            $table->foreign('perfil_id')->references('id')->on('perfiles');
            $table->unsignedInteger('carrera_id')->nullable(); 
            $table->foreign('carrera_id')->references('id')->on('carreras');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropForeign('usuarios_perfil_id_foreign');
            $table->dropForeign('usuarios_carrera_id_foreign');
        });
    }
}

