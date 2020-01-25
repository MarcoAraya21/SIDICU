<?php

use Illuminate\Database\Seeder;

class TipoGradosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_grados')->insert([
            ['nombre' => 'Pregrado'],
            ['nombre' => 'Postgrado']
        ]);
    }
}
