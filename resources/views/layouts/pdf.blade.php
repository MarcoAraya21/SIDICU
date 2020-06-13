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
</head>
<body>
	<div id='header'>
		<img src="assets/img/logo/logo_utem.png" alt="Logo" height="70px" class="m-3">
		<div style="position:absolute;left:30%;margin-top:60px">
			<p style="float:left;width:33.33%;white-space:nowrap;font-family:'Times New Roman';font-size:15px;font-weight:bold;">Universidad Tecnológica Metropolitana</p>
			<p style="float:right;width:33.33%;white-space:nowrap;font-family:'Times New Roman';font-size:15px;font-weight:bold;">Vicerrectoría Académica</p>
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