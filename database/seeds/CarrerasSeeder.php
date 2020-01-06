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
            ['nombre' => 'Administración Pública', 'cod_demre' => '21089', 'titulo' => 'Administrador Público', 'perfil' => '', 'escuela_id' => 1, 'grado_id' => 1],
            ['nombre' => 'Bibliotecología y Documentación', 'cod_demre' => '21002', 'titulo' => 'Bibliotecario Documentalista', 'perfil' => '', 'escuela_id' => 2, 'grado_id' => 2],
            ['nombre' => 'Contador Público y Auditor', 'cod_demre' => '21012', 'titulo' => 'Contador Público y Auditor', 'perfil' => '', 'escuela_id' => 3, 'grado_id' => 3],
            ['nombre' => 'Ingeniería Comercial', 'cod_demre' => '21048', 'titulo' => 'Ingeniero Comercial, mención Administración de Empresas', 'perfil' => '', 'escuela_id' => 5, 'grado_id' => 4],
            ['nombre' => 'Ingeniería en Administración Agroindustrial', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería en Comercio Internacional', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería en Gestión Turística', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Arquitectura', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería Civil en Obras Civiles', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería Civil en Prevención de Riesgos y Medio Ambiente', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería en Construcción', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería en Biotecnología', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería en Industria Alimentaria', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería Química', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Química Industrial', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Diseño en Comunicación Visual', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Diseño Industrial', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Bachillerato en Ciencias de la Ingeniería', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Dibujante Proyectista', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería Civil Electrónica', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería Civil en Ciencia de Datos', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingenieria Civil en Computacion Mencion Informatica', 'cod_demre' => '21041', 'titulo' => '', 'perfil' => '', 'escuela_id' => 17, 'grado_id' => null],
            ['nombre' => 'Ingeniería Civil en Mecánica', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería Civil Industrial', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería en Geomensura', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería en Informática', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],
            ['nombre' => 'Ingeniería Industrial', 'cod_demre' => '', 'titulo' => '', 'perfil' => '', 'escuela_id' => null, 'grado_id' => null],

        ]);
    }
}
