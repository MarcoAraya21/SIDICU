<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsignaturaMetodologiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asignatura_metodologias', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('asignatura_id')->nullable(); 
            $table->foreign('asignatura_id')->references('id')->on('asignaturas')->onDelete('cascade');
            $table->unsignedInteger('metodologia_id')->nullable(); 
            $table->foreign('metodologia_id')->references('id')->on('metodologias');
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
        Schema::dropIfExists('asignatura_metodologias');
    }
}
