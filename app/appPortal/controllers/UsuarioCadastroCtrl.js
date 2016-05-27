'use strict';


(function() {
	var mainApp = angular.module("MainApp");

	var UsuarioCadastroCtrl = function($scope, $http, ClienteService, metodosAux) {

		$scope.FlgSenha = true;

		var onError = function(error) {
			$scope.error = error.data;
		};

		$scope.CadastrarUser = function(entid, verifSenha) {

			if (entid.user.senha != verifSenha) {

				$scope.FlgSenha = false;
				return false;
			};

			entid.user.senha = CryptoJS.SHA1(entid.user.senha).toString();

			$http.post('/user', entid.user)
				.then(onCadastro, onError);


		};

		var onCadastro = function(user) {

			if (user.data.tipo == "Cliente") {

				//Adicionando um cliente
				ClienteService.addCliente(user.data).then(onCadastroEntidade, onError);
			};

			$scope.FlgCadastro = true;
		};

		var onCadastroEntidade = function(entidade) {

			$scope.FlgCadastro = true;
			
		};

	}
	mainApp.controller('UsuarioCadastroCtrl', UsuarioCadastroCtrl);
}());