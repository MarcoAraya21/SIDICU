<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysAnexosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('anexos', function (Blueprint $table) {
            $table->unsignedInteger('plan_estudio_id')->nullable(); 
            $table->foreign('plan_estudio_id')->references('id')->on('plan_estudios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('anexos', function (Blueprint $table) {
            $table->dropForeign('anexos_plan_estudio_id_foreign');
        });
    }
}
