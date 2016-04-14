'use strict';


(function() {
  var mainApp = angular.module("MainApp");

  var ClienteCadastroCtrl = function($scope, factory, $http, $localStorage) {

    $scope.FlgCPF = true;
    $scope.FlgSenha = "primary";

    var onError = function(error) {
      $scope.error = error.data;
    };

    //Busca de Endereço por CEP.
    $scope.BuscarEndereco = function(cep) {

      $http.get('http://viacep.com.br/ws/' + cep + '/json/')
        .success(function(data) {
          $scope.usu.logradouro = data.logradouro;
          $scope.usu.bairro = data.bairro;
          $scope.usu.localidade = data.localidade;
          $scope.usu.uf = data.uf;
        });
    };

    $scope.ValidarCPF = function(cpf) {

      $scope.FlgCPF = factory.ValidarCPF(cpf);

    };

    //add new person
    var onAddClienteCompleted = function(response) {
      $scope.Cliente = response.data;
      console.log(response.data);
      refresh();
    };

    $scope.SalvarCadastro = function(usu) {

      
      var a = $localStorage.token;
      
      usu.dataCadastro = new Date();
      usu.cadStatus = 1;

      usu.senha = CryptoJS.SHA1(usu.senha).toString();

      $http.post('/addCliente', usu)
        .then(onAddClienteCompleted, onError);
      console.log(Cliente);

    };

    $scope.LimparCampos = function() {
      $scope.usu.nome = '';
      $scope.usu.cpf = '';
      $scope.usu.cep = '';
      $scope.usu.sobrenome = '';
      $scope.usu.senha = '';
      $scope.usu.repearSenha = '';
      $scope.usu.logradouro = '';
      $scope.usu.bairro = '';
      $scope.usu.localidade = '';
      $scope.usu.uf = '';
      $scope.usu.numero = '';
      $scope.usu.email = '';
      $scope.FlgCPF = true;
    };
  }

  mainApp.controller('ClienteCadastroCtrl', ClienteCadastroCtrl);
}());