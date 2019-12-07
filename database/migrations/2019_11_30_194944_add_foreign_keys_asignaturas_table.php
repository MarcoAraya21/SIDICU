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
            $table->unsignedInteger('departamento_id')->nullable(); 
            $table->foreign('departamento_id')->references('id')->on('departamentos');
            $table->unsignedInteger('nivel_competencia_id')->nullable(); 
            $table->foreign('nivel_competencia_id')->references('id')->on('nivel_competencias');
            $table->unsignedInteger('plan_estudio_nivel_competencia_id')->nullable(); 
            $table->foreign('plan_estudio_nivel_competencia_id')->references('id')->on('plan_estudio_nivel_competencias');
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
            $table->dropForeign('asignaturas_departamento_id_foreign');
            $table->dropForeign('asignaturas_nivel_competencia_id_foreign');
            $table->dropForeign('asignaturas_plan_estudio_nivel_competencia_id_foreign');
        });
    }
}
