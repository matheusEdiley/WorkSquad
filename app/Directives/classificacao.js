var mainApp = angular.module("MainApp");

mainApp.directive('classificacao', function() {

	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			scope.dismiss = function() {
				element.modal('hide');
			};
		}
	}

});