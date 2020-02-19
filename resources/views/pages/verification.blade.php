@extends('layouts.empty', ['paceTop' => true])

@section('title', '404 Error Page')

@section('content')
	<!-- begin error -->
	<div class="error">
		<div class="error-code m-b-10">
			@if ( $status == "error" )
				Error
			@else
				@if ( $status == "success" )
					<i class="far fa-check-circle text-success"></i>
				@endif
			@endif
			
		</div>
		<div class="error-content">
			<div class="error-message">{{ $mensaje }}</div>
			<!-- <div class="error-desc m-b-30">
				The page you're looking for doesn't exist. <br />
				Perhaps, there pages will help find what you're looking for.
			</div> -->
			<div>
				<a href="/" class="btn btn-success p-l-20 p-r-20">Iniciar Sesión</a>
			</div>
		</div>
	</div>
	<!-- end error -->
@endsection
        
