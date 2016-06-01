'use strict';


(function() {
  var mainApp = angular.module("MainApp");

  var ClienteCadastroCtrl = function($scope, metodosAux, $http, $localStorage, ClienteService, $window, autenticar) {

    var ClienteEntid = $window.sessionStorage.getItem('entidade');

    if (ClienteEntid != "undefined") {
      ClienteEntid = angular.fromJson(ClienteEntid);
    }

    $scope.FlgCPF = true;
    $scope.FlgSenha = "primary";
    $scope.Flg = false;

    var onError = function(error) {
      $scope.error = error.data;
    };

    var onSalvo = function(callback) {
      var a = callback;
    };

    //Busca de Endereço por CEP.
    $scope.BuscarEndereco = function(cep) {

      $http.get('http://viacep.com.br/ws/' + cep + '/json/')
        .success(function(data) {
          $scope.cliente.logradouro = data.logradouro;
          $scope.cliente.bairro = data.bairro;
          $scope.cliente.localidade = data.localidade;
          $scope.cliente.uf = data.uf;
        });
    };

    $scope.ValidarCPF = function(cpf) {

      $scope.FlgCPF = metodosAux.ValidarCPF(cpf);

    };

    var onAddClienteCompleted = function(response) {
      $scope.Cliente = response.data;
      console.log(response.data);
      refresh();
    };

    $scope.SalvarCadastro = function(cliente) {

      if (ClienteEntid != "undefined") {

        cliente._clienteId = ClienteEntid._id;
        cliente.userid = ClienteEntid.user._id;

      } else {

        var user = angular.fromJson($window.sessionStorage.getItem('usuario'));
        cliente.userid = user._id;
        
      }

      $window.sessionStorage.setItem('entidade', angular.toJson(cliente));

      ClienteService.addCliente(cliente)
        .then(onSalvo, onError);
      $scope.Flg = true;
    };



    $scope.LimparCampos = function() {
      $scope.cliente.nome = '';
      $scope.cliente.cpf = '';
      $scope.cliente.cep = '';
      $scope.cliente.sobrenome = '';
      $scope.cliente.senha = '';
      $scope.cliente.repearSenha = '';
      $scope.cliente.logradouro = '';
      $scope.cliente.bairro = '';
      $scope.cliente.localidade = '';
      $scope.cliente.uf = '';
      $scope.cliente.numero = '';
      $scope.cliente.email = '';
      $scope.FlgCPF = true;
    };
  }

  mainApp.controller('ClienteCadastroCtrl', ClienteCadastroCtrl);
}());