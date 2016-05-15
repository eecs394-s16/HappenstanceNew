angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicLoading, $firebaseArray) {
      var ref = new Firebase("https://happenstance.firebaseio.com");
      var database = $firebaseArray(ref)

      $scope.createAccount = function() {
        ref.createUser({
          email    : $scope.email,
          password : $scope.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
          }
        });
      };
});