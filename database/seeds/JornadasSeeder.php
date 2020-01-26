<?php

use Illuminate\Database\Seeder;

class JornadasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('jornadas')->insert([
            ['nombre' => 'Diurna'],
            ['nombre' => 'Vespertina']
        ]);
    }
}
