<?php

use Illuminate\Database\Seeder;

class EvaluacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('evaluaciones')->insert([
            ['nombre' => 'Controles'],
            ['nombre' => 'Pruebas'],
            ['nombre' => 'Trabajos prácticos con presentación oral'],
            ['nombre' => 'Estudios de caso'],
            ['nombre' => 'Quiz']
        ]);
    }
}
