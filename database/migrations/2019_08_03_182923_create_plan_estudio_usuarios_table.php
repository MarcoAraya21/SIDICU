<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanEstudioUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_estudio_usuarios', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('usuario_id')->nullable();
            $table->foreign('usuario_id')->references('id')->on('usuarios');
            $table->unsignedInteger('plan_estudio_id')->nullable();
            $table->foreign('plan_estudio_id')->references('id')->on('plan_estudios');
            $table->unsignedInteger('rol_id')->nullable();
            $table->foreign('rol_id')->references('id')->on('roles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan_estudio_usuarios');
    }
}
