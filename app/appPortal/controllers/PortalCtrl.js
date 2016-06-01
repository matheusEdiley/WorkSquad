'use strict';


(function() {
	var mainApp = angular.module("MainApp");

	var PortalCtrl = function($scope, $http, ServicosService) {

		var onError = function(error) {
			$scope.error = error.data;
		};

		var onSearch = function(callback) {

			$scope.servicos = callback.data;
		}

		ServicosService.allServices().then(onSearch, onError);
	}
	mainApp.controller('PortalCtrl', PortalCtrl);
}());