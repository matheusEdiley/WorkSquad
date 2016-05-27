var mainApp = angular.module("MainApp");

mainApp.factory('autenticar', ['$window', function($window) {
	var usuarioToken = $window.sessionStorage.getItem('token');
	var usuario = $window.sessionStorage.getItem('usuario');
	
	usuario = angular.fromJson(usuario);
	var logado = {};
	return {
		estaLogado: function() {
			if (usuarioToken == null) {
				return false;
			} else {
				return true;
			}
		},
		status: {
			token: usuarioToken,
			usuario: usuario
		}
	}

}]);