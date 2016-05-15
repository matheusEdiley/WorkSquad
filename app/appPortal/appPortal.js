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


mainApp.controller('appPortalCtrl', ['$scope', 'validacao', '$http', '$localStorage', '$state', '$window', function($scope, validacao, $http, $localStorage, $state, $window) {

	var onError = function(error) {
		$scope.error = error.data;
	};

	var onLoginRealizado = function(callback) {

		$('.modal-backdrop').remove();
		$window.sessionStorage.setItem('token', callback.data.token);
		$state.go("appAdmin.Main");
	};


	$scope.FazerLogin = function(usu) {
		usu.senha = CryptoJS.SHA1(usu.senha).toString();

		$window.sessionStorage.setItem('usuario', angular.toJson(usu));

		$http.post('/login', usu)
			.then(onLoginRealizado, onError);

	};

}]);