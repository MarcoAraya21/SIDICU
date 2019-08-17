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
            ['nombre' => 'Escuela de Informatica', 'facultad_id' => 1]
        ]);
    }
}
