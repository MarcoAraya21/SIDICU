<?php

use Illuminate\Database\Seeder;

class MetodologiasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('metodologias')->insert([
            ['nombre' => 'Aprendizaje Basado en Investigación'],
            ['nombre' => 'Método de Proyecto'],
            ['nombre' => 'Método de Caso'],
            ['nombre' => 'Aprendizaje Basado en Problemas'],
            ['nombre' => 'Método Expositivo Centrado en el/la Estudiante (MECE)'],
            ['nombre' => 'Método de Aula Invertida'],
            ['nombre' => 'Enseñanza Mediante la Interpelación Cognitiva'],
            ['nombre' => 'Aprendizaje + Servicio']
        ]);
    }
}
