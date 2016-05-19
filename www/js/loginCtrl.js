angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $ionicLoading, $firebaseArray, $state) {
      var ref = new Firebase("https://happenstance.firebaseio.com");
      var database = $firebaseArray(ref);
      $scope.formData = {};

      $scope.login = function() {
        ref.createUser({
          email    : $scope.formData.email,
          password : $scope.formData.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            $state.go('home');
          }
        });
      };

});