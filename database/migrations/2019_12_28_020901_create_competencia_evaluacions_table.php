<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompetenciaEvaluacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competencia_evaluaciones', function (Blueprint $table) {
            $table->increments('id');
            $table->text('descripcion')->nullable();
            $table->unsignedInteger('nivel_competencia_asignatura_id')->nullable(); 
            $table->foreign('nivel_competencia_asignatura_id')->references('id')->on('nivel_competencia_asignaturas')->onDelete('cascade');
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
        Schema::dropIfExists('competencia_evaluaciones');
    }
}
