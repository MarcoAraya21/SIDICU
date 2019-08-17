<?php

use Illuminate\Database\Seeder;

class CarrerasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('carreras')->insert([
            ['nombre' => 'Ingenieria Civil en Computacion Mencion Informatica', 'cod_demre' => '21041', 'titulo' => '', 'perfil' => '', 'escuela_id' => 1, 'grado_id' => 1]
        ]);
    }
}
