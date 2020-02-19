<?php

use Illuminate\Database\Seeder;

class DepartamentosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('departamentos')->insert([
            ['nombre' => 'Contabilidad y Gestión Financiera', 'facultad_id' => 1],
            ['nombre' => 'Economía, Recursos Naturales y Comercio Internacional', 'facultad_id' => 1],
            ['nombre' => 'Estadística y Econometría', 'facultad_id' => 1],
            ['nombre' => 'Gestión de la Información', 'facultad_id' => 1],
            ['nombre' => 'Gestión Organizacional', 'facultad_id' => 1],
            ['nombre' => 'Ciencias de la Construcción', 'facultad_id' => 2],
            ['nombre' => 'Planificación y Ordenamiento Territorial', 'facultad_id' => 2],
            ['nombre' => 'Prevención de Riesgos y Medio Ambiente', 'facultad_id' => 2],
            ['nombre' => 'Biotecnología', 'facultad_id' => 3],
            ['nombre' => 'Física', 'facultad_id' => 3],
            ['nombre' => 'Matemáticas', 'facultad_id' => 3],
            ['nombre' => 'Química', 'facultad_id' => 3],
            ['nombre' => 'Cartografía', 'facultad_id' => 4],
            ['nombre' => 'Diseño', 'facultad_id' => 4],
            ['nombre' => 'Humanidades', 'facultad_id' => 4],
            ['nombre' => 'Trabajo Social', 'facultad_id' => 4],
            ['nombre' => 'Electricidad', 'facultad_id' => 5],
            ['nombre' => 'Industria', 'facultad_id' => 5],
            ['nombre' => 'Informática y Computación', 'facultad_id' => 5],
            ['nombre' => 'Mecánica', 'facultad_id' => 5]
        ]);
    }
}
