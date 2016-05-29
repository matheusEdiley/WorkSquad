var mainApp = angular.module("MainApp");

mainApp.service('ClienteService', function($http, autenticar) {

	this.addCliente = function(cliente) {
		return $http.post('/app/cliente/', cliente);
	}

	this.searchCliente = function(user) {
		return $http.get('/app/cliente/' + user._id);
	}

});