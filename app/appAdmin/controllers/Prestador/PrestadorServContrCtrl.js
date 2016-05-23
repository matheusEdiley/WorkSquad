'use strict';

(function() {
	var mainApp = angular.module("MainApp");

	var PrestadorServContrCtrl = function($scope, $http) {

		$scope.servicos = [{ "nome": "Carpintaria", "valor": "R$ 3.786,00", "pontos": "-", "quantidade": "4" }];

	}

	mainApp.controller('PrestadorServContrCtrl', PrestadorServContrCtrl);
}());