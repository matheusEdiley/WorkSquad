'use strict';


(function() {
  var mainApp = angular.module("MainApp");

  var ClienteServCtrl = function($scope, factory, $http) {
    $scope.filtro = 'Filtrar por ';

    var onError = function(error) {
      $scope.error = error.data;
    };

    $scope.SelecionarFiltro = function(parametro) {
      $scope.filtro = parametro;
    };
  }
  mainApp.controller('ClienteServCtrl', ClienteServCtrl);
}());