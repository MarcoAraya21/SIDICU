<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNivelCompetenciaAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_competencia_asignaturas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('nivel_competencia_id')->nullable(); 
            $table->foreign('nivel_competencia_id')->references('id')->on('nivel_competencias')->onDelete('cascade');
            $table->unsignedInteger('asignatura_id')->nullable(); 
            $table->foreign('asignatura_id')->references('id')->on('asignaturas')->onDelete('cascade');
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
        Schema::dropIfExists('nivel_competencia_asignaturas');
    }
}
