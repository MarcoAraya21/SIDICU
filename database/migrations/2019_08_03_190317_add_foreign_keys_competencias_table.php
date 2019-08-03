<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysCompetenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('competencias', function (Blueprint $table) {
            $table->unsignedInteger('dominio_id')->nullable(); 
            $table->foreign('dominio_id')->references('id')->on('dominios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('competencias', function (Blueprint $table) {
            $table->dropForeign('competencias_dominio_id_foreign');
        });
    }
}
