angular.module('starter.controllers')

.controller('LoginCtrl', function($scope, $ionicLoading, $state, User) {
	$scope.formData = {};
	$scope.loginMessage = "";

	$scope.createAccount = function() {
		var email = $scope.formData.email;
		var password = $scope.formData.password;
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
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
		}).then(function(authData) {
			window.localStorage.setItem("uid", authData.uid);
			firebase.database().ref('users/' + authData.uid).set({
				email: $scope.formData.email,
				name: $scope.formData.email.replace(/@.*/, ''),
				historyList: [],
				historyTime: [],
				favoritesList: []
			}).then(function() {
				User.updateUid();
				$state.go('home');
			});
		//end of function(authData)
		});
	//end of createAccount
	};

	$scope.login = function() {
		var email = $scope.formData.email;
		var password = $scope.formData.password;
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
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
		}).then(function(authData) {
				window.localStorage.setItem("uid", authData.uid);
				User.updateUid();
				$state.go('home');
			});
		};
	});