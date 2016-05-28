'use strict';

(function() {
	var mainApp = angular.module("MainApp");

	var PrestadorServContrCtrl = function($scope, $http) {

		$scope.servicos = [{
			"nome": "Carpintaria",
			"valor": "R$ 3.786,00",
			"pontos": "-",
			"quantidade": "4"
		}, {
			"nome": "Eletricista",
			"valor": "-",
			"pontos": "5674",
			"quantidade": "10"
		}];

	}

	mainApp.controller('PrestadorServContrCtrl', PrestadorServContrCtrl);
}());