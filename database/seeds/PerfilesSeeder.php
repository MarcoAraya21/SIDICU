<?php

use Illuminate\Database\Seeder;

class PerfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('perfiles')->insert([
            ['nombre' => 'Administrador'],
            ['nombre' => 'Jefe UIC'],
            ['nombre' => 'Asesor UIC'],
            ['nombre' => 'Academico'],
            ['nombre' => 'Invitado']
        ]);
    }
}
