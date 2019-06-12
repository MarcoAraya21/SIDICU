<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysBibliografiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bibliografias', function (Blueprint $table) {
            $table->unsignedInteger('tipo_bibliografia_id')->nullable(); 
            $table->foreign('tipo_bibliografia_id')->references('id')->on('tipo_bibliografias');
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
        Schema::table('bibliografias', function (Blueprint $table) {
            $table->dropForeign('bibliografias_tipo_bibliografia_id_foreign');
            $table->dropForeign('bibliografias_asignatura_id_foreign');
        });
    }
}
