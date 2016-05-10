angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

    //*******************************************
  //***      Geofence **********************
  //
   var location2 = {
    name : 'Northwestern University',
    videoUrl :"http://www.w3schools.com/html/mov_bbb.mp4",
    audioUrl : null,
    loc : {
      lat : 42.058044,
      lng : -87.677041,
    },
    description : "Northwestern University is a private research university with campuses in Evanston and Chicago in Illinois, United States, as well as Doha, Qatar.",
    imageUrl : "https://geo1.ggpht.com/cbk?panoid=JQKsWM6AZwFa93Rc0Zo7-g&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=82.027817&pitch=0",

  };
  document.addEventListener('deviceready', function () {
      // window.geofence is now available
      window.geofence.initialize().then(function () {
          console.log("Successful initialization" + angular.toJson(window.geofence));
          addGeofence();
      }, function (error) {
          console.log("Error", error);
      });
  }, false);


  function addGeofence() {
    window.geofence.addOrUpdate({
      id:             "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb",
      latitude:       location2.loc.lat,
      longitude:      location2.loc.lng,
      radius:         100,
      transitionType: TransitionType.BOTH,
      notification: {
          id:             1,
          title:          "Welcome to" + location2.name,
          text:           location2.description,
          openAppOnClick: true,
          data: location2
      }
    }).then(function () {
        console.log('Geofence successfully added!');
    }, function (reason) {
        console.log('Adding geofence failed', reason);
    })
  };
});
