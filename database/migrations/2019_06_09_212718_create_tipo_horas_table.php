<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTipoHorasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_horas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');         
            $table->unsignedInteger('padre_id')->nullable();
            $table->foreign('padre_id')->references('id')->on('tipo_horas');
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
        Schema::dropIfExists('tipo_horas');
    }
}
