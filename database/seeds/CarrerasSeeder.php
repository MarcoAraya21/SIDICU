<?php

use Illuminate\Database\Seeder;

class CarrerasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('carreras')->insert([
            ['nombre' => 'Bachillerato en Ciencias de la Ingeniería', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 2, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Administración Pública', 'cod_demre' => '21089', 'titulo' => 'Administrador Público', 'escuela_id' => 1, 'grado_id' => 3, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Arquitectura', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 6, 'grado_id' => 6, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Bibliotecología y Documentación', 'cod_demre' => '21002', 'titulo' => 'Bibliotecario Documentalista', 'escuela_id' => 2, 'grado_id' => 9, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Contador Público y Auditor', 'cod_demre' => '21012', 'titulo' => 'Contador Público y Auditor', 'escuela_id' => 3, 'grado_id' => 18, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Dibujante Proyectista', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 12, 'grado_id' => 1, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Diseño en Comunicación Visual', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 12, 'grado_id' => 8, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Diseño Industrial', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 12, 'grado_id' => 7, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Comercial', 'cod_demre' => '21048', 'titulo' => 'Ingeniero Comercial, mención Administración de Empresas', 'escuela_id' => 5, 'grado_id' => 12, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Administración Agroindustrial', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 9, 'grado_id' => 12, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Biotecnología', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 10, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Comercio Internacional', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 3, 'grado_id' => 17, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Construcción', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 7, 'grado_id' => 14, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Gestión Turística', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 4, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Industria Alimentaria', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 9, 'grado_id' => 11, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Geomensura', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 15, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Informática', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 17, 'grado_id' => 20, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería en Transporte y Tránsito', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 19, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Civil en Ciencia de Datos', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 17, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Civil en Mecánica', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 18, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Civil en Obras Civiles', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Civil en Prevención de Riesgos y Medio Ambiente', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 8, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Civil Electrónica', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 14, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingenieria Civil en Computacion Mencion Informática', 'cod_demre' => '21041', 'titulo' => '', 'escuela_id' => 17, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Civil Industrial', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 16, 'grado_id' => 13, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Industrial', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 16, 'grado_id' => 19, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Ingeniería Química', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 10, 'grado_id' => 15, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Química Industrial', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 10, 'grado_id' => 16, 'tipo_grado_id' => 1, 'estado_id' => 4],
            ['nombre' => 'Trabajo Social', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => 13, 'grado_id' => 21, 'tipo_grado_id' => 1, 'estado_id' => 4],
            // MAGISTER
            ['nombre' => 'Magíster en Eficiencia Energética y Sustentabilidad', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 22, 'tipo_grado_id' => 2, 'estado_id' => 4],
            ['nombre' => 'Magíster en Química', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 23, 'tipo_grado_id' => 2, 'estado_id' => 4],
            ['nombre' => 'Magíster en Tecnología Nuclear', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 24, 'tipo_grado_id' => 2, 'estado_id' => 4],
            // DOCTORADO
            ['nombre' => 'Doctorado en Ciencias de los Materiales e Ingeniería de Procesos', 'cod_demre' => '', 'titulo' => '', 'escuela_id' => null, 'grado_id' => 25, 'tipo_grado_id' => 2, 'estado_id' => 4],
        ]);
    }
}
