@extends('layouts.pdf')

@section('content')
    <div class="news-feed">
		<div class="news-caption">
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