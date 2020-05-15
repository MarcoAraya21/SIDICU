@extends('layouts.empty', ['paceTop' => true, 'bodyExtraClass' => 'bg-white'])

@section('title', 'Login Page')

@section('content')
	<!-- begin login -->
	<div class="login login-with-news-feed">
		<!-- begin news-feed -->
		<div class="news-feed">
			<div class="news-image" style="background-image: url(../assets/img/login-bg/login-bg-11.jpg)"></div>
			<div class="news-caption">
				<h4 class="caption-title"><b>Color</b> Admin App</h4>
				<p>
					Download the Color Admin app for iPhone®, iPad®, and Android™. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
			</div>
		</div>
		<!-- end news-feed -->
		<!-- begin right-content -->
		<div class="right-content">
			<!-- begin login-header -->
			<div class="login-header">
				<div class="brand">
					<span class="logo"></span> <b>Color</b> Admin
					<small>responsive bootstrap 3 admin template</small>
				</div>
				<div class="icon">
					<i class="fa fa-sign-in"></i>
				</div>
			</div>
			<!-- end login-header -->
			<!-- begin login-content -->
			<div class="login-content">
				<form class="margin-bottom-0" id="registerForm">
					<div class="row m-b-10">
						<div class="col-md-12">
							<input type="text" class="form-control form-control-lg" placeholder="Rut" name="rut" required />
							<div class="invalid-feedback" name="rut"></div>
						</div>
					</div>
					<div class="row m-b-10">
						<div class="col-md-12">
							<input type="password" minlength="5" class="form-control form-control-lg" placeholder="Ingrese Contraseña" name="password" required />
							<div class="invalid-feedback" name="password"></div>
						</div>
					</div>
					<div class="m-b-10">
						<div class="g-recaptcha" data-sitekey="6Lf-htoUAAAAAAFXTHj0QP-V_OQrfPe5hRMXewPa"></div>
						<div class="text-danger" name="captcha"></div>
					</div>
					<div class="login-buttons">
						<button type="button" onClick="enviar();" value="submit" id="button-send" class="btn btn-success btn-block btn-lg">Iniciar Sesión</button>
					</div>
					<div class="m-t-20 m-b-40 p-b-40 text-inverse">
						¿No tienes una cuenta? <a href="/registro" class="text-success">Regístrate</a>
						<br>
						¿Olvidaste tu contraseña? <a href="/recuperar-password" class="text-success">Recuperar</a>
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
	<script src="/assets/plugins/sweetalert/sweetalert.min.js"></script>
	
	<script>
		function enviar()
		{
			if(validar())
			{
				$('#button-send').attr('disabled', true); 
				$('#button-send').html('Sign Up <i class="fas fa-spinner fa-spin"></i>')
				
				fetch(`/api/auth/login`, {
					method: 'post',
					headers: {
						'Accept': 'application/json',
						'Content-Type':'application/json'
					},
					body: JSON.stringify(
						{
							rut: $('input[name="rut"]').val(),
							password: $('input[name="password"]').val(),
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
					if(data.status == "warning")
					{
						swal({
							title: data.message,
							icon: "warning",
							closeOnEsc : false,
							allowOutsideClick: false
						})
					}
					else
					{
						if(data.status == "danger")
						{
							swal({
								title: data.message,
								icon: "danger",
								closeOnEsc : false,
								allowOutsideClick: false
							})
						}
						else
						{
							if(data.status == "success")
							{
								window.location.replace("/home");
							}
							
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
			if($('input[name="password"]').val() == "")
			{
				$('input[name="password"]').addClass("is-invalid");
				$('div[name="password"]').html("Complete este campo.");
				$('input[name="password"]').removeClass("is-valid");
				errores.push($('input[name="password"]').attr('name'));
			}
			else
			{
				$('input[name="password"]').addClass("is-valid");
				$('div[name="password"]').html("");
				$('input[name="password"]').removeClass("is-invalid");
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