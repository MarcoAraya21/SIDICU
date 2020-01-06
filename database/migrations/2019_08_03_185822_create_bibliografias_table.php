<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBibliografiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bibliografias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre_autor')->nullable();
            $table->string('apellido_autor')->nullable();
            $table->string('año')->nullable();
            $table->string('titulo')->nullable();
            $table->string('editorial')->nullable();
            $table->string('pais')->nullable();
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
        Schema::dropIfExists('bibliografias');
    }
}
