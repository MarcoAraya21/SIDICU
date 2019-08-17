<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(FacultadesSeeder::class);
        $this->call(EscuelasSeeder::class);
        $this->call(TipoDominiosSeeder::class);
    }
}
