<?php

use Illuminate\Database\Seeder;

class TipoPlanesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_planes')->insert([
            ['nombre' => 'Regular'],
            ['nombre' => 'Prosecución']
        ]);
    }
}
