<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_asignaturas', function (Blueprint $table) {
            $table->increments('id');
            $table->text('relacion_egreso');
            $table->text('metodologias');
            $table->text('ambientes');
            $table->text('perfil_docente');
            $table->text('perfil_ayudante');
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
        Schema::dropIfExists('plan_asignaturas');
    }
}
