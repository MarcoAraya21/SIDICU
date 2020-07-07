@extends('layouts.pdf', ['paceTop' => true, 'bodyExtraClass' => 'bg-white'])

@section('title', 'Login Page')

@push('css')
	<link href="public/assets/css/bundle.css" rel="stylesheet" />
	<link href="public/assets/css/estilos.css" rel="stylesheet" />
@endpush

@section('content')
<div class="news-feed">
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