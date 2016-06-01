'use strict';

(function() {
  var mainApp = angular.module("MainApp");

  var MainCtrl = function($scope, $http, autenticar, $window, ClienteService, PrestadorService) {

    var user = angular.fromJson($window.sessionStorage.getItem('usuario'));

    var onError = function(error) {

      $scope.error = error.data;

    };

    var onCadastroLocalizado = function(callback) {

      $window.sessionStorage.setItem('entidade', angular.toJson(callback.data[0]));

      var ent = callback.data[0];

      $scope.nomecompleto = ent.nome + " " + ent.sobrenome;
      $scope.cep = ent.cep;
      $scope.logradouro = ent.logradouro;
      $scope.tipo = ent.user.tipo;
      $scope.cpf = ent.cpf;
      $scope.email = ent.user.email;
      $scope.bairro = ent.bairro;
      $scope.localidade = ent.localidade;
      $scope.telefone = ent.telefone;
      $scope.celular = ent.celular;

      if (ent.user.tipo == "Cliente") {
        $scope.linkCad = "appAdmin.ClienteCadastro";
      } else if (ent.user.tipo == "Prestador") {
        $scope.linkCad = "appAdmin.PrestadorCadastro";
      } 

    };


    if (user.tipo == "Cliente") {

      ClienteService.searchCliente(user)
        .then(onCadastroLocalizado, onError);

    } else if (user.tipo == "Prestador") {

      PrestadorService.searchPrestador(user)
        .then(onCadastroLocalizado, onError);

    }

  }

  mainApp.controller('MainCtrl', MainCtrl);
}());