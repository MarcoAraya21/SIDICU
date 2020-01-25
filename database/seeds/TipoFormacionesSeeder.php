<?php

use Illuminate\Database\Seeder;

class TipoFormacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_formaciones')->insert([
            ['nombre' => 'Técnica'],
            ['nombre' => 'Profesional'],
            ['nombre' => 'Licenciatura']
        ]);
    }
}
