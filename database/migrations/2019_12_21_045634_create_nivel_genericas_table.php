<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNivelGenericasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_genericas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('plan_estudio_id')->nullable(); 
            $table->foreign('plan_estudio_id')->references('id')->on('plan_estudios');
            $table->unsignedInteger('nivel_competencia_id')->nullable(); 
            $table->foreign('nivel_competencia_id')->references('id')->on('nivel_competencias');
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
        Schema::dropIfExists('nivel_genericas');
    }
}
