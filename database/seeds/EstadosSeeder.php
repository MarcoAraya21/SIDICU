<?php

use Illuminate\Database\Seeder;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('estados')->insert([
            // DE USUARIO
            ['nombre' => 'Pendiente'],
            ['nombre' => 'En Proceso'],
            ['nombre' => 'Revision'],
            ['nombre' => 'Aprobado']
        ]);
    }
}
