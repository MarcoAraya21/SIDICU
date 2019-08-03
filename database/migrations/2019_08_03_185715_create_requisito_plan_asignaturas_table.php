<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequisitoPlanAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requisito_plan_asignaturas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('plan_asignatura_id')->nullable();
            $table->foreign('plan_asignatura_id')->references('id')->on('plan_asignaturas');
            $table->unsignedInteger('requisito_id')->nullable();
            $table->foreign('requisito_id')->references('id')->on('plan_asignaturas');
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
        Schema::dropIfExists('requisito_plan_asignaturas');
    }
}
