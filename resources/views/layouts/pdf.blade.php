<!DOCTYPE html>
<html>
<head>
	{{-- <link href="{{asset('assets/css/bundle.css')}}" rel="stylesheet" />
	<link href="{{asset('assets/css/estilos.css')}}" rel="stylesheet" /> --}}
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
  	<style>
		/* @font-face {
			font-family: "San Francisco";
			font-weight: 500;
			src: url(data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAIDQABQAAAABXwwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABC...) format('woff');
		} */
		body {
			font-family: 'San Francisco', sans-serif;
		}
		@page { margin: 180px 50px; } 
		#header { position: fixed; left: 0px; top: -180px; right: 0px; height: 150px; } 
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
	</style>
	<title>Memorandum</title>
</head>
<body>
	<div id='header'>
		<img src="assets/img/utem/pdf_logo.png" alt="Logo" height="100px" class="m-3">
	</div>
	<div id="content">
		@yield('content')
		<div class="firma">
			<p><b> Elizabeth Troncoso Ahués </b></p>
			<p>Directora de Investigación</p>
			<p>Vicerrectoría de Investigación y Postgrado</p>
			<p>Universidad Tecnológica Metropolitana</p>
		</div>
	</div>
	<div id="footer">
		<div class="division"></div> 
		<p>
			Dirección de Investigación – VRIP - Universidad Tecnológica Metropolitana
		</p> 
		<p>
			Dieciocho 161, Santiago, Chile. Correo electrónico: dir.investigacion@utem.cl
		</p>
	</div>
</body>
</html>