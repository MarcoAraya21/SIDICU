<?php

use Illuminate\Database\Seeder;

class EscuelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('escuelas')->insert([
            ['nombre' => 'Administración', 'facultad_id' => 1],
            ['nombre' => 'Bibliotecología', 'facultad_id' => 1],
            ['nombre' => 'Contadores Auditores', 'facultad_id' => 1],
            ['nombre' => 'Comercio Internacional', 'facultad_id' => 1],
            ['nombre' => 'Ingeniería Comercial', 'facultad_id' => 1],
            ['nombre' => 'Arquitectura', 'facultad_id' => 2],
            ['nombre' => 'Construcción Civil', 'facultad_id' => 2],
            ['nombre' => 'Prevención de Riesgos y Medio Ambiente', 'facultad_id' => 2],
            ['nombre' => 'Industria Alimentaria y Biotecnología', 'facultad_id' => 3],
            ['nombre' => 'Química', 'facultad_id' => 3],
            ['nombre' => 'Cartografía', 'facultad_id' => 4],
            ['nombre' => 'Diseño', 'facultad_id' => 4],
            ['nombre' => 'Trabajo Social', 'facultad_id' => 4],
            ['nombre' => 'Electrónica', 'facultad_id' => 5],
            ['nombre' => 'Geomensura', 'facultad_id' => 5],
            ['nombre' => 'Industria', 'facultad_id' => 5],
            ['nombre' => 'Informática', 'facultad_id' => 5],
            ['nombre' => 'Mecánica', 'facultad_id' => 5],
            ['nombre' => 'Transporte y Tránsito', 'facultad_id' => 5],
        ]);
    }
}
