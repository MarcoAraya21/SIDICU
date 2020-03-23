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
            ['nombre' => 'Ciclo Cientifico Tecnológico','sigla' => 'CCT'],
            ['nombre' => 'Ciclo de Especialización', 'sigla' => 'CE'],
            ['nombre' => 'Ciclo de Titulación','sigla'=> 'CT'],
            ['nombre' => 'Programa de Desarrollo Personal y Social', 'sigla'=>'PPS'],
            ['nombre' => 'Programa de Bienestar Físico y Deportes','sigla'=>''],
            ['nombre' => 'Programa de Inglés', 'sigla' => '']
        ]);
    }
}
