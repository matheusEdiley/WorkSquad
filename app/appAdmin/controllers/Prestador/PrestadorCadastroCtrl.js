'use strict';

(function() {
    var mainApp = angular.module("MainApp");

    var PrestadorCadastroCtrl = function($scope, factory, $http) {


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



        $(document).ready(function() {
            //Initialize tooltips
            $('.nav-tabs > li a[title]').tooltip();

            //Wizard
            $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

                var $target = $(e.target);

                if ($target.parent().hasClass('disabled')) {
                    return false;
                }
            });



            $(".next-step").click(function(e) {

                var $active = $('.wizard .nav-tabs li.active');
                $active.next().removeClass('disabled');
                nextTab($active);

            });
            $(".prev-step").click(function(e) {

                var $active = $('.wizard .nav-tabs li.active');
                prevTab($active);

            });


        });

        function nextTab(elem) {
            $(elem).next().find('a[data-toggle="tab"]').click();
        }

        function prevTab(elem) {
            $(elem).prev().find('a[data-toggle="tab"]').click();
        }

    }

    mainApp.controller('PrestadorCadastroCtrl', PrestadorCadastroCtrl);
}());