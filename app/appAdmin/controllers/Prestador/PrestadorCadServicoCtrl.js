'use strict';

(function() {
  var mainApp = angular.module("MainApp");

  var PrestadorCadServicoCtrl = function($scope, $http) {
    
    $scope.tags = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];

  }

  mainApp.controller('PrestadorCadServicoCtrl', PrestadorCadServicoCtrl);
}());