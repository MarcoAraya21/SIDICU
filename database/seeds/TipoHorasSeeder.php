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
            ['nombre' => 'Teoría'],
            ['nombre' => 'Taller'],
            ['nombre' => 'Laboratorio'],
            ['nombre' => 'Extra Aula']

        ]);
    }
}
