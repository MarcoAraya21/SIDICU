<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysPlanAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plan_asignaturas', function (Blueprint $table) {
            $table->unsignedInteger('plan_estudio_id')->nullable(); 
            $table->foreign('plan_estudio_id')->references('id')->on('plan_estudios');
            $table->unsignedInteger('asignatura_id')->nullable(); 
            $table->foreign('asignatura_id')->references('id')->on('asignaturas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_asignaturas', function (Blueprint $table) {
            $table->dropForeign('plan_asignaturas_plan_estudio_id_foreign');
            $table->dropForeign('plan_asignaturas_asignatura_id_foreign');
        });
    }
}
