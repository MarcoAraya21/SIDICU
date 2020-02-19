<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanEstudiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_estudios', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre')->nullable();
            $table->string('observacion')->nullable();
            $table->text('proposito')->nullable();
            $table->text('objetivo')->nullable();
            $table->text('requisito_admision')->nullable();
            $table->text('mecanismo_retencion')->nullable();
            $table->text('requisito_obtencion')->nullable();
            $table->text('campo_desarrollo')->nullable();
            $table->boolean('nueva_oferta')->default(false);
            $table->string('perfil_egresado')->nullable();
            $table->string('perfil_licenciado')->nullable();
            $table->string('titulo_intermedio')->nullable();
            $table->string('minor')->nullable();
            $table->string('diploma')->nullable();
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
        Schema::dropIfExists('plan_estudios');
    }
}
