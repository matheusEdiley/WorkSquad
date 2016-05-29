'use strict';

(function() {
  var mainApp = angular.module("MainApp");

  var MainCtrl = function($scope, $http, autenticar, $window, ClienteService) {

    var user = angular.fromJson($window.sessionStorage.getItem('usuario'));

    var onError = function(error) {

      $scope.error = error.data;

    };

    var onCadastroLocalizado = function(callback) {

      $window.sessionStorage.setItem('entidade', angular.toJson(callback.data[0]));
     
      $scope.nomecompleto = "Matheus" + " Ediley";
      $scope.cep = "34515-470";
      $scope.logradouro = "Rua José Machado Chaves";
      $scope.tipo = "Cliente";
      $scope.cpf = "125.622.936-90";
      $scope.email = "matheus.ediley@gmail.com";
      $scope.bairro = "Campo Santo Antônio";
      $scope.cidade = "Sabará";
      $scope.telefone = "(31) 3674-7677";
      $scope.celular = "(98) 8975-4565";
      $scope.linkCad = "appAdmin.ClienteCadastro";

    };


    if (user.tipo == "Cliente") {

      ClienteService.searchCliente(user)
        .then(onCadastroLocalizado, onError);

    };

  }

  mainApp.controller('MainCtrl', MainCtrl);
}());