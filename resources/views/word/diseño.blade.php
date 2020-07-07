<!DOCTYPE html>

<?php
	$nombre_plan = "plan_de_estudios";
	if($PlanEstudio)
	{
		$nombre_plan = $PlanEstudio->nombre;
	}
	header("Content-type: application/vnd.ms-word");
    header("Content-Disposition: attachment;Filename=diseño_".$nombre_plan.".doc"); 
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
	<i>Para poder visualizar de manera correcta la tabla debe cambiar la orientación de la hoja
	a <b>horizontal</b> en la pestaña de <b>disposición</b> de la hoja</i>
	<br>
<div className="contenedortabladis" >
        <table className="table table-bordered" id="tabla-diseno">
			<thead>
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
			</thead>
			<tbody>

                <?php

		foreach ($PlanEstudio->niveles as $key => $nivel) {
			$j = 1 ;
			foreach ($PlanEstudio->asignaturas as $key => $asignatura)
        	{
				if($nivel->nombre == $asignatura->nivel->nombre)
				{
					echo '<tr key=';
					echo $j;
					echo'>
					<td>';
					echo $asignatura->nivel->nombre;
					echo $j;
					echo'</td>
					<td>';
					echo $asignatura->ciclo_id ? $asignatura->ciclo->nombre : "Sin Ciclo";
					echo'</td>
					<td>';
					echo $asignatura->codigo;
					echo '</td>
					<td>';
					echo $asignatura->nombre;
					echo '</td>
					<td>18</td>
					<td>';
					{foreach ($asignatura->asignatura_horas as $key => $horas){
						if ($horas->tipo_hora_id === 1){
							echo $horas->cantidad;
							}
						}
					}
					echo '</td><td>';
					{foreach ($asignatura->asignatura_horas as $key => $horas){
						if ($horas->tipo_hora_id === 3){
							echo $horas->cantidad;
							}
						}
					}
					echo '</td><td>';				
					{foreach ($asignatura->asignatura_horas as $key => $horas){
						if ($horas->tipo_hora_id === 2){
							echo $horas->cantidad;
							}
						}
					}
					echo '</td><td>';
					$k = 0;
					{foreach ($asignatura->asignatura_horas as $key => $horas){
						if ($horas->tipo_hora_id === 1 || $horas->tipo_hora_id === 2 || $horas->tipo_hora_id === 3){
							$k = $k + $horas->cantidad;
							}
						}
					}
					echo $k;
					echo '</td><td>';					
					{foreach ($asignatura->asignatura_horas as $key => $horas){
						if ($horas->tipo_hora_id === 4){
							echo $horas->cantidad;
							$k = $k + $horas->cantidad;
							}
						}
					}
					echo '</td><td>';
					echo $k;
					echo '</td><td>';
					echo $k = $k*0.75;
					echo '</td><td>';
					$l = 0;
					$k = $k*18;
					$l = $k/27;
					echo $l;
					echo '</td><td>';
					if(count($asignatura->requisitos) == 0)
					{
						echo "Ingreso";
					}
					else
					{
						$aux_requisitos = 1;
						foreach ($asignatura->requisitos as $key => $requisito) {
							echo $requisito->requisito->nivel->nombre.$aux_requisitos." - ".$requisito->requisito->nombre;
							echo "<br>";
							$aux_requisitos++;
						}
					}
					echo '</td></tr>';
					$j++;

				}
			}
		}
        
		?>
		</tbody>
		</table>    
    </div>
</div>

<div class="firma">
			
			</div>
		</div>
		<div id="footer">
			<div class="division"></div> 
			
		</div>
</body>
</html>