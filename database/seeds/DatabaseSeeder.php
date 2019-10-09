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
        $this->call(GradosSeeder::class);
        $this->call(CarrerasSeeder::class);
        $this->call(TipoIngresosSeeder::class);
        $this->call(TipoPlanesSeeder::class);
        $this->call(PerfilesSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(DominiosSeeder::class);
        $this->call(CompetenciasSeeder::class);
        $this->call(NivelCompetenciasSeeder::class);
        $this->call(LogroAprendizajesSeeder::class);
    }
}
