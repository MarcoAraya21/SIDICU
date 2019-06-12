<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('asignaturas', function (Blueprint $table) {
            $table->unsignedInteger('tipo_asignatura_id')->nullable(); 
            $table->foreign('tipo_asignatura_id')->references('id')->on('tipo_asignaturas');
            $table->unsignedInteger('modalidad_id')->nullable(); 
            $table->foreign('modalidad_id')->references('id')->on('modalidades');
            $table->unsignedInteger('regimen_id')->nullable(); 
            $table->foreign('regimen_id')->references('id')->on('regimenes');
            $table->unsignedInteger('ciclo_id')->nullable(); 
            $table->foreign('ciclo_id')->references('id')->on('ciclos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('asignaturas', function (Blueprint $table) {
            $table->dropForeign('asignaturas_tipo_asignatura_id_foreign');
            $table->dropForeign('asignaturas_modalidad_id_foreign');
            $table->dropForeign('asignaturas_regimen_id_foreign');
            $table->dropForeign('asignaturas_ciclo_id_foreign');
        });
    }
}
