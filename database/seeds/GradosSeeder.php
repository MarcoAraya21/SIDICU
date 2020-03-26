<?php

use Illuminate\Database\Seeder;

class GradosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('grados')->insert([
            ['nombre' => 'No Entrega'],
            // BACHILLER
            ['nombre' => 'Bachiller en Ciencias de la Ingeniería'],
            // LICENCIADOS
            ['nombre' => 'Licenciado en Administración Pública'],
            ['nombre' => 'Licenciado en Administración Turística'],
            ['nombre' => 'Licenciado en Administración y Negocios'],
            ['nombre' => 'Licenciado en Arquitectura'],
            ['nombre' => 'Licenciado en Artes y Ciencias del Diseño Industrial'],
            ['nombre' => 'Licenciado en Artes, Ciencias y Tecnologías de la Comunicación Visual'],
            ['nombre' => 'Licenciado en Bibliotecología y Gestión de Información'],
            ['nombre' => 'Licenciado en Biotecnología'],
            ['nombre' => 'Licenciado en Ciencia y Tecnología de los Alimentos'],
            ['nombre' => 'Licenciado en Ciencias de la Administración de Empresas'],
            ['nombre' => 'Licenciado en Ciencias de la Ingeniería'], 
            ['nombre' => 'Licenciado en Ciencias de la Ingeniería en Construcción'],
            ['nombre' => 'Licenciado en Ciencias de la Ingeniería Química'],
            ['nombre' => 'Licenciado en Ciencias mención Química'],
            ['nombre' => 'Licenciado en Comercio Internacional'],     
            ['nombre' => 'Licenciado en Contabilidad y Auditoría'],
            ['nombre' => 'Licenciado en Ingeniería Industrial'],
            ['nombre' => 'Licenciado en Ingeniería Informática'],
            ['nombre' => 'Licenciado en Trabajo Social'],
            // MAGISTER
            ['nombre' => 'Magíster en Eficiencia Energética y Sustentabilidad'],
            ['nombre' => 'Magíster en Química'],
            ['nombre' => 'Magíster en Tecnología Nuclear'],
            // DOCTORADOS
            ['nombre' => 'Doctor/a en Ciencias de Materiales e Ingeniería de Procesos'],
            
        ]);
    }
}
