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
		'menu_admin' => 
		[
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Planes de Estudio',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/CrearPlanAdm',
						'title' => 'Crear Plan/Administrador'
					],
					[
						'url' => '/CrearPlan',
						'title' => 'Crear Plan'
					],
					[
						'url' => '/ListadoPlanes',
						'title' => 'Listado'
					],
					[
						'url' => '/MisPlanes',
						'title' => 'Mis Planes'
					],
					[
						'url' => '/home',
						'title' => 'Finalizados'
					]
				]
			],
			[
				'icon' => 'fa fa-chart-line',
				'title' => 'Indicadores',
				'url' => '/Indicadores',
			],
			[
				'icon' => 'fa fa-user-secret',
				'title' => 'Administrador',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => 'javascript:;',
						'title' => 'Editar Tablas',
						'sub_menu' => [
							[
								'url' => '/Carreras',
								'title' => 'Carreras'
							],
							[
								'url' => '/Escuelas',
								'title' => 'Escuelas'
							],
							[
								'url' => '/Facultades',
								'title' => 'Facultades'
							],
							[
								'url' => '/Grados',
								'title' => 'Grados'
							]
						]
					],
					[
						'url' => 'AsignarPerfil',
						'title' => 'Usuarios'
					]
				]
			]
		],

		'menu_jefe' => 
		[
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Planes de Estudio',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/CrearPlan',
						'title' => 'Crear Plan'
					],
					[
						'url' => '/Listado',
						'title' => 'Listado'
					],
					[
						'url' => '/home',
						'title' => 'Finalizados'
					]
				]
			],
			[
				'icon' => 'fa fa-chart-line',
				'title' => 'Indicadores',
				'url' => '/Indicadores',
			]
		],

		'menu_asesor' => 
		[
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Planes de Estudio',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/MisPlanes',
						'title' => 'Mis Planes'
					],
					[
						'url' => '/home',
						'title' => 'Finalizados'
					]
				]
			]
		],

		'menu_academico' => 
		[
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Planes de Estudio',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/MisPlanes',
						'title' => 'Mis Planes'
					],
					[
						'url' => '/home',
						'title' => 'Finalizados'
					]
				]
			]
		],

		'menu_invitado' => 
		[
			[
				'icon' => 'fa fa-hdd',
				'title' => 'Planes de Estudio',
				'url' => 'javascript:;',
				'sub_menu' => [
					[
						'url' => '/Finalizados',
						'title' => 'Finalizados'
					]
				]
			]
		],

];
