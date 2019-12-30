<?php

use Illuminate\Database\Seeder;

class TipoBibliografiasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_bibliografias')->insert([
            ['nombre' => 'Básica'],
            ['nombre' => 'Complementaria']
        ]);
    }
}
