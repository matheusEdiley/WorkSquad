'use strict';


(function() {
  var mainApp = angular.module("MainApp");

  var ClienteServCtrl = function($scope, metodosAux, $http, ServicosService, $window) {

    var ClienteEntid = angular.fromJson($window.sessionStorage.getItem('entidade'));

    $scope.filtro = 'Filtrar por ';
    $scope.Flg = false;

    var onError = function(error) {
      $scope.error = error.data;
    };

    var onSearch = function(callback) {
      $scope.servicos = callback.data;
    }

    ServicosService.allServices().then(onSearch, onError);

    $scope.SelecionarFiltro = function(parametro) {

      $scope.filtro = parametro;

    }

    var onServicoCadastrado = function(callback) {
      $scope.Flg = true;
    }

    $scope.ContratarServico = function(servico) {

      ClienteEntid.servicos = ClienteEntid.servicos.concat(servico);

    }
  }
  mainApp.controller('ClienteServCtrl', ClienteServCtrl);
}());