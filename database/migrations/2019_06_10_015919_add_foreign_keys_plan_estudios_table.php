<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysPlanEstudiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plan_estudios', function (Blueprint $table) {
            $table->unsignedInteger('carrera_id')->nullable(); 
            $table->foreign('carrera_id')->references('id')->on('carreras');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_estudios', function (Blueprint $table) {
            $table->dropForeign('plan_estudios_carrera_id_foreign');
        });
    }
}
