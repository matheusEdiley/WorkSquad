var mainApp = angular.module("MainApp");

mainApp.service('ServicosService', function($http, autenticar) {

	this.addService = function(servico) {
		return $http.post('/app/servico/', servico);
	}

	this.searchService = function(servico) {
		return $http.get('/app/servico/' + servico._id);
	}

	this.addServicePrest = function(prestador) {
		return $http.post('/app/prestador/servico/', prestador);
	}
	
});