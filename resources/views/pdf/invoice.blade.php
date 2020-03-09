@extends('layouts.pdf', ['paceTop' => true, 'bodyExtraClass' => 'bg-white'])

@section('title', 'Login Page')


@push('css')
	<link href="public/assets/css/bundle.css" rel="stylesheet" />
	<link href="public/assets/css/estilos.css" rel="stylesheet" />
@endpush


@section('content')
    <div class="news-feed">
		<div class="news-caption">
			<h1 class="center">Plan de Estudios</h1>

			<table>
			 	<tr>
				 	<td>Nombre del Plan</td>
					<td colspan="5">{{ $PlanEstudio->nombre }}</td>
				</tr>
				<tr>
					<td>Unidad Responsable</td>
					<td></td>
					<td>Código</td>
					<td colspan="3"></td>
				</tr>
				<tr>
					<td>Facultad</td>
					<td></td>
					<td>Semestres totales</td>
					<td></td>
					<td>SCT Totales</td>
					<td></td>
				</tr>
				<tr>
					<td class="celda-vacia" colspan="6"></td>
				</tr>
				<tr class="center">
					<td>Instancia de Validación</td>
					<td colspan="2">Vº Bº Firma y Timbre</td>
					<td colspan="3">Fecha VºBº</td>
				</tr>
				<tr class="center">
					<td>Unidad responsable</td>
					<td colspan="2"></td>
					<td colspan="3"></td>
				</tr>
				<tr class="center">
					<td>Consejo Facultad</td>
					<td colspan="2"></td>
					<td colspan="3"></td>
				</tr>
				<tr class="center">
					<td>VRAC</td>
					<td colspan="2"></td>
					<td colspan="3"></td>
				</tr>
				<tr class="center">
					<td>Consejo Académico</td>
					<td colspan="2"></td>
					<td colspan="3"></td>
				</tr>
				<tr class="center">
					<td>Consejo Superior</td>
					<td colspan="2"></td>
					<td colspan="3"></td>
				</tr>
			</table>

			<div class="page-break"></div>

			<h2 class="center">ESTRUCTURA DE PRESENTACIÓN DE PROYECTOS DE PREGRADO Y GRADO ACADÉMICO</h2>

			<p><b>Anexo A:</b> IDENTIFICACIÓN DEL PLAN DE ESTUDIO</p>
			<p><b>Anexo B:</b> ANTECEDENTES DEL PLAN DE ESTUDIO</p>
			<p><b>Anexo C:</b> PLAN DE ESTUDIOS</p>
			<p><b>Anexo D:</b> PROGRAMAS DE ACTIVIDADES CURRICULARES</p>
			<p><b>Anexo E:</b> REGLAMENTO PLAN DE ESTUDIOS</p>
			<p><b>Anexo F:</b> DESCRIPCIÓN DEL MERCADO</p>
			<p><b>Anexo G:</b> PRESUPUESTO PLAN DE ESTUDIOS</p>

			<div class="page-break"></div>

			<table>
				<tr>
					<td colspan="2">NOMBRE DEL PLAN DE ESTUDIO</td>
				</tr>
				<tr class="center">
					<td colspan="2">{{$PlanEstudio->nombre}}</td>
				</tr>
				<tr class="center">
					<td colspan="2">{{$PlanEstudio->tipo_plan->nombre}}</td>
				</tr>
				<tr>
					<td>TIPO DE FORMACIÓN</td>
					<td></td>
				</tr>
				<tr>
					<td>MENCIÓN</td>
					<td></td>
				</tr>
				<tr>
					<td>GRADO</td>
					<td></td>
				</tr>
				<tr>
					<td>TÍTULOS INTERMEDIOS</td>
					<td></td>
				</tr>
				<tr>
					<td>MINOR</td>
					<td></td>
				</tr>
				<tr>
					<td class="celda-vacia" colspan="2"></td>
				</tr>
				<tr>
					<td>OBSERVACIÓN</td>
					<td>{{$PlanEstudio->observacion}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>Anexo A:</b> IDENTIFICACIÓN DEL PLAN DE ESTUDIO</p>

			<table class="Anexo1">
				<tr>
					<td>NOMBRE DEL PLAN DE ESTUDIO</td>
				</tr>
				<tr>
					<td class="center">{{$PlanEstudio->nombre}}</td>
				</tr>
				<tr>
					<td>FACULTAD QUE PRESENTA EL PLAN DE ESTUDIO</td>	
				</tr>
				<tr>
					<td class="center"></td>
				</tr>
				<tr>
					<td>UNIDAD RESPONSABLE DEL PROYECTO</td>
				</tr>
				<tr>
					<td class="center"></td>
				</tr>
				<tr>
					<td>TIPO DE PLAN</td>
				</tr>
				<tr>
					<td class="center">{{$PlanEstudio->tipo_plan->nombre}}</td>
				</tr>
				<tr>
					<td>
						<table>
							<tr>
								<th>JORNADA</th>
								<th>REGIMEN</th>
								<th>DURACIÓN</th>
								<th>MODALIDAD</th>
								<th>TIPO DE INGRESO</th>
							</tr>
							<tr>
								<td>DIURNA</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>VESPERTINA</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table>
							<tr>
								<td>TOTAL ASIGNATURAS</td>
								<td></td>
								<td></td>
								<td></td>
								<td>TOTAL SCT</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>GRADO ACADÉMICO</td>
				</tr>
				<tr>
					<td></td>
				</tr>
				<tr>
					<td>MENCIÓN O ESPECIALIZACIÓN</td>
				</tr>
				<tr><td></td></tr>
				<tr>
					<td>TÍTULOS INTERMEDIOS</td>
				</tr>
				<tr>
					<td></td>
				</tr>
				<tr>
					<td>DIPLOMA</td>
				</tr>
				<tr>
					<td></td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>Anexo B:</b> ANTECEDENTES DEL PLAN DE ESTUDIO</p>

			<p><b>B.1 PROPÓSITO DEL PLAN DE ESTUDIO</b></p>
			<table>
				<tr>
					<td>{{$PlanEstudio->proposito}}</td>
				</tr>
			</table>

			<p><b>B.2 OBJETIVOS DEL PLAN DE ESTUDIO</b></p>
			<table>
				<tr>
					<td>{{$PlanEstudio->objetivo}}</td>
				</tr>
			</table>

			<p><b>B.3 DOMINIOS Y COMPETENCIAS QUE CONFORMAN EL PERFIL DE EGRESO</b></p>
			<?php 
			$i = 1;
			foreach ($PlanEstudio->dominios as $key => $dominio) {
				echo '<table>
				 	<tr>
						 <td colspan="2">Dominio ';
				echo $i;
				echo ': ';
				echo $dominio->nombre;
				echo '</td>
					 </tr>
				 	<tr>
						 <td colspan="2">';
				echo $dominio->descripcion;
				echo '</td>
					</tr>
					<tr>
						<th colspan="2">COMPETENCIA ASOCIADA AL DOMINIO</th>
					</tr>';
				foreach ($dominio->competencias as $key => $competencia) {
					echo '<tr>
						<td>';
					echo $competencia->sigla;
					echo '</td>
						<td>';
					echo $competencia->descripcion;
					echo '</td>
					</tr>';
				}
				echo '</table>
				<p></p><p></p>';
				$i++;		
				}
			?>


			<p></p>
			<p></p>
			<p></p>


			<table>
				<tr>
					<th colspan="2">Competencias Genéricas Sello UTEM</th>
				</tr>


				<?php 
			
			foreach ($PlanEstudio->competencias_genericas as $key => $generica) {
				echo '<tr>
						<td>';
				echo $generica->sigla;
				echo '</td>
						<td>';
				echo $generica->descripcion;
				echo '</td>
					</tr>';
				}
			?>
			</table>

			<div class="page-break"></div>

			<p><b>B.4 PERFIL DE EGRESO</b></p>

			<table>
				<tr>
					<th>PERFIL DEL (nombre de la perfil) DE LA UNIVERSIDAD TECNOLÓGICA METROPOLITANA</th>
				</tr>
				<tr>
					<td></td>
				</tr>
			</table>

			
			<div class="page-break"></div>

			<p><b>B.5 REQUISITOS DE ADMISIÓN</b></p>

			<table>
				<tr>
					<td>{{$PlanEstudio->requisito_admision}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>B.6 MECANISMOS DE RETENCIÓN DE ALUMNOS</b></p>

			<table>
				<tr>
					<td>{{$PlanEstudio->mecanismo_retencion}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>B.7 REQUISITOS DE OBTENCIÓN DE TÍTULO, GRADO, TÍTULO INTERMEDIO Y/O DIPLOMAS</b></p>

			<table>
				<tr>
					<td>{{$PlanEstudio->requisito_obtencion}}</td>
				</tr>
			</table>

			<p><b>B.8 CAMPO DE DESARROLLO PROFESIONAL</b></p>

			<table>
				<tr>
					<td>{{$PlanEstudio->campo_desarrollo}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>Anexo C:</b> PLAN DE ESTUDIOS</p>

			<p><b>C.1 PLANES DE FORMACIÓN</b></p>

			<table class="center">
				<tr>
					<th colspan="4">PLAN DE FORMACIÓN I</th>
				</tr>
				<tr>
					<th colspan="4">{{$PlanEstudio->nombre}}</th>
				</tr>
				<tr>
					<th>CICLO</th>
					<th>CANTIDAD DE ASIGNATURAS</th>
					<th>SCT</th>
					<th>PORCENTAJE</th>
				</tr>
				<tr>
					<td>CICLO CIENTÍFICO TECNOLÓGICO</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>PROGRAMA DE DESARROLLO PERSONAL Y SOCIAL </td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>PROGRAMA DE INGLÉS</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>PROGRAMA DE BIENESTAR FÍSICO Y DEPORTES</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>CICLO DE ESPECIALIZACIÓN</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>CICLO DE TITULACIÓN</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th colspan="2">TOTAL</th>
					<td></td>
					<td></td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>C.2 ESTRUCTURA DEL PLAN DE ESTUDIOS</b></p>

			<table>
				<tr>
					<td colspan="4">C.2.1a  RESUMEN DEL PLAN DE ESTUDIO DIURNO</td>
				</tr>
				<tr>
					<td>Plan de Estudios</td>
					<td>{{$PlanEstudio->nombre}}</td>
					<td>Código DEMRE o interno</td>
					<td></td>
				</tr>
				<tr>
					<td>Tipo de Plan de Estudios</td>
					<td colspan="3">{{$PlanEstudio->tipo_plan->nombre}}</td>
				</tr>
				<tr>
					<td rowspan="3">Título que Otorga</td>
					<td rowspan="3"></td>
					<td>Duración</td>
					<td></td>
				</tr>
				<tr>
					<td>Horas Totales</td>
					<td></td>
				</tr>
				<tr>
					<td>SCT</td>
					<td></td>
				</tr>
				<tr>
					<td rowspan="3">Grado académico</td>
					<td rowspan="3"></td>
					<td>Duración</td>
					<td></td>
				</tr>
				<tr>
					<td>Horas Totales</td>
					<td></td>
				</tr>
				<tr>
					<td>SCT</td>
					<td></td>
				</tr>
				<tr>
					<td rowspan="3">Título Intermedio 1</td>
					<td rowspan="3"></td>
					<td>Duración</td>
					<td></td>
				</tr>
				<tr>
					<td>Horas Totales</td>
					<td></td>
				</tr>
				<tr>
					<td>SCT</td>
					<td></td>
				</tr>
				<tr>
					<td rowspan="3">Diploma</td>
					<td rowspan="3"></td>
					<td>Duración</td>
					<td></td>
				</tr>
				<tr>
					<td>Horas Totales</td>
					<td></td>
				</tr>
				<tr>
					<td>SCT</td>
					<td></td>
				</tr>
				<tr>
					<td>Régimen</td>
					<td></td>
					<td>Resolución</td>
					<td></td>
				</tr>
				<tr>
					<td>Jornada</td>
					<td></td>
					<td rowspan="2">Fecha</td>
					<td rowspan="2"></td>
				</tr>
				<tr>
					<td>Modalidad</td>
					<td></td>
				</tr>
			</table>
			<p>Las horas se expresan en Horas Pedagógicas</p>

			<div class="page-break"></div>

			<p><b>C.3.1  MALLA CURRICULAR </b></p>

			<p><b>TITULO {{$PlanEstudio->nombre}}</b></p>

			<p>imagen</p>

			<div class="page-break"></div>

			<p><b>C. 3. 2. MALLA CURRICULAR</b></p>

			<p><b>LICENCIADO EN {{$PlanEstudio->nombre}}</b></p>

			<p>imagen</p>

			<div class="page-break"></div>

			<p><b>C.4 DISEÑO PLAN DE ESTUDIO {{$PlanEstudio->nombre}}</b></p>

			<table>
				<tr>
					<td rowspan="2"></td>
					<td rowspan="2"></td>
					<td rowspan="2"></td>
					<td rowspan="2"></td>
					<th class="txt-ver" rowspan="3">Duración en semanas</th>
					<td colspan="7">Horas Semanales</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td colspan="6">Horas Pedagógicas</td>
					<td colspan="3"></td>
				</tr>
				<tr>
					<th class="txt-ver">Nivel</th>
					<th class="txt-ver">CICLOS Y PROGRAMAS</th>
					<th class="txt-ver">CÓDIGO</th>
					<th>ASIGNATURA</th>
					<td class="txt-ver">Teoría</td>
					<td class="txt-ver">Laboratorio</td>
					<td class="txt-ver">Taller</td>
					<td class="txt-ver">Total aula</td>
					<td class="txt-ver">Extra aula</td>
					<td class="txt-ver">Total horas</td>
					<th class="txt-ver">Total horas Cronológica</th>
					<th class="txt-ver">SCT</th>
					<th class="txt-ver">REQUISITO</th>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>Anexo D:</b> PROGRAMAS DE ACTIVIDADES CURRICULARES</p>

			<p><b>D.1. PROGRAMAS DE ACTIVIDADES CURRICULARES NIVEL X</b></p>

			(lista de nombres)

			<div class="page-break"></div>

			<h4 class="center">PROGRAMA DE ASIGNATURA</h3>

			<p><b>I.	IDENTIFICACIÓN</b></p>

			<table>
				<tr>
					<td>1.1</td>
					<td>Nombre</td>
					<th colspan="6">(nombre)</th>
				</tr>
				<tr>
					<td>1.2</td>
					<td>Código</td>
					<td></td>
					<th colspan="2">Tipo de asignatura</th>
					<td colspan="3"></td>
				</tr>
				<tr>
					<td>1.3</td>
					<td>Requisito</td>
					<th colspan="6"></th>
				</tr>
				<tr>
					<td>1.4</td>
					<td>SCT</td>
					<td></td>
					<th colspan="2">Modalidad</th>
					<td colspan="3"></td>
				</tr>
				<tr>
					<td rowspan="3">1.5</td>
					<td rowspan="3">Horas pedagógicas semanales</td>
					<td colspan="3">Aula</td>
					<td rowspan="2">Extra aula</td>
					<td rowspan="2">Horas Totales</td>
					<td rowspan="2">Régimen</td>
				</tr>
				<tr>
					<td>Teoría</td>
					<td>Taller</td>
					<td>Laboratorio</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td>1.6</td>
					<td>Ciclo o programa de Formación</td>
					<td colspan="6"></td>
				</tr>
				<tr>
					<td>1.7</td>
					<td>Departamento</td>
					<td colspan="6"></td>
				</tr>
				<tr>
					<td>1.8</td>
					<td>Vigencia desde</td>
					<td colspan="2"></td>
					<td colspan="2">Código Plan de Estudio</td>
					<td colspan="2"></td>
				</tr>
			</table>

			<p><b>II.	DESCRIPCIÓN </b></p>
			<table>
				<tr>
					<td></td>
				</tr>
			</table>

			<p><b>III.	RELACIÓN DE LA ASIGNATURA CON EL PERFIL DE EGRESO</b></p>
			<table>
				<tr>
					<td></td>
				</tr>
			</table>

			<p><b>IV.	LOGROS DE APRENDIZAJES</b></p>
			<table>
				<tr>
					<td>Tipo de Competencia</td>
					<td>Logros de Aprendizaje</td>
					<td>Procedimientos y/o Herramientas de Evaluación</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<p><b>V.	UNIDADES DE APRENDIZAJE</b></p>

			<table>
				<tr>
					<td>Nº</td>
					<td>Unidades de Aprendizaje</td>
					<td>Contenidos Fundamentales</td>
					<td>Horas aula</td>
					<td>Horas extra aula</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<p><b>VI.	METODOLOGÍA DE ENSEÑANZA Y DE APRENDIZAJE</b></p>
			<table>
				<tr>
					<td></td>
				</tr>
			</table>

			<p><b>VII.	BIBLIOGRAFÍA</b></p>
			<table>
				<tr>
					<td></td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>Anexo E:</b> REGLAMENTO PLAN DE ESTUDIOS</p>

			<div class="page-break"></div>
			<div class="page-break"></div>
			<div class="page-break"></div>






			









			<h1 class="caption-title" style="text-align:center"><b>Datos Iniciales</b></h1>
			<table style="width:100%;border:1px solid #000">
				<tr>
					<td>Nombre</td>
					<td>{{ $PlanEstudio->nombre }}</td>
				</tr>
				<tr>						
					<td>Carrera</td>
					<td>{{$PlanEstudio->carrera->nombre}}</td>
				</tr>
				<tr>						
					<td>Tipo de Plan</td>
					<td>{{$PlanEstudio->tipo_plan->nombre}}</td>
				</tr>
				<tr>						
					<td>Tipo de Ingreso</td>
					<td>{{$PlanEstudio->tipo_ingreso->nombre}}</td>
				</tr>

				<tr>
					<td>Encargado UIC</td>
					<td>
						<?php foreach ($PlanEstudio->plan_estudio_usuarios as $key => $usuario) {
							if($usuario->rol_id == 1)
							{
								echo $usuario->usuario->nombre;
							}
							else
							{
							"Sin Nombre";
							}
						}
						?>
					</td>				
				</tr>
				<tr>
					<td>Coordinador</td>
					<td>
					<?php foreach ($PlanEstudio->plan_estudio_usuarios as $key => $usuario) {
							if($usuario->rol_id == 2)
							{
								echo $usuario->usuario->nombre;
							}
							else
							{
							"Sin Nombre";
							}
						}
						?>
					</td>
				</tr>

			</table>
		</div>
	</div>

	<div>
		<div>
			<h3>Proposito</h3>
			<p>{{$PlanEstudio->proposito}}</p>
		</div>
		<div>
			<h3>Objetivo</h3>
			<p>{{$PlanEstudio->objetivo}}</p>
		</div>
		<div>
			<h3>Requisito de Admisión</h3>
			<p>{{$PlanEstudio->requisito_admision}}</p>
		</div>
		<div>
			<h3>Mecanismo de Retención</h3>
			<p>{{$PlanEstudio->mecanismo_retencion}}</p>
		</div>
		<div>
			<h3>Requisito de Obtención</h3>
			<p>{{$PlanEstudio->requisito_obtencion}}</p>
		</div>
		<div>
			<h3>Campo de Desarrollo</h3>
			<p>{{$PlanEstudio->campo_desarrollo}}</p>
		</div>

	</div>



@endsection