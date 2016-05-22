angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $ionicLoading, $firebaseArray, $state) {
      var ref = new Firebase("https://happenstance.firebaseio.com");
      var database = $firebaseArray(ref);
      $scope.formData = {};
      $scope.loginMessage = "";

      $scope.login = function() {
        ref.authWithPassword({
          email    : $scope.formData.email,
          password : $scope.formData.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
            $scope.loginMessage = error;
          } else {
            console.log("Authenticated successfully with payload:", authData);
            console.log(authData.uid)
            $state.go('home');
          }
        });
      };

      $scope.createAccount = function() {
        ref.createUser({
          email    : $scope.formData.email,
          password : $scope.formData.password
        }, function(error, authData) {
          if (error) {
            console.log("Error creating user:", error);
            $scope.loginMessage = error;
          } else {
            console.log("Successfully created user account with uid:", authData.uid);
            console.log(authData)
            // save the user's profile into the database so we can list users,
            // use them in Security and Firebase Rules, and show profiles
            ref.child("users").child(authData.uid).set({
              // provider: authData.provider,
              email: $scope.formData.email,
              name: $scope.formData.email.replace(/@.*/, '')
            });
          }
        });
      };
});