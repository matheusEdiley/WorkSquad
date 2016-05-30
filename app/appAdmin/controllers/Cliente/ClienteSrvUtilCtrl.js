'use strict';


(function() {
	var mainApp = angular.module("MainApp");

	var ClienteSrvUtilCtrl = function($scope) {

		$scope.servicos = [{
			"nome": "Carpintaria",
			"prestador": "José",
			"valor": "34,90"
			
		}];

		$scope.rating = 0;
		$scope.ratings = [{
			current: 3,
			max: 5
		}];

		$scope.getSelectedRating = function(rating) {
			console.log(rating);
		}

	}

	mainApp.controller('ClienteSrvUtilCtrl', ClienteSrvUtilCtrl);
}());