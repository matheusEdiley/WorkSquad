// Declare app level module which depends on views, and components
angular.module('MainApp', [
	'ui.router',
	'ui.mask',
	'ngStorage'

]).
config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	//$urlRouterProvider.otherwise('/appPortal/a');
	$stateProvider
		.state('appAdmin', {
			url: "/appAdmin",
			templateUrl: "app/appAdmin/appAdmin.html",
			controller: "appAdminCtrl",
			restrito: true
		})
		.state('appPortal', {
			url: "/appPortal",
			templateUrl: "app/appPortal/appPortal.html",
			controller: "appPortalCtrl"
		})
}])


.factory('factory', ['$http', function($http) {


	function ValidarCPF(cpf) {

		cpf = cpf.replace(/[^\d]+/g, '');
		if (cpf == '') return false;
		// Elimina CPFs invalidos conhecidos    
		if (cpf.length != 11 ||
			cpf == "00000000000" ||
			cpf == "11111111111" ||
			cpf == "22222222222" ||
			cpf == "33333333333" ||
			cpf == "44444444444" ||
			cpf == "55555555555" ||
			cpf == "66666666666" ||
			cpf == "77777777777" ||
			cpf == "88888888888" ||
			cpf == "99999999999")
			return false;
		// Valida 1º digito 
		add = 0;
		for (i = 0; i < 9; i++)
			add += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(9)))
			return false;
		// Valida 2º digito 
		add = 0;
		for (i = 0; i < 10; i++)
			add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(10)))
			return false;
		return true;

	}

	//var teste = 'TESTE';

	return {
		//teste: teste,
		ValidarCPF: ValidarCPF
	};
}])

.factory('verificar', ['$window', function($window) {
		var usuarioToken = $window.sessionStorage.getItem('token');
		var usuario = $window.sessionStorage.getItem('usuario');
		usuario = angular.fromJson(usuario);
		var logado = {};
		return {
			estaLogado: function() {
				if (usuarioToken == null) {
					return false;
				} else {
					return true;
				}
			},
			status: {
				token: usuarioToken,
				usuario: usuario
			}
		}

	}])
	.factory('Menu', [function() {

		return {
			//teste: teste,
			CriarMenu: function(tipo) {
				var menu = [];
				if (tipo == "Cliente") {
					
					menu = [{
						"Nome": "Cadastro",
						"Link": "appAdmin.ClienteCadastro"
					}, {
						"Nome": "Serviços",
						"Link": "appAdmin.ClienteServ"
					}, {
						"Nome": "Serviços Utilizados",
						"Link": "appAdmin.ClienteSrvUtil"
					}];
				} else if (tipo == "Prestador") {
					menu = [{
						"Nome": "Cadastro",
						"Link": "appAdmin.PrestadorCadastro"
					}, {
						"Nome": "Serviços Contratados",
						"Link": "appAdmin.PrestadorServContr"
					}, {
						"Nome": "Cadastro de serviços",
						"Link": "appAdmin.PrestadorCadServ"
					}];
				}
				else if (tipo == "Administrador") {
					menu = [{
						"Nome": "Gerência de usuários",
						"Link": "appAdmin.AdmGerenUsu"
					}];
				}

				return menu;
			}
		};
	}]);