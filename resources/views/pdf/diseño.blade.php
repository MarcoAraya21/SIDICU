@extends('layouts.pdf', ['paceTop' => true, 'bodyExtraClass' => 'bg-white'])

@section('title', 'Login Page')

@push('css')
	<link href="public/assets/css/bundle.css" rel="stylesheet" />
	<link href="public/assets/css/estilos.css" rel="stylesheet" />
@endpush

@section('content')
<div class="news-feed">
<div className="table-responsive">
        <table className="table table-bordered">
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

                <?php

        foreach ($PlanEstudio->asignaturas as $key => $asignatura)
        {
			for ($i=0; $i < 20; $i++) {
				$j = 0; 
				if ($asignatura->nivel->nombre == $i){

					echo '<tr key=';
					echo $j;
					echo'>
					<td>';
					echo $i+1;
					echo $j+1;
					echo'</td>
					<td></td>
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
					$k = $k *0.75;
					echo '</td><td>';
					echo $k;
					echo '</td><td>';
					$l = 0;
					$k = $k*18;
					$l = $k/27;
					echo $l;
					echo '</td><td></td></tr>';
					$j++;
				}
			}
		}
		?>
		</table>    
    </div>
</div>