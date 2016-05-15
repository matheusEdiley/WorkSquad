var mainApp = angular.module("MainApp");

mainApp.factory('menu', [function() {

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
			} else if (tipo == "Administrador") {
				menu = [{
					"Nome": "Gerência de usuários",
					"Link": "appAdmin.AdmGerenUsu"
				}];
			}

			return menu;
		}
	};
}]);