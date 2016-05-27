'use strict';

(function() {
    var mainApp = angular.module("MainApp");

    var PrestadorCadastroCtrl = function($scope, validacao, $http, $state) {

         $scope.cursos = ['informática básica', 'digitação'];
         $scope.certificacoes = ['CRM', 'SAP'];

        /**
         * [BuscarPrestEndereco Buscar o endereço pelo cep]
         * @param {[type]} cep [CEP informado por usuário]
         */
        $scope.BuscarPrestEndereco = function(cep) {

            $http.get('http://viacep.com.br/ws/' + cep + '/json/').success(function(data) {
                $scope.pre.logradouro = data.logradouro;
                $scope.pre.bairro = data.bairro;
                $scope.pre.localidade = data.localidade;
                $scope.pre.uf = data.uf;
            });

        };

        $scope.Cancelar = function() {
            
            var listamenu = document.getElementById('menu').children;
            LimparMenu();
            listamenu.item(0).setAttribute('class', 'active');
            $state.go('appAdmin.PrestadorCadastro.InfoPessoais');

        }

        $scope.Next = function(index) {

            var listamenu = document.getElementById('menu').children;

            LimparMenu();
            listamenu.item(index - 1).setAttribute('class', 'active');

            if (index == 2) {
                $state.go("appAdmin.PrestadorCadastro.Endereco");
            } else if (index == 1) {
                $state.go("appAdmin.PrestadorCadastro.InfoPessoais");
            } else if (index == 3) {
                $state.go("appAdmin.PrestadorCadastro.Formacao");
            } else {
                $state.go("appAdmin.PrestadorCadastro.Confirmacao");
            }
        }
    }

    var LimparMenu = function() {

        var listamenu = document.getElementById('menu').children;

        angular.forEach(listamenu, function(value) {
            value.setAttribute('class', '');
        });
    }

    mainApp.controller('PrestadorCadastroCtrl', PrestadorCadastroCtrl);

    mainApp.config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/InfoPessoais");

        $stateProvider.
        state('appAdmin.PrestadorCadastro.InfoPessoais', {
                url: "/InfoPessoais",
                templateUrl: "app/appAdmin/views/Prestador/paginasCad/InfoPessoais.html",
                controller: 'PrestadorCadastroCtrl'
            })
            .state('appAdmin.PrestadorCadastro.Endereco', {
                url: "/Endereco",
                templateUrl: "app/appAdmin/views/Prestador/paginasCad/Endereco.html",
                controller: 'PrestadorCadastroCtrl'
            })
            .state('appAdmin.PrestadorCadastro.Formacao', {
                url: "/Formacao",
                templateUrl: "app/appAdmin/views/Prestador/paginasCad/Formacao.html",
                controller: 'PrestadorCadastroCtrl'
            })
            .state('appAdmin.PrestadorCadastro.Confirmacao', {
                url: "/Confirmacao",
                templateUrl: "app/appAdmin/views/Prestador/paginasCad/Confirmacao.html",
                controller: 'PrestadorCadastroCtrl'
            })
    });


}());