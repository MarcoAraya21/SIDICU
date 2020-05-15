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
					echo $jj;
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
					echo $asignatura->asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)};
					echo '</td>
					<td>';
					echo {asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)};
					echo '</td>
					<td>';
					echo {asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)}</td>
					<td>{Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad))};
					echo '</td>
					<td>'
					echo {asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad)}
					echo '</td>
					<td>';
					echo {Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad))};
					echo '</td>
					<td>';
					echo {Math.round((Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad)))*0.75)};
					echo '</td>
					<td>';
					echo {Math.round((((Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad)))*0.75)*18)/27 || 0)};
					echo '</td>
					<td></td>
				</tr>'
					

					$j++;
				}
			}
		}
		

        

        {aux.length > 0 && aux.map((nivel,i) =>

          asignaturas.length > 0 && asignaturas.filter(asignatura => asignatura.nivel.nombre === i+1).map((asignatura,j) =>
           
            <tr key={j}>
                <td>{i+1}{j+1}</td>
                <td></td>
                <td>{asignatura.codigo}</td>
                <td>{asignatura.nombre}</td>
                <td>18</td>
                <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)}</td>
                <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)}</td>
                <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)}</td>
                <td>{Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad))}</td>
                <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad)}</td>
                <td>{Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad))}</td>
                <td>{Math.round((Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad)))*0.75)}</td>
                <td>{Math.round((((Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad)))*0.75)*18)/27 || 0)}</td>
                <td></td>
            </tr>
          )

        )}
        ?>
        

                
			</table>
            
          </div>
</div>