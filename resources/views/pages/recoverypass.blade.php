@extends('layouts.empty', ['paceTop' => true, 'bodyExtraClass' => 'bg-white'])

@section('title', 'Recovery Page')

@push('css')
	<link href="/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.css" rel="stylesheet" />
	<link href="/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.css" rel="stylesheet" />
	<link href="/assets/plugins/ion-rangeslider/css/ion.rangeSlider.css" rel="stylesheet" />
	<link href="/assets/plugins/ion-rangeslider/css/ion.rangeSlider.skinNice.css" rel="stylesheet" />
	<link href="/assets/plugins/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css" rel="stylesheet" />
	<link href="/assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" />
	<link href="/assets/plugins/password-indicator/css/password-indicator.css" rel="stylesheet" />
	<link href="/assets/plugins/bootstrap-combobox/css/bootstrap-combobox.css" rel="stylesheet" />
	<link href="/assets/plugins/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet" />
	<link href="/assets/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.css" rel="stylesheet" />
	<link href="/assets/plugins/tag-it/css/jquery.tagit.css" rel="stylesheet" />
    <link href="/assets/plugins/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" />
    <link href="/assets/plugins/select2/dist/css/select2.min.css" rel="stylesheet" />
    <link href="/assets/plugins/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="/assets/plugins/bootstrap-colorpalette/css/bootstrap-colorpalette.css" rel="stylesheet" />
    <link href="/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker.css" rel="stylesheet" />
    <link href="/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker-fontawesome.css" rel="stylesheet" />
    <link href="/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker-glyphicons.css" rel="stylesheet" />
@endpush

@section('content')
	<!-- begin login -->
	<div class="login login-with-news-feed">
		<!-- begin news-feed -->
		<div class="news-feed">
			<div class="news-image" style="background-image: url(../assets/img/utem/patio-casa-central.jpg)"></div>
			<div class="news-caption">
				<h4 class="caption-title"><b>Bienvenido a SIDECU</b></h4>
				<p>
					Sistema de Desarrollo Curricular
				</p>
			</div>
		</div>
		<!-- end news-feed -->
		<!-- begin right-content -->
		<div class="right-content">
			<!-- begin login-header -->
			<div class="login-header">
				<div class="brand">
					<span class="logo"></span> <b>SIDECU</b>
					<small>Sistema de Desarrollo Curricular</small>
				</div>
				<div class="icon">
					<i class="fa fa-sign-in"></i>
				</div>
			</div>
			<!-- end login-header -->
			<!-- begin login-content -->
			<div class="login-content">
				<form class="margin-bottom-0" id="registerForm">
                    <label class="control-label">Rut<span class="text-danger"></span></label>
					<div class="row m-b-10">
						<div class="col-md-12">
							<input type="text" class="form-control form-control-lg" placeholder="Rut" name="rut" required />
							<div class="invalid-feedback" name="rut"></div>
						</div>
					</div>
					<label class="control-label">Fecha de Nacimiento<span class="text-danger"></span></label>
					<div class="row m-b-10">
						<div class="col-md-12 input-group">
							<input type="text" class="form-control" id="datepicker-autoClose" data-date-format="dd/mm/yyyy" name="fec_nac" placeholder="dd/mm/aaaa" required/>
							<div class="input-group-append"><span class="input-group-text"><i class="fa fa-calendar"></i></span></div>
							<div class="invalid-feedback" name="fec_nac"></div>
						</div>
					</div>
					<div class="m-b-10">
						<div class="g-recaptcha" data-sitekey="6Lf-htoUAAAAAAFXTHj0QP-V_OQrfPe5hRMXewPa"></div>
						<div class="text-danger" name="captcha"></div>
					</div>
					<div class="login-buttons">
						<button type="button" onClick="enviar();" value="submit" id="button-send" class="btn btn-success btn-block btn-lg">Enviar Contraseña</button>
					</div>
					<div class="m-t-20 m-b-40 p-b-40 text-inverse">
						¿No tienes una cuenta? <a href="/registro" class="text-success">Regístrate</a>
                        <br>
                        <a href="/login" class="text-success">Iniciar Sesión</a>
					</div>
					<hr />
					<p class="text-center text-grey-darker">
						&copy; Color Admin All Right Reserved 2018
					</p>
				</form>
			</div>
			<!-- end login-content -->
		</div>
		<!-- end right-container -->
	</div>
	<!-- end login -->
@endsection


@push('scripts')
    <script src="/assets/plugins/jquery-migrate/jquery-migrate.min.js"></script>
	<script src="/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
	<script src="/assets/plugins/ion-rangeslider/js/ion.rangeSlider.min.js"></script>
	<script src="/assets/plugins/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js"></script>
	<script src="/assets/plugins/jquery.maskedinput/src/jquery.maskedinput.js"></script>
	<script src="/assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
	<script src="/assets/plugins/password-indicator/js/password-indicator.js"></script>
	<script src="/assets/plugins/bootstrap-combobox/js/bootstrap-combobox.js"></script>
	<script src="/assets/plugins/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
	<script src="/assets/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>
	<script src="/assets/plugins/tag-it/js/tag-it.min.js"></script>
    <script src="/assets/plugins/moment/moment.js"></script>
    <script src="/assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
    <script src="/assets/plugins/select2/dist/js/select2.min.js"></script>
    <script src="/assets/plugins/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
    <script src="../assets/plugins/bootstrap-show-password/bootstrap-show-password.js"></script>
    <script src="/assets/plugins/bootstrap-colorpalette/js/bootstrap-colorpalette.js"></script>
    <script src="/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker.js"></script>
    <script src="/assets/plugins/clipboard/dist/clipboard.min.js"></script>
	<script src="/assets/js/demo/form-plugins.demo.js"></script>
	<script src="/assets/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js"></script>
	<script src="/assets/plugins/sweetalert/sweetalert.min.js"></script>
	
	<script>
        $('input[name="fec_nac"]').datepicker({
			language: 'es',
			autoclose: true,
			startDate: moment().subtract('years', 100).format('DD/MM/YYYY'),
			endDate: moment().subtract('years', 15).format('DD/MM/YYYY')
        });
        
		function enviar()
		{
			if(validar())
			{
				$('#button-send').attr('disabled', true); 
				$('#button-send').html('Cargando <i class="fas fa-spinner fa-spin"></i>')
				
				fetch(`/api/auth/forgot`, {
					method: 'post',
					headers: {
						'Accept': 'application/json',
						'Content-Type':'application/json'
					},
					body: JSON.stringify(
						{
							rut: $('input[name="rut"]').val(),
							fec_nac: $('input[name="fec_nac"]').val(),
						}
					)
				})
				.then(function(response) {
					if(response.ok) {
						return response.json();
					} else {
						throw "Error en la llamada Ajax";
					}
				
				})
				.then((data) =>{
					if(data.status == "success")
					{
						swal({
							title: data.message,
							text: "Se le ha enviado un mail de confirmación a " + data.correo,
							icon: "info",
							closeOnEsc : false,
							allowOutsideClick: false
						})
						.then(function(){window.location.replace("/")});
					}
					else
					{
						if(data.status == "warning")
						{
							swal({
								title: data.message,
								icon: "warning",
								closeOnEsc : false,
								allowOutsideClick: false
							})
						}
					}
				})
				.catch(function(error) {
					swal({
						title: "Oops...",
						text: "Ha ocurrido un error en el servidor, intente nuevamente!",
						icon: "error",
						closeOnEsc : false,
						allowOutsideClick: false
					})
				})
				.finally(function() {
					$('#button-send').attr('disabled', false); 
					$('#button-send').html('Enviar Contraseña')
				});
			}
		}

		function validar(arreglo)
		{
            var errores = [];
            var regexDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

			
			if($('input[name="rut"]').val() == "")
			{
				$('input[name="rut"]').addClass("is-invalid");
				$('div[name="rut"]').html("Complete este campo.");
				$('input[name="rut"]').removeClass("is-valid");
				errores.push($('input[name="rut"]').attr('name'));
			}
			else
			{
				$('input[name="rut"]').addClass("is-valid");
				$('input[name="rut"]').removeClass("is-invalid");
				$('div[name="rut"]').html("");
			}
			if($('input[name="fec_nac"]').val() == "")
			{
				$('input[name="fec_nac"]').addClass("is-invalid");
				$('div[name="fec_nac"]').html("Complete este campo.");
				$('input[name="fec_nac"]').removeClass("is-valid");
				errores.push($('input[name="fec_nac"]').attr('name'));
			}
			else
			{
				if(regexDate.test($('input[name="fec_nac"]').val()))
				{
					$('input[name="fec_nac"]').addClass("is-valid");
					$('input[name="fec_nac"]').removeClass("is-invalid");
					$('div[name="fec_nac"]').html("");
				}
				else
				{
					$('input[name="fec_nac"]').addClass("is-invalid");
					$('div[name="fec_nac"]').html("Ingrese una fecha válida.");
					$('input[name="fec_nac"]').removeClass("is-valid");
					errores.push($('input[name="fec_nac"]').attr('name'));
				}
			}
			if(grecaptcha.getResponse() == "")
			{
				$('.g-recaptcha').addClass("is-invalid");
				$('div[name="captcha"]').html("Valide el Captcha.");
				$('.g-recaptcha').removeClass("is-valid");
				errores.push('captcha');
			}
			else
			{
				$('.g-recaptcha').addClass("is-valid");
				$('.g-recaptcha').removeClass("is-invalid");
				$('div[name="captcha"]').html("");
			}
			console.log(errores)
			// console.log(errores.length > 0)

			return(!(errores.length > 0))
		}
	</script>
@endpush