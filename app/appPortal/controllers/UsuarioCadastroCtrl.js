'use strict';


(function() {
	var mainApp = angular.module("MainApp");

	var UsuarioCadastroCtrl = function($scope, factory, $http) {
        
        $scope.FlgSenha = true;
		var onError = function(error) {
			$scope.error = error.data;
		};

		$scope.CadastrarUser = function(user, verifSenha) {

			if (user.senha != verifSenha) {
	            
	            $scope.FlgSenha = false;
				return false;
			};

			user.senha = CryptoJS.SHA1(user.senha).toString();

			$http.post('/user', user)
				.then(onCadastro, onError);

		};
        
        var onCadastro = function(user){
        	$scope.FlgCadastro = true;
        };

	}
	mainApp.controller('UsuarioCadastroCtrl', UsuarioCadastroCtrl);
}());