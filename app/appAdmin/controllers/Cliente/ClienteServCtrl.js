'use strict';


(function() {
  var mainApp = angular.module("MainApp");

  var ClienteServCtrl = function($scope, metodosAux, $http, ServicosService, $window, ClienteService) {

    var ClienteEntid = angular.fromJson($window.sessionStorage.getItem('entidade'));

    $scope.filtro = 'Filtrar por ';
    $scope.Flg = false;

    var onError = function(error) {
      $scope.error = error.data;
    };

    var onSearch = function(callback) {

      $scope.servicos = callback.data;
      // for (serv in $scope.servicos) {

      // }
    }

    ServicosService.allServices().then(onSearch, onError);

    $scope.SelecionarFiltro = function(parametro) {

      $scope.filtro = parametro;

    }

    $scope.Pesquisar = function(value) {
      
      var filtros = "";
      
      if ($scope.filtro == "Categoria") {
        filtros = "categoria";
      } else {
        filtros = "prestador";
      }

      ServicosService.pesquisarServ(value, filtros).then(onSearch, onError);
    }

    var onServicoCadastrado = function(callback) {
      $scope.Flg = true;
    }

    var onSalvo = function(callback) {
      var a = callback;
    };

    $scope.ContratarServico = function(servico) {

      ClienteEntid.servicos = ClienteEntid.servicos.concat(servico._id);

      $window.sessionStorage.setItem('entidade', angular.toJson(ClienteEntid));

      ClienteEntid._clienteId = ClienteEntid._id;
      ClienteEntid.userid = ClienteEntid.user._id;

      ClienteService.addCliente(ClienteEntid)
        .then(onSalvo, onError);
      $scope.Flg = true;
    }

  }
  mainApp.controller('ClienteServCtrl', ClienteServCtrl);
}());