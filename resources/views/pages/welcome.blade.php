@extends('layouts.default')

@section('title', 'Index')

@section('content')
	<!-- begin login -->
	@if ( $_COOKIE['token'] )
	@endif
	
	<div id='home'></div>
@endsection





