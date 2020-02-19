<?php

use Illuminate\Database\Seeder;

class NivelCompetenciasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nivel_competencias')->insert([
            ['descripcion' => 'Reconoce técnicas y estrategias de aprendizaje para organizar la información de manera lógica y autónoma, considerando diferentes fuentes de referencia.', 'nivel' => 1, 'competencia_id' => 1],
            ['descripcion' => 'Aplica técnicas y estrategias de aprendizaje para organizar la información en función de su carrera, de manera lógica y autónoma, fortaleciendo la capacidad de aprendizaje a lo largo de la vida.', 'nivel' => 2, 'competencia_id' => 1],
            ['descripcion' => 'Desarrolla estrategias para integrar el aprendizaje continuo, resolviendo problemáticas emergentes en su ámbito profesional de manera innovadora.', 'nivel' => 3, 'competencia_id' => 1],
            ['descripcion' => 'Reconoce la importancia de la comunicación efectiva en sus diversos contextos, para el logro de objetivos en el ámbito académico.', 'nivel' => 1, 'competencia_id' => 2],
            ['descripcion' => 'Aplica técnicas de comunicación efectiva para estructurar discursos en forma oral y escrita en el ámbito académico.', 'nivel' => 2, 'competencia_id' => 2],
            ['descripcion' => 'Diseña discursos orales y escritos relacionados con su ámbito profesional, seleccionando estrategias que permitan comunicarse de manera efectiva con sus receptores. ', 'nivel' => 3, 'competencia_id' => 2],
            ['descripcion' => 'Identifica las características del trabajo colaborativo y los ambientes multidisciplinarios, en su contexto disciplinar.', 'nivel' => 1, 'competencia_id' => 3],
            ['descripcion' => 'Organiza acciones en equipos multidisciplinarios para el logro de objetivos planteados, considerando el contexto de su disciplina.', 'nivel' => 2, 'competencia_id' => 3],
            ['descripcion' => 'Propone estrategias de trabajo colaborativo en el ámbito de su profesión, promoviendo la participación de equipos multidisciplinarios para el logro de los objetivos del proyecto.', 'nivel' => 3, 'competencia_id' => 3],
            ['descripcion' => 'Identifica las acciones relacionadas con el  mejoramiento, el emprendimiento y/o la innovación en su contexto disciplinar.', 'nivel' => 1, 'competencia_id' => 4],
            ['descripcion' => 'Desarrolla acciones relacionadas con el mejoramiento el emprendimiento y/o la innovación, utilizando el conocimiento propio de su disciplina.', 'nivel' => 2, 'competencia_id' => 4],
            ['descripcion' => 'Crea proyectos de mejora, emprendimiento y/o innovación para abordar situaciones complejas que surgen en su ámbito profesional.', 'nivel' => 3, 'competencia_id' => 4],
            ['descripcion' => 'Identifica diversos principios del bienestar personal según el contexto disciplinar.', 'nivel' => 1, 'competencia_id' => 5],
            ['descripcion' => 'Demuestra compromiso con el bienestar social, adhiriendo a acciones de cuidado colectivas en el contexto de su disciplina.', 'nivel' => 2, 'competencia_id' => 5],
            ['descripcion' => 'Valora el bienestar físico y personal generando estrategias que impacten positivamente en su entorno laboral, para el logro de los objetivos de un proyecto.', 'nivel' => 3, 'competencia_id' => 5],
            ['descripcion' => 'Asocia el desarrollo profesional con una ciudadanía activa, que valora la paz y respeta la dignidad humana.', 'nivel' => 1, 'competencia_id' => 6],
            ['descripcion' => 'Distingue aspectos de la ciudadanía activa, la valoración de la paz y el respeto por la dignidad humana en su desarrollo profesional.', 'nivel' => 2, 'competencia_id' => 6],
            ['descripcion' => 'Diseña estrategias que evidencien un compromiso ciudadano, considerando ciudadanía activa, la paz sustentada en el respeto y la dignidad humana en su ámbito profesional.', 'nivel' => 3, 'competencia_id' => 6],
            ['descripcion' => 'Reconoce la importancia de los principios de la sustentabilidad y de la responsabilidad social para promover el bienestar humano desde su campo disciplinar.', 'nivel' => 1, 'competencia_id' => 7],
            ['descripcion' => 'Aplica principios relacionados con la sustentabilidad y la responsabilidad social en el contexto de su disciplina.', 'nivel' => 2, 'competencia_id' => 7],
            ['descripcion' => 'Integra los principios de la sustentabilidad y la responsabilidad social en el ámbito personal y profesional para contribuir al bienestar humano.', 'nivel' => 3, 'competencia_id' => 7],
            ['descripcion' => 'Reconoce el aporte de la ciencia y la tecnología en la resolución de problemas vinculados a su campo disciplinar.', 'nivel' => 1, 'competencia_id' => 8],
            ['descripcion' => 'Analiza problemas  relacionados con el ámbito científico-tecnológico, vinculados con su campo disciplinar.', 'nivel' => 2, 'competencia_id' => 8],
            ['descripcion' => 'Evalúa el aporte de la ciencia y la tecnología en la sociedad, considerando herramientas tecnológicas que den solución a problemáticas propias de su ámbito profesional.', 'nivel' => 3, 'competencia_id' => 8],
            ['descripcion' => 'Reconoce las posibilidades y problemáticas que surgen en el mundo globalizado, identificando el impacto en su campo disciplinar.', 'nivel' => 1, 'competencia_id' => 9],
            ['descripcion' => 'Analiza tendencias y problemáticas que emergen de un mundo globalizado desde su campo disciplinar.', 'nivel' => 2, 'competencia_id' => 9],
            ['descripcion' => 'Evalúa el rol de su profesión desde la mirada del mundo global, considerando las metas y opciones que ésta presenta.', 'nivel' => 3, 'competencia_id' => 9],        
        ]);
    }
}
