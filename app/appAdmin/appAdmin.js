var mainApp = angular.module("MainApp");

mainApp.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/appAdmin/Main");
	//
	// Now set up the states
	$stateProvider
		

		.state('appAdmin.ClienteCadastro', {
			url: "/ClienteCadastro",
			templateUrl: "app/appAdmin/views/Cliente/ClienteCadastro.html",
			controller: 'ClienteCadastroCtrl'
		})
         
		.state('appAdmin.ClienteServ', {
			url: "/ClienteServ",
			templateUrl: "app/appAdmin/views/Cliente/ClienteServ.html",
			controller: 'ClienteServCtrl'
		})
		.state('appAdmin.ClienteSrvUtil', {
			url: "/ClienteSrvUtil",
			templateUrl: "app/appAdmin/views/Cliente/ClienteSrvUtil.html"
			
		})

		.state('appAdmin.PrestadorCadastro', {
			url: "/PrestadorCadastro",
			templateUrl: "app/appAdmin/views/Prestador/PrestadorCadastro.html",
			controller: 'PrestadorCadastroCtrl'
		})
		.state('appAdmin.PrestadorCadServ', {
			url: "/PrestadorCadServ",
			templateUrl: "app/appAdmin/views/Prestador/PrestadorCadServico.html"
		})
 
        .state('appAdmin.PrestadorServContr', {
			url: "/PrestadorServContr",
			templateUrl: "app/appAdmin/views/Prestador/PrestadorServContr.html"
		})

		.state('appAdmin.AdmGerenUsu', {
			url: "/AdmGerenUsu",
			templateUrl: "app/appAdmin/views/Admin/AdmGerenUsu.html",
			controller: 'AdmGerenUsuCtrl'
		})
        
        .state('appAdmin.Main', {
			url: "/Main",
			templateUrl: "app/appAdmin/views/Main.html"
		})
       
	});

mainApp.controller('appAdminCtrl', ['$scope', function ($scope) {
	$scope.teste = "Funcionou";
}]);