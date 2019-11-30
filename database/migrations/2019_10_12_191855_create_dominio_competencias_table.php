<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDominioCompetenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dominio_competencias', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('dominio_id')->nullable(); 
            $table->foreign('dominio_id')->references('id')->on('dominios');
            $table->unsignedInteger('competencia_id')->nullable(); 
            $table->foreign('competencia_id')->references('id')->on('competencias');
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
        Schema::dropIfExists('dominio_competencias');
    }
}
