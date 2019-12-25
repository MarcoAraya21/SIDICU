<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysLogroAprendizajesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('logro_aprendizajes', function (Blueprint $table) {
            $table->unsignedInteger('nivel_competencia_id')->nullable(); 
            $table->foreign('nivel_competencia_id')->references('id')->on('nivel_competencias')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('logro_aprendizajes', function (Blueprint $table) {
            $table->dropForeign('logro_aprendizajes_nivel_competencia_id_foreign');
        });
    }
}