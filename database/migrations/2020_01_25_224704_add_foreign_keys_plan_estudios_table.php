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
            $table->unsignedInteger('tipo_plan_id')->nullable(); 
            $table->foreign('tipo_plan_id')->references('id')->on('tipo_planes');
            $table->unsignedInteger('tipo_ingreso_id')->nullable(); 
            $table->foreign('tipo_ingreso_id')->references('id')->on('tipo_ingresos');
            $table->unsignedInteger('estado_id')->nullable(); 
            $table->foreign('estado_id')->references('id')->on('estados');
            $table->unsignedInteger('modalidad_id')->nullable(); 
            $table->foreign('modalidad_id')->references('id')->on('modalidades');
            $table->unsignedInteger('regimen_id')->nullable(); 
            $table->foreign('regimen_id')->references('id')->on('regimenes');
            $table->unsignedInteger('tipo_formacion_id')->nullable(); 
            $table->foreign('tipo_formacion_id')->references('id')->on('tipo_formaciones');
            $table->unsignedInteger('jornada_id')->nullable(); 
            $table->foreign('jornada_id')->references('id')->on('jornadas');
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
            $table->dropForeign('plan_estudios_tipo_plan_id_foreign');
            $table->dropForeign('plan_estudios_tipo_ingreso_id_foreign');
            $table->dropForeign('plan_estudios_estado_id_foreign');
            $table->dropForeign('plan_estudios_modalidad_id_foreign');
            $table->dropForeign('plan_estudios_regimen_id_foreign');
            $table->dropForeign('plan_estudios_tipo_formacion_id_foreign');
            $table->dropForeign('plan_estudios_jornada_id_foreign');
        });
    }
}
