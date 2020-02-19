<?php

use Illuminate\Database\Seeder;

class GradosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('grados')->insert([
            ['nombre' => 'Licenciado en Administración Pública'],
            ['nombre' => 'Licenciado en Bibliotecología y Gestión de Información'],
            ['nombre' => 'Licenciado en Contabilidad y Auditoría'],
            ['nombre' => 'Licenciado en Ciencias de la Administración de Empresas'],
            ['nombre' => 'Licenciado en Administración y Negocios'],
            ['nombre' => 'Licenciado en Comercio Internacional'],
            ['nombre' => 'Licenciado en Administración Turística'],
            ['nombre' => 'Licenciado en Contabilidad y Auditoría'],


        ]);
    }
}
