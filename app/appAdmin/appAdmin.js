var mainApp = angular.module("MainApp");

mainApp.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/appAdmin/Main");
	//
	// Now set up the states
	$stateProvider.state('appAdmin.ClienteCadastro', {
		url: "/ClienteCadastro",
		templateUrl: "app/appAdmin/views/Cliente/ClienteCadastro.html",
		controller: 'ClienteCadastroCtrl',
		tipo: 'Cliente'
	})

	.state('appAdmin.ClienteServ', {
			url: "/ClienteServ",
			templateUrl: "app/appAdmin/views/Cliente/ClienteServ.html",
			controller: 'ClienteServCtrl',
			tipo: 'Cliente'
		})
		.state('appAdmin.ClienteSrvUtil', {
			url: "/ClienteSrvUtil",
			templateUrl: "app/appAdmin/views/Cliente/ClienteSrvUtil.html",
			tipo: 'Cliente'

		})

	.state('appAdmin.PrestadorCadastro', {
			url: "/PrestadorCadastro",
			templateUrl: "app/appAdmin/views/Prestador/PrestadorCadastro.html",
			controller: 'PrestadorCadastroCtrl',
			tipo: 'Prestador'
		})
		.state('appAdmin.PrestadorCadServ', {
			url: "/PrestadorCadServ",
			templateUrl: "app/appAdmin/views/Prestador/PrestadorCadServico.html",
			tipo: 'Prestador'
		})

	.state('appAdmin.PrestadorServContr', {
		url: "/PrestadorServContr",
		templateUrl: "app/appAdmin/views/Prestador/PrestadorServContr.html",
		tipo: 'Prestador'
	})

	.state('appAdmin.AdmGerenUsu', {
		url: "/AdmGerenUsu",
		templateUrl: "app/appAdmin/views/Admin/AdmGerenUsu.html",
		controller: 'AdmGerenUsuCtrl',
		tipo: 'Administrador'
	})

	.state('appAdmin.Main', {
		url: "/Main",
		templateUrl: "app/appAdmin/views/Main.html",
		tipo: 'Administrador'
	})



});

mainApp.controller('appAdminCtrl', ['$scope', '$state', 'autenticar', 'menu', '$window', function($scope, $state, autenticar, menu, $window) {
		
		if (!autenticar.estaLogado()) {
 			$state.go("appPortal.Portal");
 		};
 		
		var usuario = angular.fromJson($window.sessionStorage.getItem('usuario'));
		$scope.Tipo = usuario.tipo;
		$scope.Menu = menu.CriarMenu($scope.Tipo);

	}])
	// .run(function($scope, autenticar) {
	// 	$scope.$on("$locationChangeStart", function(event, next, current) {

// 		if (!autenticar.estaLogado()) {
// 			$state.go("appPortal.Portal");
// 		};

// 		console.log(toUrl);
// 	});
// })
;