<?php

use Illuminate\Database\Seeder;

class TipoDominiosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_dominios')->insert([
            ['nombre' => 'Especialidad'],
            ['nombre' => 'Generico']
        ]);
    }
}
