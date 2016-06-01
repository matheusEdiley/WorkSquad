var mainApp = angular.module("MainApp");

mainApp.factory('autenticar', ['$window', function($window) {

	var usuarioToken = $window.sessionStorage.getItem('token');
	var usuario = $window.sessionStorage.getItem('usuario');
	var entidade = $window.sessionStorage.getItem('entidade');

	usuario = angular.fromJson(usuario);
	
	// if (entidade != undefined) {
	// 	entidade = angular.fromJson(entidade);
	// }

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
			usuario: usuario,
			entidade: entidade
		}
	}

}]);