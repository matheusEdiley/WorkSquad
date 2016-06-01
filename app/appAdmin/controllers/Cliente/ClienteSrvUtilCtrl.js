'use strict';


(function() {
	var mainApp = angular.module("MainApp");

	var ClienteSrvUtilCtrl = function($scope, ServicosService) {

		var onError = function(error) {

			$scope.error = error.data;
			
		};

		var onSearch = function(callback) {

			$scope.servicos = callback.data;
		}

		ServicosService.allServices().then(onSearch, onError);

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