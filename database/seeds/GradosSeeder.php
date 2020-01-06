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
            ['nombre' => 'Licenciado en Administración Pública', 'perfil' => ''],
            ['nombre' => 'Licenciado en Bibliotecología y Gestión de Información', 'perfil' => ''],
            ['nombre' => 'Licenciado en Contabilidad y Auditoría', 'perfil' => ''],
            ['nombre' => 'Licenciado en Ciencias de la Administración de Empresas', 'perfil' => ''],
            ['nombre' => 'Licenciado en Administración y Negocios', 'perfil' => ''],
            ['nombre' => 'Licenciado en Comercio Internacional', 'perfil' => ''],
            ['nombre' => 'Licenciado en Administración Turística', 'perfil' => ''],
            ['nombre' => 'Licenciado en Contabilidad y Auditoría', 'perfil' => ''],


        ]);
    }
}
