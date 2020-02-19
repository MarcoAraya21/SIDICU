<?php

use Illuminate\Database\Seeder;

class CiclosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ciclos')->insert([
            ['nombre' => 'Ciclo Cientifico Tecnológico'],
            ['nombre' => 'Ciclo de Especialización'],
            ['nombre' => 'Ciclo de Titulación'],
            ['nombre' => 'Programa de Desarrollo Personal y Social'],
            ['nombre' => 'Programa de Bienestar Físico y Deportes'],
            ['nombre' => 'Programa de Inglés']
        ]);
    }
}
