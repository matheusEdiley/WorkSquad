var mainApp = angular.module("MainApp");

mainApp.config(function($stateProvider, $urlRouterProvider) {
	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/appPortal/Portal");

	$stateProvider
		.state('appPortal.UsuarioCadastro', {
			url: "/UsuarioCadastro",
			templateUrl: "app/appPortal/views/UsuarioCadastro.html",
			controller: 'UsuarioCadastroCtrl'
		})
		.state('appPortal.Portal', {
			url: "/Portal",
			templateUrl: "app/appPortal/views/Portal.html",
			controller: 'PortalCtrl'
		})

});


var mainApp = angular.module("MainApp");

var appPortalCtrl = function($scope, factory, $http, $localStorage) {

	var onError = function(error) {
		$scope.error = error.data;
	};

	var onLoginRealizado = function(callback) {
		$localStorage.token = callback.data.token;
	};


	$scope.FazerLogin = function(usu) {

		$http.post('/login', usu)
			.then(onLoginRealizado, onError);

	};

}


mainApp.controller('appPortalCtrl', appPortalCtrl);