<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

		'menu' => 
		[
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Proyectos internos',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/proyecto_interno',
						'title' => 'Listado'
					],
					[
						'url' => '/proyecto_interno/postulacion',
						'title' => 'Postulación'
					]
				]
			],
			
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Academico',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/modulos/academico',
						'title' => 'Academico'
					]
				]
			],

			[
				'icon' => 'fa fa-external-link-alt',
				'title' => 'Proyectos externos',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/postulacion',
						'title' => 'Postulación'
					]
				]
			],
			[
				'icon' => 'fa fa-cogs',
				'title' => 'Actividades',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/postulacion',
						'title' => 'Postulación'
					]
				]
			],
			[
				'icon' => 'fa fa-chart-line',
				'title' => 'Financiamiento',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/postulacion',
						'title' => 'Postulación'
					]
				]
			]
		]
];
