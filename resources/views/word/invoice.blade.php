<!DOCTYPE html>

<?php
	$nombre_plan = "plan_de_estudios";
	if($PlanEstudio)
	{
		$nombre_plan = $PlanEstudio->nombre;
	}
	header("Content-type: application/vnd.ms-word");
    header("Content-Disposition: attachment;Filename=plan_".$nombre_plan.".doc"); 
?>
<html>
<head>
	{{-- <link href="{{asset('assets/css/bundle.css')}}" rel="stylesheet" />
	<link href="{{asset('assets/css/estilos.css')}}" rel="stylesheet" /> --}}
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
    <meta charset="UTF-8">

  	<style>
		/* @font-face {
			font-family: "San Francisco";
			font-weight: 500;
			src: url(data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAIDQABQAAAABXwwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABC...) format('woff');
		} */
		body {
			font-family: 'San Francisco', sans-serif;
			width: 100%
		}
		@page { margin: 140px 70px; } 
		#header { position: fixed; left: 0px; top: -140px; right: 0px; height: 90px;} 
		#footer { position: fixed; left: 0px; bottom: -180px; right: 0px; height: 150px; text-align: center; font-size: 12px;} 
		#footer .page:after { content: counter(page, upper-roman); } 
		.m-3{ margin: 15px, 10px;}
		.division{
			border-bottom:solid 1px grey;
			width:100%;
			height:50px;
		}
		.titulo{
			border: solid 2px black;
			width: 90%;
			text-align: center;
			padding: 15px;
		}
		.firma{
			margin-top: 50px;
			text-align: center;
		}
		.firma > p{
			margin: 0;
		}

		table, th, td{
			border: 1px solid #000;
			border-collapse: collapse;
		}

		table{
			width:100%;
		}

		th, td {
			padding: 10px;
		}

		.celda-vacia{
			padding:15px;
		}

		.page-break {
			page-break-after: always;
		}

		.center{
			text-align:center;
		}

		.txt-ver{
 			
		}

		#tabla-diseno {
  width: 100% !important;
  border: 1px solid; width: 100%; border-collapse: collapse; margin-top: 5px;
}

#tabla-diseno th{
	max-width: 20cm !important;
	font-size: 12px !important;

}

#tabla-diseno td{
	max-width: 20cm !important;
	font-size: 12px !important;

}
.texto-random{
	color: green;
}
.contenedortabladis{
	width: 500px !important;
	border: 2px solid red;
	display: block;
	font-size: 8px !important;
}

.contenedortabladis > table{
	display: flex;
	border: 10px solid blue !important;
}
		
	</style>
	<title>Plan de Estudio</title>
	@push('css')
	<link href="public/assets/css/bundle.css" rel="stylesheet" />
	<link href="public/assets/css/estilos.css" rel="stylesheet" />
	@endpush
</head>
<body>
	<div id='header'>
		<div style="position:absolute;left:30%;margin-top:60px">
			<p style="float:left;width:33.33%;white-space:nowrap;font-family:'Times New Roman';font-size:15px;font-weight:bold;">Universidad Tecnológica Metropolitana</p>
			<p style="float:right;width:33.33%;white-space:nowrap;font-family:'Times New Roman';font-size:15px;font-weight:bold;">Vicerrectoría Académica</p>
		</div>
    </div>
	<div id="content">

<div class="news-feed">
		<div class="news-caption">
			<h1 class="center">Plan de Estudios</h1>

			<table>
			 	<tr>
				 	<td>Nombre del Plan</td>
					<td colspan="5">{{ $PlanEstudio ? $PlanEstudio->nombre : ''}}</td>
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
					<td colspan="2">{{$PlanEstudio ? $PlanEstudio->nombre : ''}}</td>
				</tr>
				<tr class="center">
					<td colspan="2">{{$PlanEstudio->tipo_plan ? $PlanEstudio->tipo_plan->nombre : ''}}</td>
				</tr>
				<tr>
					<td>TIPO DE FORMACIÓN</td>
					<td>{{$PlanEstudio->tipo_formacion ? $PlanEstudio->tipo_formacion->nombre : ''}}</td>
				</tr>
				<tr>
					<td>MENCIÓN</td>
					<td></td>
				</tr>
				<tr>
					<td>GRADO</td>
					<td>{{$PlanEstudio->carrera->grado ? $PlanEstudio->carrera->grado->nombre : ''}}</td>
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
					<td>{{$PlanEstudio ? $PlanEstudio->observacion : ''}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>Anexo A:</b> IDENTIFICACIÓN DEL PLAN DE ESTUDIO</p>

			<table class="Anexo1">
				<tr>
					<td>NOMBRE DEL PLAN DE ESTUDIO</td>
				</tr>
				<tr>
					<td class="center">{{$PlanEstudio ? $PlanEstudio->nombre : ''}}</td>
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
					<td class="center">{{$PlanEstudio->tipo_plan ? $PlanEstudio->tipo_plan->nombre : ''}}</td>
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
					<td>{{$PlanEstudio ? $PlanEstudio->proposito : ''}}</td>
				</tr>
			</table>

			<p><b>B.2 OBJETIVOS DEL PLAN DE ESTUDIO</b></p>
			<table>
				<tr>
					<td>{{$PlanEstudio ? $PlanEstudio->objetivo : ''}}</td>
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
					<td>{{$PlanEstudio ? $PlanEstudio->requisito_admision : ''}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>B.6 MECANISMOS DE RETENCIÓN DE ALUMNOS</b></p>

			<table>
				<tr>
					<td>{{$PlanEstudio ? $PlanEstudio->mecanismo_retencion : ''}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>B.7 REQUISITOS DE OBTENCIÓN DE TÍTULO, GRADO, TÍTULO INTERMEDIO Y/O DIPLOMAS</b></p>

			<table>
				<tr>
					<td>{{$PlanEstudio ? $PlanEstudio->requisito_obtencion : ''}}</td>
				</tr>
			</table>

			<p><b>B.8 CAMPO DE DESARROLLO PROFESIONAL</b></p>

			<table>
				<tr>
					<td>{{$PlanEstudio ? $PlanEstudio->campo_desarrollo : ''}}</td>
				</tr>
			</table>

			<div class="page-break"></div>

			<p><b>Anexo C:</b> PLAN DE ESTUDIOS</p>

			<p><b>C.1 PLANES DE FORMACIÓN</b></p>

			<?php
    $TotalSCT = 0;
    foreach ($Ciclos as $key => $ciclo) {
        $Ciclos[$key]->cant_asignaturas = 0;
        $Ciclos[$key]->sct = 0;
    }

    foreach ($Ciclos as $key => $ciclo) {
        foreach ($PlanEstudio->asignaturas as $key2 => $asignatura) {
            if($asignatura->ciclo_id && $asignatura->ciclo_id == $ciclo->id)
            {
                $sct = 0;
                foreach ($asignatura->asignatura_horas as $key2 => $asignatura_hora) {
                    $sct = $sct + $asignatura_hora->cantidad;
                }

                $sct = $sct/2;

                $Ciclos[$key]->cant_asignaturas++;
                $Ciclos[$key]->sct = $Ciclos[$key]->sct + $sct;
                $TotalSCT = $TotalSCT + $sct;
            }
        }
    }

        echo '<table>
                <thead>
                    <tr>
                        <th colspan="4">Plan de Formación I</th>
                    </tr>
                    <tr>
						<th colspan="4">';
						echo $PlanEstudio->nombre;
						echo '</th>
                    </tr>
                    <tr>
                        <th>Ciclo</th>
                        <th>Cantidad de Asignaturas</th>
                        <th>SCT</th>
                        <th>Porcentaje</th>
                    </tr>
                </thead>
                <tbody>';
            foreach ($Ciclos as $key => $ciclo) {
			if ($TotalSCT == 0)
			{
				$porcentaje_ciclo = 0;
			}
			else
			{
				$porcentaje_ciclo = round(100*$ciclo->sct/$TotalSCT);
			}
                echo '<tr>
                        <td>'.$ciclo->nombre.'</td>
                        <td>'.$ciclo->cant_asignaturas.'</td>
                        <td>'.$ciclo->sct.'</td>
                        <td>'.$porcentaje_ciclo.'%</td>
                    </tr>';
            }
            echo '</tbody>
                <tfoot>
                    <tr>
                        <td colspan="2">Total</td>
                        <td>'.$TotalSCT.'</td>
                        <td>100%</td>
                    </tr>
                </tfoot>
            </table>';

?>

			<div class="page-break"></div>

			<p><b>C.2 ESTRUCTURA DEL PLAN DE ESTUDIOS</b></p>

			<table>
				<tr>
					<td colspan="4">C.2.1a  RESUMEN DEL PLAN DE ESTUDIO DIURNO</td>
				</tr>
				<tr>
					<td>Plan de Estudios</td>
					<td>{{$PlanEstudio ? $PlanEstudio->nombre : ''}}</td>
					<td>Código DEMRE o interno</td>
					<td></td>
				</tr>
				<tr>
					<td>Tipo de Plan de Estudios</td>
					<td colspan="3">{{$PlanEstudio->tipo_plan ? $PlanEstudio->tipo_plan->nombre : ''}}</td>
				</tr>
				<tr>
					<td rowspan="3">Título que Otorga</td>
					<td rowspan="3">{{$PlanEstudio ? $PlanEstudio->carrera->titulo : ''}}</td>
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
					<td rowspan="3">{{$PlanEstudio ? $PlanEstudio->carrera->grado->nombre : ''}}</td>
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
					<td rowspan="3">{{$PlanEstudio ? $PlanEstudio->titulo_intermedio : ''}}</td>
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
					<td rowspan="3">{{$PlanEstudio ? $PlanEstudio->diploma : ''}}</td>
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
					<td>Semestral</td>
					<td>Resolución</td>
					<td></td>
				</tr>
				<tr>
					<td>Jornada</td>
					<td>{{$PlanEstudio ? $PlanEstudio->jornada->nombre : ''}}</td>
					<td rowspan="2">Fecha</td>
					<td rowspan="2"></td>
				</tr>
				<tr>
					<td>Modalidad</td>
					<td>{{$PlanEstudio ? $PlanEstudio->modalidad->nombre : ''}}</td>
				</tr>
			</table>
			<p>Las horas se expresan en Horas Pedagógicas</p>

			<div class="page-break"></div>

			<p><b>C.3.1  MALLA CURRICULAR </b></p>

			<p><b>TITULO {{$PlanEstudio ? $PlanEstudio->nombre : ''}}</b></p>

			<p>Puedes descargar esta hoja desde <u>Diseño de Plan de Estudio</u></p>

			<div class="page-break"></div>

			<p><b>C. 3. 2. MALLA CURRICULAR</b></p>

			<p><b>LICENCIADO EN {{$PlanEstudio ? $PlanEstudio->nombre : ''}}</b></p>

			<p>Puedes descargar esta hoja desde <u>Diseño de Plan de Estudio</u></p>

			<div class="page-break"></div>

			<p><b>C.4 DISEÑO PLAN DE ESTUDIO {{$PlanEstudio ? $PlanEstudio->nombre : ''}}</b></p>

			<p>Puedes descargar esta hoja desde <u>Diseño de Plan de Estudio</u></p>

			<div class="page-break"></div>

			<p><b>Anexo D:</b> PROGRAMAS DE ACTIVIDADES CURRICULARES</p>
			
			<?php
			for ($i=1; $i < 3; $i++) { 
				echo '<p><b>D.';
				echo $i;
				echo '. PROGRAMAS DE ACTIVIDADES CURRICULARES NIVEL ';
				echo $i;
				echo '</b></p>';

				echo '<ul>';
				
				foreach ($PlanEstudio->asignaturas as $key => $asignatura){
					if ($asignatura->nivel->nombre == $i) {
						echo '<li>';
						echo $asignatura->nombre;
						echo '</li>';
					}
				}
				echo '</ul>';
				
			}
			
			?>
		<div class="page-break"></div>

		<?php
			foreach ($PlanEstudio->asignaturas as $key => $asignatura)
			{
				echo '<h4 class="center">PROGRAMA DE ASIGNATURA</h4>
				<p><b>I.	IDENTIFICACIÓN</b></p>
				<table>
					<tr>
						<td>1.1</td>
						<td>Nombre</td>
						<th colspan="6">';
				echo $asignatura->nombre;
				echo '</th>
				<tr>
					<td>1.2</td>
					<td>Código</td>
					<td>';
				echo $asignatura->codigo;
				echo '</td>
				<th colspan="2">Tipo de asignatura</th>
				<td colspan="3">';
				echo $asignatura->tipo_asignatura ? $asignatura->tipo_asignatura->nombre : "";
				echo '</td>
			</tr>
			<tr>
				<td>1.3</td>
				<td>Requisito</td>
				<th colspan="6">';
				{if ($asignatura->requisitos){
					foreach ($asignatura->requisitos as $key => $requisito)
					echo $requisito->requisito->nombre;
					echo ' ';
				}
				else{
					echo 'Ingreso';
				}}
				echo '</th>
			</tr>
			<tr>
				<td>1.4</td>
				<td>SCT</td>
				<td>';
				$p = 0;
				{foreach ($asignatura->asignatura_horas as $key => $horas){
						$p = $p + $horas->cantidad;
					}
				}
				$o = 0;
				$p = $p *0.75;
				$p = $p*18;
				$o = $p/27;
				echo round($o);
				echo '</td>
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
				<td>';
				{foreach ($asignatura->asignatura_horas as $key => $horas){
					if ($horas->tipo_hora_id === 1){
						echo $horas->cantidad;
						}
					}
				}
			echo '</td>
				<td>';
				{foreach ($asignatura->asignatura_horas as $key => $horas){
					if ($horas->tipo_hora_id === 2){
						echo $horas->cantidad;
						}
					}
				}
				echo '</td>
				<td>';
				{foreach ($asignatura->asignatura_horas as $key => $horas){
					if ($horas->tipo_hora_id === 3){
						echo $horas->cantidad;
						}
					}
				}
				echo '</td>
				<td>';
				{foreach ($asignatura->asignatura_horas as $key => $horas){
					if ($horas->tipo_hora_id === 4){
						echo $horas->cantidad;
						}
					}
				}
				echo '</td><td>';
				$k = 0;
				{foreach ($asignatura->asignatura_horas as $key => $horas){
						$k = $k + $horas->cantidad;
					}
				}
				echo $k;
				echo '<td></td>
			</tr>
			<tr>
				<td>1.6</td>
				<td>Ciclo o programa de Formación</td>
				<td colspan="6">';
				echo $asignatura->ciclo ? $asignatura->ciclo->nombre : "";
				echo '</td>
			</tr>
			<tr>
				<td>1.7</td>
				<td>Departamento</td>
				<td colspan="6">';
				echo $asignatura->departamento ? $asignatura->departamento->nombre : "";
				echo '</td>
			</tr>
			<tr>
				<td>1.8</td>
				<td>Vigencia desde</td>
				<td colspan="2"></td>
				<td colspan="2">Código Plan de Estudio</td>
				<td colspan="2"> </td>
			</tr>
		</table>
	
		<p><b>II.	DESCRIPCIÓN </b></p>
		<table>
			<tr>
				<td>';
				echo $asignatura->descripcion;
				echo '</td>
			</tr>
		</table>
	
		<p><b>III.	RELACIÓN DE LA ASIGNATURA CON EL PERFIL DE EGRESO</b></p>
		<table>
			<tr>
				<td>';
				echo $asignatura->relacion_egreso;
				echo '</td>
			</tr>
		</table>
	
		<p><b>IV.	LOGROS DE APRENDIZAJES</b></p>
		<table>
			<tr>
				<td>Tipo de Competencia</td>
				<td>Logros de Aprendizaje</td>
				<td>Procedimientos y/o Herramientas de Evaluación</td>
			</tr>';
		$competencias_id = [];
		$competencias_genericas_id = [];
		$m = 0;
		$n = 0;
		foreach ($asignatura->nivel_competencia_asignaturas as $key => $nivel_competencia_asignatura){
			$competencias_id[$m] = $nivel_competencia_asignatura->nivel_competencia->competencia_id;
			$m++;
		}

		foreach ($asignatura->nivel_generica_asignaturas as $key => $nivel_generica_asignatura){
			$competencias_genericas_id[$n] = $nivel_generica_asignatura->nivel_generica->nivel_competencia->competencia_id;
			$n++;
		}
		$competencias_id = array_unique($competencias_id);
		$competencias_genericas_id = array_unique($competencias_genericas_id);

		// GUARDA LAS COMPETENCIAS Y COMPETENCIAS GENERICAS EN LA VARIABLE ALL_COMPETENCIAS
		$contador_competencias = 0;
		$all_competencias = [];
		foreach ($PlanEstudio->dominios as $key => $dominio) {
			foreach ($dominio->competencias as $key => $competencia) {
				$all_competencias[$contador_competencias] = (object) ['id' => $competencia->id, 'descripcion' => $competencia->descripcion];
				$contador_competencias++;
			}
		}
		foreach ($PlanEstudio->competencias_genericas as $key => $competencias_generica) {
			$all_competencias[$contador_competencias] = (object) ['id' => $competencias_generica->id, 'descripcion' => $competencias_generica->descripcion, 'sigla' => $competencias_generica->sigla];
			$contador_competencias++;
		}
		// HASTA ACA

		$niveles_id = [];
		$nivel_genericas_id = [];
		$s = 0;
		$t = 0;
		foreach ($asignatura->nivel_competencia_asignaturas as $key => $nivel_competencia_asignatura){
			$niveles_id[$s] = $nivel_competencia_asignatura->nivel_competencia_id;
			$s++;
		}

		foreach ($asignatura->nivel_generica_asignaturas as $key => $nivel_generica_asignatura){
			$nivel_genericas_id[$t] = $nivel_generica_asignatura->nivel_generica->nivel_competencia_id;
			$t++;
		}

		$niveles_id = array_unique($niveles_id);
		$nivel_genericas_id = array_unique($nivel_genericas_id);

		
		$contador_niveles = 0;
		$all_niveles = [];
		foreach ($PlanEstudio->dominios as $key => $dominio) {
			foreach ($dominio->competencias as $key => $competencia) {
				foreach ($competencia->nivel_competencias as $key => $nivel_competencia){
					$all_niveles[$contador_niveles] = (object) ['id' => $nivel_competencia->id, 'descripcion' => $nivel_competencia->descripcion, 'competencia_id' => $nivel_competencia->competencia_id, 'logro_aprendizajes' => $nivel_competencia->logro_aprendizajes, 'nivel'=>$nivel_competencia->nivel];
					$contador_niveles++;
				}
			}
		}

		foreach ($PlanEstudio->competencias_genericas as $key => $competencias_generica) {
			foreach ($competencias_generica->nivel_competencias as $key => $nivel_competencia){
				$all_niveles[$contador_niveles] = (object) ['id' => $nivel_competencia->id, 'descripcion' => $nivel_competencia->descripcion, 'competencia_id' => $nivel_competencia->competencia_id, 'logro_aprendizajes' => $nivel_competencia->logro_aprendizajes, 'nivel'=>$nivel_competencia->nivel];
				$contador_niveles++;
			}

		}

		$contador_rowspan = 0 ;

		// Recorre para saber cuantas competencias hay y hacer rowspan
		foreach ($competencias_id as $key => $comp_id){
			$llave = array_search($comp_id, array_column($all_competencias,'id'));
			foreach ($niveles_id as $key => $nivel_id){	
				$llave2 = array_search($nivel_id, array_column($all_niveles,'id'));
				if ($all_competencias[$llave]->id == $all_niveles[$llave2]->competencia_id)
				{
					$contador_rowspan++;
				}
			}
		}
		// Cierre Recorrido

		$esPrimero = true;
		foreach ($competencias_id as $key => $comp_id){
			$llave = array_search($comp_id, array_column($all_competencias,'id'));
			foreach ($niveles_id as $key => $nivel_id){	
				$llave2 = array_search($nivel_id, array_column($all_niveles,'id'));
				if ($all_competencias[$llave]->id == $all_niveles[$llave2]->competencia_id)
				{
					echo '<tr>';
					echo '<td><p><b>CP, nivel ';
					echo $all_niveles[$llave2]->nivel;
					echo '</b></p><p>';
					echo $all_competencias[$llave]->descripcion;
					echo '</p></td>';
					echo '<td>';
					$contador_indice_logros = 1;
					foreach ($all_niveles[$llave2]->logro_aprendizajes as $key => $logro_aprendizaje)
					{
						echo $contador_indice_logros.'-'.$logro_aprendizaje->descripcion;
						if($contador_competencias != count($all_niveles[$llave2]->logro_aprendizajes))
						{
							echo "<br>";
						}
						$contador_indice_logros++;
					}
					echo '</td>';
					if($esPrimero)
					{
						echo '<td rowspan="'.$contador_rowspan.'"><ul>';
						foreach ($asignatura->asignatura_evaluaciones as $key => $evaluaciones)
						{
							echo '<li>';
							echo $evaluaciones->evaluacion->nombre;
							echo '</li>';
						}
						echo '</ul></td>';
						$esPrimero = false;
					}
					
				echo '</tr>';
				}
			}
		}

			
		foreach ($competencias_genericas_id as $key => $comp_generica_id){
			$llave = array_search($comp_generica_id, array_column($all_competencias,'id'));
			foreach ($nivel_genericas_id as $key => $nivel_generica_id){	
				$llave2 = array_search($nivel_generica_id, array_column($all_niveles,'id'));
				if ($all_competencias[$llave]->id == $all_niveles[$llave2]->competencia_id)
				{
					echo '<tr>';
					echo '<td><p><b>';
					echo $all_competencias[$llave]->sigla;
					echo ', nivel ';
					echo $all_niveles[$llave2]->nivel;
					echo '</b></p><p>';
					echo $all_competencias[$llave]->descripcion;
					echo '</p></td>';
					echo '<td>';
					$contador_indice_logros = 1;
					foreach ($all_niveles[$llave2]->logro_aprendizajes as $key => $logro_aprendizaje)
					{
						echo $contador_indice_logros.'-'.$logro_aprendizaje->descripcion;
						if($contador_competencias != count($all_niveles[$llave2]->logro_aprendizajes))
						{
							echo "<br>";
						}
						$contador_indice_logros++;
					}
					echo '</td>';
					echo '<td>A través de rúbrica para prueba final de nivel, se evaluarán los logros de aprendizaje de la competencia genérica, con una ponderación del 30%.</td>';
					echo '</tr>';
				}
			}
		}
		
		echo '</table>
	
		<p><b>V.	UNIDADES DE APRENDIZAJE</b></p>
	
		<table>
			<tr>
				<td>Nº</td>
				<td>Unidades de Aprendizaje</td>
				<td>Contenidos Fundamentales</td>
				<td>Horas aula</td>
				<td>Horas extra aula</td>
			</tr>
			<tr>';
		$conteo = 1;
		foreach ($asignatura->unidades as $key => $unidad)
		{
			echo '<td>';
			echo $conteo;
			echo '</td>';
			echo '<td>';
			echo $unidad->nombre;
			echo '</td>';
			echo '<td> <dl>';
			foreach ($unidad->contenidos as $key => $contenido) {
				echo '<dt>';
				echo $contenido->nombre;
				echo '</dt>';
			}
			echo '</dl></td>';
			echo '<td>';
			echo $unidad->horas_aula;
			echo '</td>';
			echo '<td>';
			echo $unidad->horas_extra_aula;
			echo '</td>';
			$conteo++;
		}

		echo '</tr>
		</table>
	
		<p><b>VI.	METODOLOGÍA DE ENSEÑANZA Y DE APRENDIZAJE</b></p>
		<table>
			<tr>
				<td>
				<p>Se privilegiará una metodología activo participativa en la que el estudiante desarrollará su aprendizaje a partir de actividades como:</p>
				
				<ul>
					<li>Conociendo mi curso.</li>
					<li>Aprendizaje basado en problemas (ABP)</li>
					<li>Aprendizaje basado en equipos *</li>
					<li>Clase expositivas que favorecen la comprensión.</li>
					<li>Trabajo colaborativo*</li>
				</ul>

				<p>(*) Durante la implementación de estas metodologías se deberá evaluar de manera integrada el nivel de logro de las competencias disciplinares y genéricas de esta asignatura.</p>
				</td>
			</tr>
		</table>
	
		<p><b>VII.	BIBLIOGRAFÍA</b></p>
		<table>
			<tr>
				<td>
				<b>Básica</b>
				<ul>';
		
		foreach ($asignatura->bibliografias as $key => $bibliografia)
		{
			if ($bibliografia->tipo_bibliografia_id == 1){
				echo '<li>' .$bibliografia->apellido_autor. ' ' .$bibliografia->nombre_autor. ', (' .$bibliografia->año. '), ' .$bibliografia->titulo. ', ' .$bibliografia->pais. ', ' .$bibliografia->editorial. '. </li>';
			}
		}	
		echo '</ul>
		<b>Complementaria</b> <ul>';
		foreach ($asignatura->bibliografias as $key => $bibliografia)
		{
			if ($bibliografia->tipo_bibliografia_id == 2){
				echo '<li>' .$bibliografia->apellido_autor. ' ' .$bibliografia->nombre_autor. ', (' .$bibliografia->año. '), ' .$bibliografia->titulo. ', ' .$bibliografia->pais. ', ' .$bibliografia->editorial. '. </li>';
			}
		}					
		echo '</ul>
				</td>
			</tr>
		</table>
		
		<div class="page-break"></div>';
				}
	?>
	
			<p><b>Anexo E:</b> REGLAMENTO PLAN DE ESTUDIOS</p>

			<div class="page-break"></div>
			<div class="page-break"></div>
			<div class="page-break"></div>



	</div>


<div class="firma">
			
			</div>
		</div>
		<div id="footer">
			<div class="division"></div> 
			
		</div>
</body>
</html>