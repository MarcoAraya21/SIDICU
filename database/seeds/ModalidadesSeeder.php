<?php

use Illuminate\Database\Seeder;

class ModalidadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modalidades')->insert([
            ['nombre' => 'Presencial'],
            ['nombre' => 'Semi Presencial'],
            ['nombre' => 'A Distancia'],
        ]);
    }
}
