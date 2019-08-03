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
            $table->string('nombre');
            $table->string('observacion');
            $table->text('proposito');
            $table->text('objetivo');
            $table->text('requisito_admision');
            $table->text('mecanismo_retencion');
            $table->text('requisito_obtencion');
            $table->text('campo_desarollo');
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
