<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsignaturaHorasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asignatura_horas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('tipo_hora_id')->nullable(); 
            $table->foreign('tipo_hora_id')->references('id')->on('tipo_horas');
            $table->unsignedInteger('asignatura_id')->nullable(); 
            $table->foreign('asignatura_id')->references('id')->on('asignaturas');
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
        Schema::dropIfExists('asignatura_horas');
    }
}
