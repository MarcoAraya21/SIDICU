<?php

use Illuminate\Database\Seeder;

class TipoHorasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_horas')->insert([
            ['nombre' => 'Aula', 'padre_id' => null],
            ['nombre' => 'Extra Aula', 'padre_id' => null],
            ['nombre' => 'Teoría', 'padre_id' => 1],
            ['nombre' => 'Taller', 'padre_id' => 1],
            ['nombre' => 'Laboratorio', 'padre_id' => 1]

        ]);
    }
}
