angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $ionicLoading, $firebaseArray, $state) {
      // var ref = new Firebase("https://happenstance.firebaseio.com");
      // var database = $firebaseArray(ref);
      // var database = firebase.database();
      $scope.formData = {};
      $scope.loginMessage = "";

      $scope.createAccount = function() {
        console.log("inside createAccount!");
        var email = $scope.formData.email;
        var password = $scope.formData.password;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          switch (error.code) {
            case "auth/email-already-in-use":
              $scope.loginMessage = "The email has already been taken."
              break;
            case "auth/weak-password":
              $scope.loginMessage = "The specified user account password is too weak."
              break;
            case "auth/invalid-email":
              $scope.loginMessage = "The specified email address is not valid."
              break;
            default:
              $scope.loginMessage = error.code;
          }
          $scope.$apply();
          console.error(error);
                    // [END_EXCLUDE]
        }).then(function(authData) {
          console.log("account successfully created for "+ authData.uid);
          console.log(authData);
          window.localStorage.setItem("uid", authData.uid);
          firebase.database().ref('users/' + authData.uid).set({
              email: $scope.formData.email,
              name: $scope.formData.email.replace(/@.*/, ''),
              historyList: [],
              historyTime: [],
              favoritesList: [],
              favoritesTime: []
          });
          console.log('saved');
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
            console.error(error);
            switch (error.code) {
              case "auth/wrong-password":
                $scope.loginMessage = "The specified user account password is incorrect."
                break;
              case "auth/user-not-found":
                $scope.loginMessage = "The specified user account does not exist."
                break;
              default:
                $scope.loginMessage = "Error logging user in:";
            }
            $scope.$apply();


            // [END_EXCLUDE]
          }).then(function(authData) {
            console.log("signed in as " + authData.uid);
            window.localStorage.setItem("uid", authData.uid);
            // User.saveUserID(authData.uid);
            $state.go('home');
          });

        };

});