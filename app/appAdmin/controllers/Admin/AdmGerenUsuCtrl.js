'use strict';


(function() {
    var mainApp = angular.module("MainApp");

    var AdmGerenUsuCtrl = function($scope, validacao, $http) {

        
        var onClienteGetCompleted = function(response){
            $scope.Clientes = response.data;
            console.log($scope.Clientes);
        }

        var refresh = function() {
            $http.get('/Clientes')
                .then(onClienteGetCompleted, onError);
            console.log('Response received...');
        }
        

        refresh();
        //common error function
        var onError = function(error) {
            $scope.error = error.data;
        };
        
        //Deletar um Cliente
        $scope.deleteCliente = function(id){
            $http.delete('/deleteCliente/' + id)
                .then(onClienteDeleteCompleted,  onError);
            console.log(id);
        };

         var onClienteDeleteCompleted = function(response){
            $scope.cliente = response.data;
            console.log(response.data);
            refresh();
        };

        //Alterar Status
        $scope.updateCliente = function(cliente, status){
            cliente.cadStatus = status;
            $http.put("/updateCliente", cliente)
                .then(onUpdateClienteCompleted, onError);
                    console.log(cliente);
        };

        var onUpdateClienteCompleted = function(response){
            $scope.cliente = null;//response.data;
            console.log(response.data);
            refresh();
        };

    }
    mainApp.controller('AdmGerenUsuCtrl', AdmGerenUsuCtrl);
}());