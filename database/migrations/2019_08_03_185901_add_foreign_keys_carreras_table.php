<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysCarrerasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('carreras', function (Blueprint $table) {
            $table->unsignedInteger('escuela_id')->nullable(); 
            $table->foreign('escuela_id')->references('id')->on('escuelas');
            $table->unsignedInteger('grado_id')->nullable(); 
            $table->foreign('grado_id')->references('id')->on('grados');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('carreras', function (Blueprint $table) {
            $table->dropForeign('carreras_escuela_id_foreign');
            $table->dropForeign('carreras_grado_id_foreign');
        });
    }
}
