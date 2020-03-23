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
		@page { margin: 180px 70px; } 
		#header { position: fixed; left: 0px; top: -180px; right: 0px; height: 150px;} 
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

		
	</style>
	<title>Plan de Estudio</title>
</head>
<body>
	<div id='header' style="display:none;">
		<img src="assets/img/utem/logo_gob_footer_grande.png" alt="Logo" height="100px" class="m-3">
		<div>
			<p>Universidad Tecnológica Metropolitana</p>
		</div>
		<div >
			<p>Vicerrectoría Académica</p>
		</div>
    </div>
	<div id="content">
		@yield('content')
		<div class="firma">
			
		</div>
	</div>
	<div id="footer">
		<div class="division"></div> 
		
	</div>
</body>
</html>