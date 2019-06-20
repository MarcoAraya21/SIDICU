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
				'title' => 'Planes de Estudio',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '',
						'title' => 'Listado'
					],
					[
						'url' => '/',
						'title' => 'Finalizados'
					]
				]
			],
			
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Gestion de Asignaturas',
				'url' => 'javascript:;'
			],

			[
				'icon' => 'fa fa-chart-line',
				'title' => 'Indicadores',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '',
						'title' => 'Postulación'
					]
				]
			]
		]
];
