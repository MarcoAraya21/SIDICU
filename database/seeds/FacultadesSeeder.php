<?php

use Illuminate\Database\Seeder;

class FacultadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('facultades')->insert([
            ['nombre' => 'Administración y Economía'],
            ['nombre' => 'Ciencias de la Construcción y Ordenamiento Territorial'],
            ['nombre' => 'Ciencias Naturales, Matemática y del Medio Ambiente'],
            ['nombre' => 'Humanidades y Tecnologías de la Comunicación Social'],
            ['nombre' => 'Ingenieria'],
        ]);
    }
}
