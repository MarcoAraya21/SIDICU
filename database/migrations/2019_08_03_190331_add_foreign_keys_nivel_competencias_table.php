<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysNivelCompetenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('nivel_competencias', function (Blueprint $table) {
            $table->unsignedInteger('competencia_id')->nullable(); 
            $table->foreign('competencia_id')->references('id')->on('competencias');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('nivel_competencias', function (Blueprint $table) {
            $table->dropForeign('nivel_competencias_competencia_id_foreign');
        });
    }
}
