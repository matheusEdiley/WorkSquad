'use strict';

(function() {
	var mainApp = angular.module("MainApp");

	var PrestadorCadServicoCtrl = function($scope, $http, ServicosService, $window) {

		var PrestEntid = $window.sessionStorage.getItem('entidade');
		$scope.Flg = false;
		if (PrestEntid != undefined) {
			PrestEntid = angular.fromJson(PrestEntid);
		}

		$scope.tags = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];

		var onError = function(error) {
			$scope.error = error.data;
		};

		var onSalvo = function(callback){
			$scope.Flg = true;
		}

		var onCadastro = function(callback) {

			PrestEntid.servicos = PrestEntid.servicos.concat(callback.data._id);
			ServicosService.addServicePrest(PrestEntid).then(onSalvo, onError);

		}

		$scope.SalvarServico = function(servico) {
			
			servico.diasDaSemana = $scope.tags;
			ServicosService.addService(servico).then(onCadastro, onError);
		}
	}

	mainApp.controller('PrestadorCadServicoCtrl', PrestadorCadServicoCtrl);
}());