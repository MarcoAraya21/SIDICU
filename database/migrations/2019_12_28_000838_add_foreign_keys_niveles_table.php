<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysNivelesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('niveles', function (Blueprint $table) {
            $table->unsignedInteger('plan_estudio_id')->nullable(); 
            $table->foreign('plan_estudio_id')->references('id')->on('plan_estudios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('niveles', function (Blueprint $table) {
            $table->dropForeign('niveles_plan_estudio_id_foreign');
        });
    }
}