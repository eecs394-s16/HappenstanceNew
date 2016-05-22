angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $ionicLoading, $firebaseArray, $state) {
      // var ref = new Firebase("https://happenstance.firebaseio.com");
      // var database = $firebaseArray(ref);
      // var database = firebase.database();
      $scope.formData = {};
      $scope.loginMessage = "";

      // $scope.login = function() {
      //   ref.createUser({
      //     email    : $scope.formData.email,
      //     password : $scope.formData.password
      //   }, function(error, userData) {
      //     if (error) {
      //       console.log("Error creating user:", error);
      //     } else {
      //       console.log("Successfully created user account with uid:", userData.uid);
      //       $state.go('home');
      //     }
      //   });
      // };


      $scope.createAccount = function() {
        console.log("inside createAccount!");
        var email = $scope.formData.email;
        var password = $scope.formData.password;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        }).then(function(authData) {
          console.log("account successfully created for "+ authData.uid);
          console.log(authData);
          firebase.database().ref('users/' + authData.uid).set({
      //         // provider: authData.provider,
              email: $scope.formData.email,
              name: $scope.formData.email.replace(/@.*/, '')
          });
          $state.go('home');
        });        
      };


      $scope.login = function() {
          console.log("inside login");
          var email = $scope.formData.email;
          var password = $scope.formData.password;
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              console.error(error);
            }
            // [END_EXCLUDE]
          }).then(function(authData) {
            console.log("signed in as " + authData.uid);
            $state.go('home');
          });

        };
      // $scope.createAccount = function() {
      //   ref.createUser({
      //     email    : $scope.formData.email,
      //     password : $scope.formData.password
      //   }, function(error, authData) {
      //     if (error) {
      //       console.log("Error creating user:", error);
      //       $scope.loginMessage = error;
      //     } else {
      //       console.log("Successfully created user account with uid:", authData.uid);
      //       console.log(authData)
      //       // save the user's profile into the database so we can list users,
      //       // use them in Security and Firebase Rules, and show profiles
      //       ref.child("users").child(authData.uid).set({
      //         // provider: authData.provider,
      //         email: $scope.formData.email,
      //         name: $scope.formData.email.replace(/@.*/, '')
      //       });
      //     }
      //   });
      // };
});