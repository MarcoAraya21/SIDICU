@extends('layouts.empty', ['paceTop' => true, 'bodyExtraClass' => 'bg-white'])

@section('title', 'Login Page')

@section('content')
    <div class="news-feed">
		<div class="news-caption">
			<h1 class="caption-title" style="text-align:center"><b>Datos Iniciales</b></h1>
			<table style="width:100%;border:1px solid #000">
				<tr>
					<td>Nombre</td>
					<td>{{$nombre}}</td>
				</tr>
				<tr>						
					<td>Código</td>
					<td>Valor</td>
				</tr>
				<tr>						
					<td>Carrera</td>
					<td>Valor</td>
				</tr>
				<tr>						
					<td>Tipo de Plan</td>
					<td>Valor</td>
				</tr>
				<tr>						
					<td>Tipo de Ingreso</td>
					<td>Valor</td>
				</tr>

				<tr>
					<td>Encargado UIC</td>
					<td>Valor</td>				
				</tr>
				<tr>
					<td>Coordinador</td>
					<td>Valor</td>
				</tr>

			</table>
		</div>
	</div>

	<div>
		<h1>{{ $heading}}</h1>
		<div>
			<p>{{$content}}</p>
		</div>
	</div>




@endsection