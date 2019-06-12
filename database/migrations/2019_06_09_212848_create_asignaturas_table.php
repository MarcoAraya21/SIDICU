<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asignaturas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->string('codigo');
            $table->tinyInteger('sct_chile');
            $table->text('descripcion');
            $table->text('metodologia');
            $table->text('ambientes');
            $table->text('perfil_docente');
            $table->text('perfil_ayudante');
            $table->unsignedInteger('requisito_id')->nullable();
            $table->foreign('requisito_id')->references('id')->on('asignaturas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('asignaturas');
    }
}
