'use strict';


(function() {
    var mainApp = angular.module("MainApp");

    var AdmGerenUsuCtrl = function($scope, metodosAux, $http, ClienteService, PrestadorService) {

        $scope.FlgCliente = true;
        $scope.FlgPrest = false;

        var onClienteGetCompleted = function(response) {

            $scope.Clientes = response.data;

        }

        var onPrestadorGetCompleted = function(response) {
            $scope.Prestadores = response.data;
        }

        var refresh = function() {

            ClienteService.allClientes()
                .then(onClienteGetCompleted, onError);

            PrestadorService.allPrestador()
                .then(onPrestadorGetCompleted, onError);

        }

        $scope.ChangTab = function(index) {
            if (index == 1) {
                $scope.FlgCliente = true;
                $scope.FlgPrest = false;
            } else {
                $scope.FlgCliente = false;
                $scope.FlgPrest = true;
            }
        }

        refresh();

        //common error function
        var onError = function(error) {
            $scope.error = error.data;
        };

        //Deletar um Cliente
        $scope.deleteCliente = function(id) {
            $http.delete('/deleteCliente/' + id)
                .then(onClienteDeleteCompleted, onError);
        };

        var onClienteDeleteCompleted = function(response) {
            $scope.cliente = response.data;
            console.log(response.data);
            refresh();
        };

        //Alterar Status
        $scope.updateCliente = function(cliente, status) {
            cliente.cadStatus = status;
            $http.put("/updateCliente", cliente)
                .then(onUpdateClienteCompleted, onError);
            console.log(cliente);
        };

        var onUpdateClienteCompleted = function(response) {
            $scope.cliente = null; //response.data;
            console.log(response.data);
            refresh();
        };

    }
    mainApp.controller('AdmGerenUsuCtrl', AdmGerenUsuCtrl);
}());