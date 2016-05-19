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
		tipo: ''
	})

});

mainApp.controller('appAdminCtrl', ['$scope', '$state', 'autenticar', 'menu', '$window', '$stateParams', function($scope, $state, autenticar, menu, $window, $stateParams) {


	if (!autenticar.estaLogado()) {
		$state.go("appPortal.Portal");
	};

	var usuario = autenticar.status.usuario;
	$scope.Tipo = usuario.tipo;

	if ($state.current.tipo != '') {
		//Verificar se o tipo de usuário tem acesso a essa página
		if (usuario.tipo != $state.current.tipo) {
			$state.go("appPortal.Portal");
		};
	};

	//Criar o menu de acordo com o tipo de usuario
	$scope.Menu = menu.CriarMenu($scope.Tipo);

	$scope.Logout = function() {

        //$window.location.reload();
		$state.go("appPortal.Portal");
        
	};

}]);