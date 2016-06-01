'use strict';


(function() {
	var mainApp = angular.module("MainApp");

	var ClienteSrvUtilCtrl = function($scope, ServicosService, $window) {

		var ClienteEntid = $window.sessionStorage.getItem('entidade');
		$scope.servicos = [];

		if (ClienteEntid != "undefined") {
			ClienteEntid = angular.fromJson(ClienteEntid);
		}

		var onError = function(error) {

			$scope.error = error.data;

		};

		var onSearch = function(callback) {

			$scope.servicos = $scope.servicos.concat(callback.data);
		}

		angular.forEach(ClienteEntid.servicos, function(value) {

			ServicosService.searchService(value).then(onSearch, onError);
			
		});

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