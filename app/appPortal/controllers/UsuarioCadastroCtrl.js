'use strict';


(function() {
  var mainApp = angular.module("MainApp");

  var UsuarioCadastroCtrl = function($scope, factory, $http) {

    var onError = function(error) {
      $scope.error = error.data;
    };

    
  }
  mainApp.controller('UsuarioCadastroCtrl', UsuarioCadastroCtrl);
}());