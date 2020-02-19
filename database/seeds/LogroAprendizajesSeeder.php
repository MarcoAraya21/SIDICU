<?php

use Illuminate\Database\Seeder;

class LogroAprendizajesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('logro_aprendizajes')->insert([
            ['descripcion' => 'Selecciona diversas fuentes de información para enriquecer su aprendizaje autónomo.', 'nivel_competencia_id' => 1],
            ['descripcion' => 'Compara información sobre la base de reglas y secuencias lógicas. ', 'nivel_competencia_id' => 1],
            ['descripcion' => 'Interpreta problemas concretos relativos a su ámbito disciplinar a través de razonamiento lógico.', 'nivel_competencia_id' => 1],
            ['descripcion' => 'Organiza información relacionada con su área de conocimiento en forma autónoma para fortalecer su propio aprendizaje.', 'nivel_competencia_id' => 2],
            ['descripcion' => 'Aplica técnicas y estrategias de aprendizaje, organizando la información de su disciplina de manera lógica y autónoma.', 'nivel_competencia_id' => 2],
            ['descripcion' => 'Desarrolla técnicas y estrategias para trabajar en forma autónoma en función de su ámbito disciplinar.', 'nivel_competencia_id' => 2],
            ['descripcion' => 'Investiga en diferentes fuentes de información, temas emergentes de su profesión para aportar propuestas y soluciones a problemáticas de su ámbito disciplinar.', 'nivel_competencia_id' => 3],
            ['descripcion' => 'Genera estrategias de aprendizaje autónomo utilizando sus conocimientos teóricos y tecnológicos, para resolver problemáticas emergentes de su disciplina de forma innovadora.', 'nivel_competencia_id' => 3],
            ['descripcion' => 'Identifica elementos de la comunicación efectiva que intervienen en la interacción verbal y no verbal.', 'nivel_competencia_id' => 4],
            ['descripcion' => 'Compara discursos académicos y no académicos orales y escritos, considerando elementos de la comunicación efectiva.', 'nivel_competencia_id' => 4],
            ['descripcion' => 'Formula discursos orales y escritos para comunicarse efectivamente en el contexto académico.', 'nivel_competencia_id' => 4],
            ['descripcion' => 'Utiliza la  comunicación efectiva para estructurar discursos de forma oral y escrita en el ámbito académico.', 'nivel_competencia_id' => 5],
            ['descripcion' => 'Plantea formalmente ideas de manera oral y escrita, considerando el contexto disciplinar en el que se desenvuelve.', 'nivel_competencia_id' => 5],
            ['descripcion' => 'Argumenta en forma oral y escrita demostrando habilidades de comunicación efectiva para desenvolverse en diversos contextos y con distintos receptores.', 'nivel_competencia_id' => 6],
            ['descripcion' => 'Construye discursos orales y escritos utilizando elementos de la comunicación efectiva de acuerdo al  contexto y los receptores con los que interactúa.', 'nivel_competencia_id' => 6],
            ['descripcion' => 'Identifica las características del trabajo colaborativo para el logro de objetivos individuales y colectivos, en el contexto de ambientes multidisciplinarios.', 'nivel_competencia_id' => 7],
            ['descripcion' => 'Reconoce la importancia de los ambientes multidisciplinarios en el contexto de su disciplina para la creación de proyectos y logro de metas.', 'nivel_competencia_id' => 7],
            ['descripcion' => 'Aplica técnicas de trabajo colaborativo, considerando las tareas que le son asignadas en contextos multidisciplinarios.', 'nivel_competencia_id' => 8],
            ['descripcion' => 'Desarrolla acciones específicas para el logro de objetivos planteados en equipos multidisciplinarios.', 'nivel_competencia_id' => 8],
            ['descripcion' => 'Desarrolla proyectos en equipos multidisciplinares considerando temáticas relacionadas con su ámbito profesional.', 'nivel_competencia_id' => 9],
            ['descripcion' => 'Diseña estrategias de trabajo colaborativo, considerando las acciones, logros, puntos críticos y productos a realizar para optimizar sus resultados.', 'nivel_competencia_id' => 9],
            ['descripcion' => 'Reconoce en su disciplina diversos mecanismos propios del mejoramiento, el emprendimiento y la innovación.', 'nivel_competencia_id' => 10],
            ['descripcion' => 'Identifica la importancia del mejoramiento, el emprendimiento y la innovación para el crecimiento profesional, de las organizaciones y del país.', 'nivel_competencia_id' => 10],
            ['descripcion' => 'Analiza casos de mejoramiento, emprendimiento e innovación desde la perspectiva de su disciplina y considerando el contexto en que éstos ocurren.', 'nivel_competencia_id' => 11],
            ['descripcion' => 'Aplica acciones de mejoramiento, emprendimiento e innovación a situaciones propias de su disciplina, considerando el contexto en que estas ocurren.', 'nivel_competencia_id' => 11],
            ['descripcion' => 'Evalúa problemáticas de su campo profesional, analizando riesgos y oportunidades para proponer estrategias de mejoramiento, emprendimiento y/o innovación.', 'nivel_competencia_id' => 12],
            ['descripcion' => 'Diseña proyectos orientados al mejoramiento, emprendimiento y/o la innovación de situaciones complejas pertenecientes a su ámbito profesional.', 'nivel_competencia_id' => 12],
            ['descripcion' => 'Describe diversos principios del bienestar personal según el contexto de su disciplina.', 'nivel_competencia_id' => 13],
            ['descripcion' => 'Reconoce acciones de autocuidado asociadas al bienestar personal en el contexto de su disciplina.', 'nivel_competencia_id' => 13],
            ['descripcion' => 'Desarrolla acciones de cuidado colectivas para potenciar el bienestar social, en el contexto de su disciplina.', 'nivel_competencia_id' => 14],
            ['descripcion' => 'Desarrolla estrategias promotoras del bienestar social en el contexto de su disciplina.', 'nivel_competencia_id' => 14],
            ['descripcion' => 'Plantea propuestas relativas al cuidado colectivo para promover el bienestar social, en el contexto de su disciplina.', 'nivel_competencia_id' => 14],
            ['descripcion' => 'Evalúa propuestas de su ámbito profesional considerando el bienestar personal y social en el contexto de su disciplina.', 'nivel_competencia_id' => 15],
            ['descripcion' => 'Diseña propuestas considerando el bienestar personal y social de los sujetos que actúan en su ámbito profesional.', 'nivel_competencia_id' => 15],
            ['descripcion' => 'Identifica los principios de la ciudadanía activa que se relacionan con su desarrollo profesional.', 'nivel_competencia_id' => 16],
            ['descripcion' => 'Define los principios de la valoración de la paz que se relacionan con su desarrollo profesional.', 'nivel_competencia_id' => 16],
            ['descripcion' => 'Describe los principios del respeto de la dignidad humana que se relacionan con su desarrollo profesional.', 'nivel_competencia_id' => 16],
            ['descripcion' => 'Analiza desde la perspectiva de la ciudadanía activa y la valoración de la paz y la dignidad humana, situaciones propias de su campo profesional.', 'nivel_competencia_id' => 17],
            ['descripcion' => 'Compara situaciones propias del campo profesional desde la perspectiva  de la dignidad humana y la valoración de la paz.', 'nivel_competencia_id' => 17],
            ['descripcion' => 'Evalúa la ciudadanía activa, la paz sustentada en el respeto y la dignidad humana a través de acciones relacionadas con su ámbito profesional.', 'nivel_competencia_id' => 18],
            ['descripcion' => 'Propone acciones propias de su campo profesional, considerando los aspectos de una ciudadanía activa y la paz sustentada en la dignidad humana.', 'nivel_competencia_id' => 18],
            ['descripcion' => 'Describe conceptualizaciones ambientales y principios fundamentales de la sustentabilidad y la responsabilidad social en el contexto de su disciplina.', 'nivel_competencia_id' => 19],
            ['descripcion' => 'Identifica acuerdos, internacionales relacionados con la sustentabilidad y la responsabilidad social en su contexto disciplinar.', 'nivel_competencia_id' => 19],
            ['descripcion' => 'Distingue buenas prácticas relacionadas con su disciplina en el ámbito de la sustentabilidad.', 'nivel_competencia_id' => 19],
            ['descripcion' => 'Analiza principios relacionados con la sustentabilidad y responsabilidad social en el contexto de su campo disciplinar.', 'nivel_competencia_id' => 20],
            ['descripcion' => 'Plantea acciones relacionadas con los principios de la sustentabilidad y la responsabilidad social para problemas propios de su disciplina', 'nivel_competencia_id' => 20],
            ['descripcion' => 'Evalúa la aplicación de los principios de sustentabilidad y responsabilidad social, vinculándolos a su ámbito personal y profesional.', 'nivel_competencia_id' => 21],
            ['descripcion' => 'Diseña estrategias relacionadas con la sustentabilidad y la responsabilidad social para contribuir al bienestar humano.', 'nivel_competencia_id' => 21],
            ['descripcion' => 'Reconoce el aporte de la ciencia a la sociedad en el contexto de en su ámbito profesional.', 'nivel_competencia_id' => 22],
            ['descripcion' => 'Identifica los efectos de la ciencia y la tecnología en la sociedad contemporánea, en el contexto de su ámbito profesional.', 'nivel_competencia_id' => 22],
            ['descripcion' => 'Explica la importancia de la ciencia y la tecnología en la resolución de problemas de su ámbito profesional.', 'nivel_competencia_id' => 22],
            ['descripcion' => 'Examina información del ámbito científico- tecnológico relacionados con su disciplina.', 'nivel_competencia_id' => 23],
            ['descripcion' => 'Aplica estrategias de resolución de problemas en el ámbito científico – tecnológico en contextos asociados a su disciplina.', 'nivel_competencia_id' => 23],
            ['descripcion' => 'Plantea conclusiones utilizando información científica – tecnológico en contextos asociados a su disciplina.', 'nivel_competencia_id' => 23],
            ['descripcion' => 'Diseña estrategias que consideren la ciencia y la tecnología, para dar soluciones a problemáticas de la sociedad y/o de su disciplina.', 'nivel_competencia_id' => 24],
            ['descripcion' => 'Propone acciones utilizando herramientas tecnológicas para dar soluciones a problemáticas de la sociedad y/o de su disciplina.', 'nivel_competencia_id' => 24],
            ['descripcion' => 'Identifica las posibilidades que genera un mundo globalizado, en el contexto de su disciplina.', 'nivel_competencia_id' => 25],
            ['descripcion' => 'Comprende las problemáticas que genera un mundo globalizado, en el contexto de su disciplina.', 'nivel_competencia_id' => 25],
            ['descripcion' => 'Relaciona las posibilidades y problemáticas de  la globalización con su ámbito disciplinar.', 'nivel_competencia_id' => 25],
            ['descripcion' => 'Analiza las necesidades actuales del mundo global relacionadas con su especialidad, utilizando herramientas propias de su disciplina.', 'nivel_competencia_id' => 26],
            ['descripcion' => 'Compara las tendencias globales relacionadas con su disciplina para identificar posibles ámbitos de mejora.', 'nivel_competencia_id' => 26],
            ['descripcion' => 'Desarrolla acciones que le permiten informarse sobre las tendencias globales de su campo disciplinar, considerándolas en sus trabajos académicos.', 'nivel_competencia_id' => 27],
            ['descripcion' => 'Evalúa oportunidades generadas por la globalización para mejorar sus futuras posibilidades profesionales.', 'nivel_competencia_id' => 27]
        ]);
    }
}
