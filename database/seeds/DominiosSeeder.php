<?php

use Illuminate\Database\Seeder;

class DominiosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dominios')->insert([
            ['nombre' => 'Generico', 'plan_estudio_id' => null, 'tipo_dominio_id' => 2]
        ]);
    }
}
