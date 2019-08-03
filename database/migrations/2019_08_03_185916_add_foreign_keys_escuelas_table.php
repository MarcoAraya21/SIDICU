<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysEscuelasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('escuelas', function (Blueprint $table) {
            $table->unsignedInteger('facultad_id')->nullable(); 
            $table->foreign('facultad_id')->references('id')->on('facultades');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('escuelas', function (Blueprint $table) {
            $table->dropForeign('escuelas_facultad_id_foreign');
        });
    }
}
