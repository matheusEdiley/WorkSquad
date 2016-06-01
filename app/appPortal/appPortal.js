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


mainApp.controller('appPortalCtrl', ['$scope', 'metodosAux', '$http', '$localStorage', '$state', '$window', 'ClienteService', 'PrestadorService', function($scope, metodosAux, $http, $localStorage, $state, $window, ClienteService, PrestadorService) {

	var onError = function(error) {
		$scope.error = error.data;
	};

	var onCadastroLocalizado = function(callback) {

		$state.go("appAdmin.Main");

	};

	var onLoginRealizado = function(callback) {

		CloseModal();

		$window.sessionStorage.setItem('usuario', angular.toJson(callback.data.user));
		$window.sessionStorage.setItem('token', callback.data.token);

		if (callback.data.user.tipo == "Cliente") {
			ClienteService.searchCliente(callback.data.user)
				.then(onCadastroLocalizado, onError);
		} else if (callback.data.user.tipo == "Prestador") {
			PrestadorService.searchPrestador(callback.data.user)
				.then(onCadastroLocalizado, onError);
		} else {
			$state.go("appAdmin.AdmGerenUsu");
		}
	};

	$scope.LimparLogin = function() {

		$scope.usu.login = "";
		$scope.usu.senha = "";

	};

	var CloseModal = function() {

		$('.modal-backdrop').remove();

	};

	$scope.FazerLogin = function(usu) {

		usu.senha = CryptoJS.SHA1(usu.senha).toString();

		$http.post('/login', usu)
			.then(onLoginRealizado, onError);

	};

}]);