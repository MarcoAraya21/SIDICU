<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
	@include('includes.head')
</head>
@php
	$bodyClass = (!empty($boxedLayout)) ? 'boxed-layout' : '';
	$bodyClass .= (!empty($paceTop)) ? 'pace-top ' : '';
	$bodyClass .= (!empty($bodyExtraClass)) ? $bodyExtraClass . ' ' : '';
	$sidebarHide = (!empty($sidebarHide)) ? $sidebarHide : '';
	$sidebarTwo = (!empty($sidebarTwo)) ? $sidebarTwo : '';
	$topMenu = (!empty($topMenu)) ? $topMenu : '';
	$footer = (!empty($footer)) ? $footer : '';
	
	$pageContainerClass = (!empty($topMenu)) ? 'page-with-top-menu ' : '';
	$pageContainerClass .= (!empty($sidebarRight)) ? 'page-with-right-sidebar ' : '';
	$pageContainerClass .= (!empty($sidebarLight)) ? 'page-with-light-sidebar ' : '';
	$pageContainerClass .= (!empty($sidebarWide)) ? 'page-with-wide-sidebar ' : '';
	$pageContainerClass .= (!empty($sidebarHide)) ? 'page-without-sidebar ' : '';
	$pageContainerClass .= (!empty($sidebarMinified)) ? 'page-sidebar-minified ' : '';
	$pageContainerClass .= (!empty($sidebarTwo)) ? 'page-with-two-sidebar ' : '';
	$pageContainerClass .= (!empty($contentFullHeight)) ? 'page-content-full-height ' : '';
	
	$contentClass = (!empty($contentFullWidth) || !empty($contentFullHeight)) ? 'content-full-width ' : '';
	$contentClass .= (!empty($contentInverseMode)) ? 'content-inverse-mode ' : '';
@endphp
<body class="{{ $bodyClass }}">
<!-- <body class="{{ $bodyClass }}" oncontextmenu="return false" onkeydown="return false"> -->

	@include('includes.component.page-loader')
	
	<div id="page-container" class="page-container fade page-sidebar-fixed page-header-fixed {{ $pageContainerClass }}">
		
		@include('includes.header')
		
		@includeWhen($topMenu, 'includes.top-menu')
		
		@includeWhen(!$sidebarHide, 'includes.sidebar')
		
		@includeWhen($sidebarTwo, 'includes.sidebar-right')
		
		<div id="content" class="content {{ $contentClass }}">
			@yield('content')
		</div>
		
		@includeWhen($footer, 'includes.footer')
		
		@include('includes.component.theme-panel')
		
		@include('includes.component.scroll-top-btn')		
		
		@include('includes/footer_utem')
	</div>	
	<script src="/assets/plugins/sweetalert/sweetalert.min.js"></script>
	<script src="/assets/js/Router.js"></script>
	<script>
		function pad2(number) {   
			return (number < 10 ? '0' : '') + number;
		}
			var restante = {{ $restante }};
			var l = document.getElementById("restante");
			
				window.setInterval(function(){
					if(restante >= 0)
					{
						l.innerHTML = 'Tiempo Restante: ' + pad2(Math.trunc(restante/60)) + ':' + pad2(restante%60);;
						restante--;
						if(restante == 0)
						{
							window.location.href = "";
						}
					}	
				},1000);
	</script>
	<script>
		function logout()
		{
			fetch(`/api/auth/logout`, {
				method: 'get',
				headers: {
					'Accept': 'application/json',
					'Content-Type':'application/json'
				}
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
						icon: "success",
						closeOnEsc : false,
						allowOutsideClick: false
					})
					.then(function(){window.location.replace("/")});
				}
				else
				{
					if(data.status == "error")
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
				window.location.replace("/");
			})
		}
	</script>
	@include('includes.page-js')
	
</body>
</html>
