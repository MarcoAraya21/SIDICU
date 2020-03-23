<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNivelGenericaAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_generica_asignaturas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('nivel_generica_id')->nullable(); 
            $table->foreign('nivel_generica_id')->references('id')->on('nivel_genericas')->onDelete('cascade');
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
        Schema::dropIfExists('nivel_generica_asignaturas');
    }
}
