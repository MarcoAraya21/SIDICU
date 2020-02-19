<?php

use Illuminate\Database\Seeder;

class CompetenciasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('competencias')->insert([
            ['descripcion' => 'Aprendizaje a lo largo de la vida.','sigla' => 'CG1' ,'dominio_id' => 1],
            ['descripcion' => 'Capacidad de comunicarse de manera efectiva.', 'sigla' => 'CG2', 'dominio_id' => 1],
            ['descripcion' => 'Habilidades para trabajar colaborativamente y en ambientes multidisciplinarios.', 'sigla' => 'CG3', 'dominio_id' => 1],
            ['descripcion' => 'Iniciativa y actitud proclive al mejoramiento, el emprendimiento y la innovación.', 'sigla' => 'CG4', 'dominio_id' => 1],
            ['descripcion' => 'Compromiso con el bienestar personal y social.', 'sigla' => 'CG5', 'dominio_id' => 1],
            ['descripcion' => 'Competencias para una ciudadanía activa y valoración de la paz y la dignidad humana.', 'sigla' => 'CG6', 'dominio_id' => 1],
            ['descripcion' => 'Compromiso con la sustentabilidad económica, ambiental y social de las acciones de las personas', 'sigla' => 'CG7', 'dominio_id' => 1],
            ['descripcion' => 'Valoración de la ciencia y la tecnología y conciencia de su impacto.', 'sigla' => 'CG8', 'dominio_id' => 1],
            ['descripcion' => 'Valoración de las opciones y metas que surgen en el contexto de un mundo global.', 'sigla' => 'CG9', 'dominio_id' => 1]
        ]);
    }
}
