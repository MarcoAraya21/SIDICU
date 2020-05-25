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
            $table->unsignedInteger('ciclo_id')->nullable(); 
            $table->foreign('ciclo_id')->references('id')->on('ciclos');
            $table->unsignedInteger('departamento_id')->nullable(); 
            $table->foreign('departamento_id')->references('id')->on('departamentos');
            $table->unsignedInteger('nivel_id')->nullable(); 
            $table->foreign('nivel_id')->references('id')->on('niveles')->onDelete('cascade');
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
            $table->dropForeign('asignaturas_ciclo_id_foreign');
            $table->dropForeign('asignaturas_departamento_id_foreign');
            $table->dropForeign('asignaturas_nivel_id_foreign');
        });
    }
}
