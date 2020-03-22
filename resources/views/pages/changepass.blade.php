@extends('layouts.default')

@section('title', 'Change Page')

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
	<div class="container py-4">
		<div class="login-content">
			<form class="margin-bottom-0" id="registerForm">
				<label class="control-label">Fecha de Nacimiento<span class="text-danger"></span></label>
				<div class="row m-b-10">
					<div class="col-md-12 input-group">
						<input type="text" class="form-control" id="datepicker-autoClose" data-date-format="dd/mm/yyyy" name="fec_nac" placeholder="dd/mm/aaaa" required/>
						<div class="input-group-append"><span class="input-group-text"><i class="fa fa-calendar"></i></span></div>
						<div class="invalid-feedback" name="fec_nac"></div>
					</div>
				</div>
				<label class="control-label">Nueva Contraseña <span class="text-danger">*</span>
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
				<label class="control-label">Repetir Nueva Contraseña <span class="text-danger">*</span></label>
				<div class="row m-b-10">
					<div class="col-md-12">
						<input type="password" minlength="5" class="form-control" name="re-password" required />
						<div class="invalid-feedback" name="re-password"></div>
					</div>
				</div>
				<div class="login-buttons">
					<button type="button" onClick="enviar();" value="submit" id="button-send" class="btn btn-success btn-block btn-lg">Nueva Contraseña</button>
				</div>
				<hr />
				<p class="text-center text-grey-darker">
					&copy; Color Admin All Right Reserved 2018
				</p>
			</form>
		</div>
	</div>
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
				$('#button-send').html('Sign Up <i class="fas fa-spinner fa-spin"></i>')
				
				fetch(`/api/auth/change`, {
					method: 'post',
					headers: {
						'Accept': 'application/json',
						'Content-Type':'application/json'
					},
					body: JSON.stringify(
						{
							fec_nac: $('input[name="fec_nac"]').val(),
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
								swal({
									title: data.message,
									icon: "info",
									closeOnEsc : false,
									allowOutsideClick: false
								})
								.then(function(){window.location.replace("/home")});
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
			var regexPassword = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))(?=.{8,})/;
			var regexDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

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
			return(!(errores.length > 0))
		}
	</script>
@endpush