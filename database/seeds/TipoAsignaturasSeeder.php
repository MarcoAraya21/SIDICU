<?php

use Illuminate\Database\Seeder;

class TipoAsignaturasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_asignaturas')->insert([
            ['nombre' => 'Obligatorio'],
            ['nombre' => 'Opcional']
        ]);
    }
}
