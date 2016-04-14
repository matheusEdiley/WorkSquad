'use strict';


(function() {
	var mainApp = angular.module("MainApp");

	var PortalCtrl = function($scope, factory, $http) {

		var onError = function(error) {
			$scope.error = error.data;
		};


	}
	mainApp.controller('PortalCtrl', PortalCtrl);
}());