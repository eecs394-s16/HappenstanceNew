angular.module('starter.services', [])

.service('Locations', function($firebaseArray, $rootScope) {
	if ($rootScope.locations === undefined) {
		$rootScope.locations = $firebaseArray(new Firebase("https://happenstance.firebaseio.com/locations"));
	}
	var locations = $rootScope.locations;
	this.ref = function() {
		return firebase.database().ref('locations');
	};
	this.all = function() {
		return locations;
	};
	this.add = function(location) {
		locations.$add(location);
	};
	this.get = function(id) {
		return locations.$getRecord(id);
	};
	this.save = function(location) {
		locations.$save(location);
	};
	this.delete = function(location) {
		locations.$remove(location);
	};
})

.service('User', function($firebaseObject, $rootScope) {
	var userId = window.localStorage.getItem("uid");
	if ($rootScope.user === undefined) {
		$rootScope.user = $firebaseObject(new Firebase("https://happenstance.firebaseio.com/users/" + userId));
	}
	this.ref = function() {
		return firebase.database().ref('users/' + userId);
	};
	this.updateUid = function() {
		userId = window.localStorage.getItem("uid");
		$rootScope.user = $firebaseObject(new Firebase("https://happenstance.firebaseio.com/users/" + userId));
	}
	this.uid = function() {
		return window.localStorage.getItem("uid");
	}
	this.get = function() {
		return $rootScope.user;
	};
	this.save = function(userNew) {
		$rootScope.user.$save(userNew);
	};
});