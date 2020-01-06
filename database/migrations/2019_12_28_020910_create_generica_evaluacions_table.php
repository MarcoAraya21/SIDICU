<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGenericaEvaluacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('generica_evaluaciones', function (Blueprint $table) {
            $table->increments('id');
            $table->text('descripcion')->nullable();
            $table->unsignedInteger('nivel_generica_asignatura_id')->nullable(); 
            $table->foreign('nivel_generica_asignatura_id')->references('id')->on('nivel_generica_asignaturas')->onDelete('cascade');
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
        Schema::dropIfExists('generica_evaluaciones');
    }
}
