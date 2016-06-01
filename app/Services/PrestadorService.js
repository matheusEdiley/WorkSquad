var mainApp = angular.module("MainApp");

mainApp.service('PrestadorService', function($http, autenticar) {

	this.addPrestador = function(cliente) {
		return $http.post('/app/prestador/', cliente);
	}

	this.searchPrestador = function(user) {
		return $http.get('/app/prestador/' + user._id);
	}

	this.allPrestador = function() {
		return $http.get('/app/prestador/undefined');
	}
});