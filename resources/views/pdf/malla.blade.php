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
			<tbody>
                <?php
				foreach ($PlanEstudio->niveles as $key => $nivel) {
					echo "<tr>";
					$asignaturas_nivel = [];
					$j = 0;
					foreach ($PlanEstudio->asignaturas as $key => $asignatura)
					{
						if($nivel->nombre == $asignatura->nivel->nombre)
						{
							$asignaturas_nivel[$j] = $asignatura;
							$j++;
						}
					}
					for ($i=0; $i < 6; $i++) { 
						if(isset($asignaturas_nivel[$i]))
						{
							$sct = 0;
							foreach ($asignaturas_nivel[$i]->asignatura_horas as $key2 => $asignatura_hora) {
								$sct = $sct + $asignatura_hora->cantidad;
							}
							$sct = $sct/2;
							echo "<td style='width: 135px'>
							<p>".
							$nivel->nombre.($i+1)
							."</p>
							<p>".
							$asignaturas_nivel[$i]->nombre
							."</p>
							<p>".
							$sct
							."</p>
							</td>";
						}
						else
						{
							echo "<td></td>";
						}
					}
					echo "</tr>";
				}
				?>
			</tbody>
		</table>    
    </div>
</div>