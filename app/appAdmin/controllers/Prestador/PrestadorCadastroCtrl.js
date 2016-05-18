'use strict';

(function() {
    var mainApp = angular.module("MainApp");

    var PrestadorCadastroCtrl = function($scope, validacao, $http) {


        /**
         * [BuscarPrestEndereco Buscar o endereço pelo cep]
         * @param {[type]} cep [CEP informado por usuário]
         */
        $scope.BuscarPrestEndereco = function(cep) {

            $http.get('http://viacep.com.br/ws/01001000/json/').success(function(data) {
                $scope.pre.logradouro = data.logradouro;
                $scope.pre.bairro = data.bairro;
                $scope.pre.localidade = data.localidade;
                $scope.pre.uf = data.uf;
            });
            
        };
    }



    mainApp.controller('PrestadorCadastroCtrl', PrestadorCadastroCtrl);


    
    // mainApp.config(function($stateProvider, $urlRouterProvider) {
    //     //
    //     // For any unmatched url, redirect to /state1
    //     $urlRouterProvider.otherwise("appAdmin/PrestadorCadastro/InfoPessoais");

    //     $stateProvider
    //     state('appAdmin.PrestadorCadastro.InfoPessoais', {
    //             url: "/InfoPessoais",
    //             templateUrl: "app/appAdmin/views/Prestador/paginasCad/InfoPessoais.html",
    //             controller: 'PrestadorCadastroCtrl'
    //         })
    //         .state('appAdmin.PrestadorCadastro.Endereco', {
    //             url: "/Endereco",
    //             templateUrl: "app/appAdmin/views/Prestador/paginasCad/Endereco.html",
    //             controller: 'PrestadorCadastroCtrl'
    //         })

    // });


}());