angular.module('starter.services', [])
.service('Locations', function($firebaseArray, $rootScope) {
  console.log("service Locations called");

  // var locationRef = firebase.database().ref('locations');



  // var usersSync = $firebase(usersRef);
  // var users = usersSync.$asArray();
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

  // this.all = function() {
  //  console.log("locationRef is: " + locationRef);
  //  var allLocations;
  //   locationRef.once('value').then(function(snapshot) {
  //    console.log("inside snapshot" + snapshot.val());
  //    allLocations = snapshot.val();
  //   });
  //   return allLocations;

  // };

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
  console.log("service User called");
  var userId = firebase.auth().currentUser.uid;
  console.log("current user is: " + userId);

  // var userRef = firebase.database().ref('users/' + userId);

  if ($rootScope.user === undefined) {
    $rootScope.user = $firebaseObject(new Firebase("https://happenstance.firebaseio.com/users/" + userId));
   }



  var user = $rootScope.user;

  this.ref = function() {
    return firebase.database().ref('users/' + userId);
  };

  this.get = function() {
    return user;
  };

  this.save = function(userNew) {
    user.$save(userNew);
  };
});