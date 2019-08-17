<?php

use Illuminate\Database\Seeder;

class TipoIngresosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_ingresos')->insert([
            ['nombre' => 'PSU']
        ]);
    }
}
