@extends('layouts.empty', ['paceTop' => true, 'bodyExtraClass' => 'bg-white'])

@section('title', 'Register Page')

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
	<!-- begin register -->
	<div class="register register-with-news-feed">
		<!-- begin news-feed -->
		<div class="news-feed">
			<div class="news-image" style="background-image: url(../assets/img/utem/patio-casa-central.jpg)"></div>
			<div class="news-caption">
				<h4 class="caption-title"><b>Registrate en SIDECU</b></h4>
				<p>
					<!-- As a Color Admin app administrator, you use the Color Admin console to manage your organization’s account, such as add new users, manage security settings, and turn on the services you want your team to access. -->
				</p>
			</div>
		</div>
		<!-- end news-feed -->
		<!-- begin right-content -->
		<div class="right-content">
			<!-- begin register-header -->
			<h1 class="register-header">
				Registrarse
				<!-- <small>Create your Color Admin Account. It’s free and always will be.</small> -->
			</h1>
			<!-- end register-header -->
			<!-- begin register-content -->
			<div class="register-content">
				<form class="margin-bottom-0" id="registerForm">
					<label class="control-label">Nombre Completo<span class="text-danger">*</span></label>
					<div class="row row-space-10">
						<div class="col-md-12 m-b-10">
							<input type="text" class="form-control" placeholder="Nombre" name="nombre" required />
							<div class="invalid-feedback" name="nombre"></div>
						</div>
					</div>
                    <div class="row row-space-10">
                        <div class="col-md-6 m-b-10">
							<input type="text" class="form-control" placeholder="Apellido Paterno" name="apellido_paterno" required />
							<div class="invalid-feedback" name="apellido_paterno"></div>
						</div>
						<div class="col-md-6 m-b-10">
							<input type="text" class="form-control" placeholder="Apellido Materno" name="apellido_materno" required />
							<div class="invalid-feedback" name="apellido_materno"></div>
						</div>
					</div>  
					<label class="control-label">Correo <span class="text-danger">*</span></label>
					<div class="row m-b-10">
						<div class="col-md-12 input-group">
							<div class="input-group-prepend"><span class="input-group-text">@</span></div>
							<input type="text" class="form-control" placeholder="Correo Electrónico" name="correo" required />
							<div class="invalid-feedback" name="correo"></div>
						</div>
					</div>
                    <label class="control-label">Rut<span class="text-danger">*</span></label>
					<div class="row m-b-10">
						<div class="col-md-12">
							<input type="text" class="form-control" placeholder="Ingrese Rut sin puntos ni dv" name="rut" required />
							<div class="invalid-feedback" name="rut"></div>
						</div>
					</div>
					<label class="control-label">Contraseña <span class="text-danger">*</span>
						<a type="button" class="btn btn-white"
							data-toggle="tooltip"
							data-placement="right"
							title="La contraseña debe ser de al menos 8 caracteres y alfanumérica (incluyendo mayúsculas y minúsculas).">
							<i class="fas fa-info text-info"></i>
						</a>
					</label>
					<div class="row m-b-10">
						<div class="col-md-12">
							<input type="password" minlength="5" class="form-control" placeholder="Ingrese Contraseña" name="password" required />
							<div class="invalid-feedback" name="password"></div>
						</div>
					</div>
					<label class="control-label">Confirmar Contraseña <span class="text-danger">*</span></label>
					<div class="row m-b-10">
						<div class="col-md-12">
							<input type="password" minlength="5" class="form-control" name="re-password" required />
							<div class="invalid-feedback" name="re-password"></div>
						</div>
					</div>
                    <label class="control-label">Fecha de Nacimiento<span class="text-danger">*</span></label>
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
					<!-- <div class="checkbox checkbox-css m-b-30">
						<div class="checkbox checkbox-css m-b-30">
							<input type="checkbox" id="agreement_checkbox" value="">
							<label for="agreement_checkbox">
								By clicking Sign Up, you agree to our <a href="javascript:;">Terms</a> and that you have read our <a href="javascript:;">Data Policy</a>, including our <a href="javascript:;">Cookie Use</a>.
							</label>
						</div>
					</div> -->
					<div class="register-buttons">
						<button type="button" onClick="enviar();" value="submit" id="button-send" class="btn btn-success btn-block btn-lg">Registrarse</button>
					</div>
					<div class="m-t-20 m-b-40 p-b-40 text-inverse">
						¿Tienes una cuenta? <a href="/" class="text-success">Inicia sesión</a>
					</div>
					<hr />
					<p class="text-center">
						&copy; Color Admin All Right Reserved 2018
					</p>
				</form>
			</div>
			<!-- end register-content -->
		</div>
		<!-- end right-content -->
	</div>
	<!-- end register -->
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
		// $('input[name="fec_na	c"]').datepicker({dateFormat: 'dd-mm-yy'});

		//  action="api/auth/register" method="post"
		function enviar()
		{
			// var inputs = document.getElementById("registerForm").elements;
			// var arregloForm = [];
			
			// arregloForm.push($('input[name="nombre"]'))
			// arregloForm.push($('input[name="apellido_paterno"]'))
			// arregloForm.push($('input[name="apellido_materno"]'))
			// arregloForm.push($('input[name="correo"]'))
			// arregloForm.push($('input[name="confirma_correo"]'))
			// arregloForm.push($('input[name="rut"]'))
			// arregloForm.push($('input[name="password"]'))
			// arregloForm.push($('input[name="fec_nac"]'))
			// console.log(arregloForm)
			
			// Iterate over the form controls
			// for (i = 0; i < inputs.length; i++) {
			// // Disable all form controls
			// inputs[i].setAttribute("disabled", "");
			// }
			if(validar())
			{
				$('#button-send').attr('disabled', true); 
				$('#button-send').html('Sign Up <i class="fas fa-spinner fa-spin"></i>')
				
				fetch(`/api/auth/register`, {
					method: 'post',
					headers: {
						'Accept': 'application/json',
						'Content-Type':'application/json'
					},
					body: JSON.stringify(
						{
							nombre: $('input[name="nombre"]').val(),
							apellido_paterno: $('input[name="apellido_paterno"]').val(),
							apellido_materno: $('input[name="apellido_materno"]').val(),
							correo: $('input[name="correo"]').val(),
							rut: $('input[name="rut"]').val(),
							password: $('input[name="password"]').val(),
							fec_nac: $('input[name="fec_nac"]').val()
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
					$('#button-send').html('Sign Up')
				});
			}
		}

		function validar(arreglo)
		{
			var errores = [];
			var regexLetras = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
			// var regexCorreo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			var regexCorreo = /^[\w.+\-]+@utem\.cl$/;
			var regexPassword = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))(?=.{8,})/;
			var regexDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
			var regexRut = /^[1-9][0-9]{6,7}$/
			if($('input[name="nombre"]').val() == "")
			{
				$('input[name="nombre"]').addClass("is-invalid");
				$('div[name="nombre"]').html("Complete este campo.");
				$('input[name="nombre"]').removeClass("is-valid");
				errores.push($('input[name="nombre"]').attr('name'));
			}
			else
			{
				if($('input[name="nombre"]').val().length >= 3 && $('input[name="nombre"]').val().length <= 20 && regexLetras.test($('input[name="nombre"]').val()))
				{
					$('input[name="nombre"]').addClass("is-valid");
					$('input[name="nombre"]').removeClass("is-invalid");
					$('div[name="nombre"]').html("");
				}
				else
				{
					$('input[name="nombre"]').addClass("is-invalid");
					$('div[name="nombre"]').html("Debe tener entre 3 y 20 caracteres, sin espacios.");
					$('input[name="nombre"]').removeClass("is-valid");
					errores.push($('input[name="nombre"]').attr('name'));
				}
			}
			if($('input[name="apellido_paterno"]').val() == "")
			{
				$('input[name="apellido_paterno"]').addClass("is-invalid");
				$('div[name="apellido_paterno"]').html("Complete este campo.");
				$('input[name="apellido_paterno"]').removeClass("is-valid");
				errores.push($('input[name="apellido_paterno"]').attr('name'));
			}
			else
			{
				if($('input[name="apellido_paterno"]').val().length >= 3 && $('input[name="apellido_paterno"]').val().length <= 20 && regexLetras.test($('input[name="apellido_paterno"]').val()))
				{
					$('input[name="apellido_paterno"]').addClass("is-valid");
					$('input[name="apellido_paterno"]').removeClass("is-invalid");
					$('div[name="apellido_paterno"]').html("");
				}
				else
				{
					$('input[name="apellido_paterno"]').addClass("is-invalid");
					$('div[name="apellido_paterno"]').html("Debe tener entre 3 y 20 caracteres.");
					$('input[name="apellido_paterno"]').removeClass("is-valid");
					errores.push($('input[name="apellido_paterno"]').attr('name'));
				}
			}
			if($('input[name="apellido_materno"]').val() == "")
			{
				$('input[name="apellido_materno"]').addClass("is-invalid");
				$('div[name="apellido_materno"]').html("Complete este campo.");
				$('input[name="apellido_materno"]').removeClass("is-valid");
				errores.push($('input[name="apellido_materno"]').attr('name'));
			}
			else
			{
				if($('input[name="apellido_materno"]').val().length >= 3 && $('input[name="apellido_materno"]').val().length <= 20 && regexLetras.test($('input[name="apellido_materno"]').val()))
				{
					$('input[name="apellido_materno"]').addClass("is-valid");
					$('input[name="apellido_materno"]').removeClass("is-invalid");
					$('div[name="apellido_materno"]').html("");
				}
				else
				{
					$('input[name="apellido_materno"]').removeClass("is-invalid")
					$('div[name="apellido_materno"]').html("Debe tener entre 3 y 20 caracteres.");
					$('input[name="apellido_materno"]').removeClass("is-valid");
					errores.push($('input[name="apellido_materno"]').attr('name'));
				}
			}
			if($('input[name="correo"]').val() == "")
			{
				$('input[name="correo"]').addClass("is-invalid");
				$('div[name="correo"]').html("Complete este campo.");
				$('input[name="correo"]').removeClass("is-valid");
				errores.push($('input[name="correo"]').attr('name'));
			}
			else
			{
				if(regexCorreo.test($('input[name="correo"]').val()))
				{
					$('input[name="correo"]').addClass("is-valid");
					$('input[name="correo"]').removeClass("is-invalid");
					$('div[name="correo"]').html("");
				}
				else
				{
					$('input[name="correo"]').addClass("is-invalid");
					$('div[name="correo"]').html("Ingrese un correo válido.");
					$('input[name="correo"]').removeClass("is-valid");
					errores.push($('input[name="correo"]').attr('name'));
				}
			}
			if($('input[name="rut"]').val() == "")
			{
				$('input[name="rut"]').addClass("is-invalid");
				$('div[name="rut"]').html("Complete este campo.");
				$('input[name="rut"]').removeClass("is-valid");
				errores.push($('input[name="rut"]').attr('name'));
			}
			else
			{
				if(regexRut.test($('input[name="rut"]').val()))
				{
					$('input[name="rut"]').addClass("is-valid");
					$('input[name="rut"]').removeClass("is-invalid");
					$('div[name="rut"]').html("");
				}
				else
				{
					$('input[name="rut"]').addClass("is-invalid");
					$('div[name="rut"]').html("Ingrese un Rut válido.");
					$('input[name="rut"]').removeClass("is-valid");
					errores.push($('input[name="rut"]').attr('name'));
				}
			}
			if($('input[name="password"]').val() == "")
			{
				$('input[name="password"]').addClass("is-invalid");
				$('div[name="password"]').html("Complete este campo.");
				$('input[name="password"]').removeClass("is-valid");
				errores.push($('input[name="password"]').attr('name'));
			}
			else
			{
				if(regexPassword.test($('input[name="password"]').val()))
				{
					$('input[name="password"]').addClass("is-valid");
					$('div[name="password"]').html("");
					$('input[name="password"]').removeClass("is-invalid");
				}
				else
				{
					$('input[name="password"]').addClass("is-invalid");
					$('div[name="password"]').html("Ingrese una contraseña válida.");
					$('input[name="password"]').removeClass("is-valid");
					errores.push($('input[name="password"]').attr('name'));
				}
			}
			if($('input[name="re-password"]').val() == "")
			{
				$('input[name="re-password"]').addClass("is-invalid");
				$('div[name="re-password"]').html("Complete este campo.");
				$('input[name="re-password"]').removeClass("is-valid");
				errores.push($('input[name="re-password"]').attr('name'));
			}
			else
			{
				if($('input[name="re-password"]').val() == $('input[name="password"]').val())
				{
					$('input[name="re-password"]').addClass("is-valid");
					$('input[name="re-password"]').removeClass("is-invalid");
					$('div[name="re-password"]').html("");
				}
				else
				{
					$('input[name="re-password"]').addClass("is-invalid");
					$('div[name="re-password"]').html("Las Contraseñas ingresadas no coinciden.");
					$('input[name="re-password"]').removeClass("is-valid");
					errores.push($('input[name="re-password"]').attr('name'));
				}
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
			// arreglo.map(elemento =>
			// 	elemento.val() == "" ? 
			// 	(errores = errores + elemento.attr('name') + ' invalido\n',
			// 	elemento.addClass("is-invalid"))
			// 	:
			// 	elemento.removeClass("is-invalid")
				
			// )
			// console.log(errores);
		}
	</script>
@endpush