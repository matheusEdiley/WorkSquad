'use strict';

(function() {
    var mainApp = angular.module("MainApp");

    var PrestadorCadastroCtrl = function($scope, metodosAux, $http, $state, $location, $window, PrestadorService) {

        var PreEntid = $window.sessionStorage.getItem('entidade');

        if (PreEntid != "undefined") {
            PreEntid = angular.fromJson(PreEntid);
        }

        $scope.cursos = ['informática básica', 'digitação'];
        $scope.certificacoes = ['CRM', 'SAP'];
        $scope.FlgSalvo = false;
        $scope.preventchange = false;
        $scope.pre = {};

        $scope.$on('$locationChangeStart', function(event) {
            if ($scope.preventchange) {
                event.preventDefault();
                $scope.preventchange = !$scope.preventchange;
            }
        });

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

        var onError = function(error) {
            $scope.error = error.data;
        };

        var onSalvo = function(callback) {
            $scope.FlgSalvo = true;
        };

        $scope.Salvar = function(pre) {

            pre = angular.fromJson($window.sessionStorage.getItem('prestCadastro'));
            pre.certificacoes = $scope.certificacoes;
            pre.cursos = $scope.cursos;

            if (PreEntid != "undefined") {

                pre._prestadorId = PreEntid._id;
                pre.userid = PreEntid.user._id;
                pre.servicos = PreEntid.servicos;
            } else {

                var user = angular.fromJson($window.sessionStorage.getItem('usuario'));
                pre.userid = user._id;

            }

            PrestadorService.addPrestador(pre)
                .then(onSalvo, onError);

        }

        $scope.Cancelar = function() {

            var listamenu = document.getElementById('menu').children;
            LimparMenu();
            listamenu.item(0).setAttribute('class', 'active');
            $state.go('appAdmin.PrestadorCadastro.InfoPessoais');

        }

        var OnTabChanged = function(pre) {

            var prestCad = angular.fromJson($window.sessionStorage.getItem('prestCadastro'));

            if (prestCad != null) {
                prestCad = angular.extend(prestCad, pre);
            } else {
                prestCad = pre;
            }
            $window.sessionStorage.setItem('prestCadastro', angular.toJson(prestCad));
        }

        $scope.Next = function(index, pre) {

            var listamenu = document.getElementById('menu').children;

            LimparMenu();
            listamenu.item(index - 1).setAttribute('class', 'active');

            $scope.preventchange = !$scope.preventchange;
            OnTabChanged(pre);
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
        $urlRouterProvider.otherwise("appAdmin/PrestadorCadastro/InfoPessoais");

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