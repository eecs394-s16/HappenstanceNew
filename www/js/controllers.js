angular.module('starter.controllers', ['ui.router'])

.controller('MapCtrl', function($scope, $ionicLoading, Locations, User) {
  // example usage of services
  Locations.all().$loaded().then(function(locations) {
    console.log("all locations: ");
    console.log(locations);
  });

  User.get().$loaded().then(function(user) {
    console.log("current user: ");
    console.log(user);
  });

  $scope.markers = [];



  // hardcode data for locations
      var location1 = {
      name : 'Green Door Tavern',
      videoUrl :null,
      audioUrl : "https://s3.amazonaws.com/happenstancefiles/audios/Janet+Fuller-+Speakeasies_Abridged_mixdown.mp3",
      loc : {
        lat : 41.894854,
        lng : -87.6396137
      },
      description : "Curious about the meaning behind that colorful door? Let our food expert Janet Fuller tell you all about how this popular watering hole used to be a speakeasy.",
      imageUrl : "https://s3.amazonaws.com/happenstancefiles/images/Green+Door+Tavern.jpg",
      tags: ['entertainment', 'bar', 'river north']

    };

    var location2 = {
      name : ' International Museum of Surgical Science',
      videoUrl :null,
      audioUrl : "https://s3.amazonaws.com/happenstancefiles/audios/Surgical+Museum_Abridged_mixdown.mp3",
      loc : {
        lat : 41.894854,
        lng : -87.6276496
      },
      description : 'Ever thought about exchanging vows surrounded by amputation kits and ancient infant skulls? The International Museum of Surgical Science has hosted a variety of guests, even those about to say “I do.”',
      imageUrl : "https://s3.amazonaws.com/happenstancefiles/images/Surgical+Museum.JPG",
      tags: ['entertainment', 'science', 'river north']

    };
    var location3 = {
      name : 'Northwestern University',
      videoUrl :"http://www.w3schools.com/html/mov_bbb.mp4",
      audioUrl : null,
      loc : {
        lat : 42.0580446,
        lng : -87.677041
      },
      description : "Northwestern University is a private research university with campuses in Evanston and Chicago in Illinois, United States, as well as Doha, Qatar.",
      imageUrl : "https://geo1.ggpht.com/cbk?panoid=JQKsWM6AZwFa93Rc0Zo7-g&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=82.027817&pitch=0",
      tags: ['science', 'school', 'river north']

    };


     var location4 = {
      name : 'Flaming saganaki',
      videoUrl :null,
      audioUrl : "https://s3.amazonaws.com/happenstancefiles/audios/Janet+Fuller-+Saganaki_mixdown.mp3",
      loc : {
        lat : 41.8901604,
        lng : -87.6412844
      },
      description : "Flaming saganaki can be found on nearly every Greektown menu. But which restaurant invented it? Learn more from our resident food expert Janet Fuller.",
      imageUrl : "https://s3.amazonaws.com/happenstancefiles/images/Flaming+Saganaki.jpg",
      tags: ['entertainment', 'restaurant', 'river north']

    };

   var location5 = {
      name : 'George Wendt',
      videoUrl :null,
      audioUrl : "https://s3.amazonaws.com/happenstancefiles/audios/George+Wendt_mixdown.mp3",
      loc : {
        lat : 41.8949903,
        lng : -87.6676959
      },
      description : "Before he became a staple at the bar where everyone knew his name, actor George Wendt experienced his first major career setback at Second City.",
      imageUrl : "https://s3.amazonaws.com/happenstancefiles/images/George_Wendt_1989.jpg",
      tags: ['entertainment', 'history', 'bar', 'river north']

    };

    var location6 = {
      name : 'Manual Cinema',
      videoUrl :null,
      audioUrl : "https://s3.amazonaws.com/happenstancefiles/audios/Manual+Cinema_mixdown.mp3",
      loc : {
        lat : 41.8905861,
        lng : -87.6320762
      },
      description : "When you think shadow puppets, do you think of Chicago’s bar scene? Probably not. But this is actually where Manual Cinema got its start",
      imageUrl : "https://s3.amazonaws.com/happenstancefiles/images/Manual+Cinema.jpg",
      tags: ['entertainment', 'history', 'bar', 'river north']

    };

    var location7 = {
      name : 'Lettuce Entertain You',
      videoUrl :null,
      audioUrl : "https://s3.amazonaws.com/happenstancefiles/audios/Janet+Fuller-+Lettuce+Entertain+You_mixdown.mp3",
      loc : {
        lat : 41.8936283,
        lng : -87.6333376
      },
      description : "R.J. Grunts’ iconic salad bar paved the way for the salad bar craze more than 40 years ago. How else did Lettuce Entertain You transform Chicago dining? Find out more from our resident food expert Janet Fuller.",
      imageUrl : "https://s3.amazonaws.com/happenstancefiles/images/Lettuce+Entertain+You+Logo.png",
      tags: ['entertainment', 'restaurant', 'river north']

    };


    $scope.locations = [location1, location2, location3, location4, location5, location6, location7];

  // $scope.mapCreated = function(map) {
  //   console.log($scope.locations);
  //   $scope.map = map;

  //   $scope.myCenter = new google.maps.LatLng(41.904373,-87.6336537);
  //   $scope.map.setCenter($scope.myCenter);
  //   $scope.map.setZoom(14);

  //   updateLocations();


  //   Locations.ref().on('value', function(snapshot) {
  //     console.log("locations changed!");
  //     updateLocations();
  //   });

  //   navigator.geolocation.getCurrentPosition(onSuccess, onError);
  // };
   $scope.init = function() {
        console.log("this ran!")
        var myLatlng = new google.maps.LatLng(41.8923034,-87.6417088);
        var mapOptions = {
          center: myLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        // $scope.myCenter = new google.maps.LatLng(41.904373,-87.6336537);
        // $scope.map.setCenter($scope.myCenter);
        // $scope.map.setZoom(14);

        google.maps.event.addListenerOnce($scope.map, 'tilesloaded', function(){
          console.log("*******Google map created!!!!");
          updateLocations();
        });




        // Locations.ref().on('value', function(snapshot) {
        //   console.log("locations changed!");
        //   updateLocations();
        // });

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

  //reloads the page if $scope.map doesn't exist
  //fixes the map not showing up bug
  function reload() {
    if (typeof $scope.map == "undefined") {
      window.location.reload(false);
    }
  };

  setTimeout(function() {reload()}, 50);

  var onSuccess = function(position) {
    var icon = {
       url: 'http://www.stfx.ca/sites/all/themes/stfx/js/virtualtour-SC/google-st-view/google-streetview-icon.png'
    };

    var marker = new google.maps.Marker({
       position: {lat: position.coords.latitude, lng: position.coords.longitude},
       icon: icon
    });
    marker.setMap($scope.map);

      console.log('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }


  function updateLocations() {
    // Locations.all().$loaded().then(function(locations) {
        deleteMarkers();

        // $scope.locations = locations;
        $scope.locations.forEach(function(location) {
          console.log("add marker for: ");
          console.log(location);
          addMarker(location);
        });
        showMarkers();
    // });

  };

  // Adds a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location.loc,
    });
    // add marker event listener
    google.maps.event.addListener(marker,'click', function() {
      // alert("modal is openning!");
    //   var modalView = new supersonic.ui.View("example#modal");
      // alert("modal is going to show up!");
      window.localStorage.setItem("clicked_location", JSON.stringify(location));
      $("#myModal").modal();
    // // supersonic.ui.modal.show(modalView, $rootScope.options);
    // });
    });
    $scope.markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < $scope.markers.length; i++) {
      $scope.markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll($scope.map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    $scope.markers = [];
  }





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
  document.addEventListener('deviceready', function () {
      // window.geofence is now available
      console.log("device ready!");
      window.geofence.initialize().then(function () {
          console.log("Successful initialization" + angular.toJson(window.geofence));
          addGeofence();
          onNotificationClicked();
      }, function (error) {
          console.log("Error", error);
      });
  }, false);


  function addGeofence() {
    console.log("addGeofence() called");
    $scope.locations.forEach(function(location) {
      window.geofence.addOrUpdate({
      id:             location.name,
      latitude:       location.loc.lat,
      longitude:      location.loc.lng,
      radius:         300,
      transitionType: TransitionType.BOTH,
      notification: {
          id:             1,
          title:          "Welcome to" + location.name,
          text:           location.description,
          openAppOnClick: true,
          data: location
        }
      }).then(function () {
          console.log('Geofence successfully added!');
      }, function (reason) {
          console.log('Adding geofence failed', reason);
      });
    });

  };

  function onNotificationClicked() {
    window.geofence.onNotificationClicked = function (location) {
      console.log('App opened from Geo Notification!', location);
      $scope.map.setCenter(location.loc);
      $scope.map.setZoom(14);

      window.localStorage.setItem("clicked_location", JSON.stringify(location));
      $("#myModal").modal();
    };
  };


})


// Modal controller
.controller('ModalCtrl', function($scope, Locations, User) {
  var video = document.getElementById("myvideo");
  var audio = document.getElementById("myaudio");

  //react button
  var hasLiked = false;
  $scope.likeClick = function () {
      if (!hasLiked) {
          hasLiked = true;
          $scope.liked = 'Unlike';
          $scope.likeCount += 1;
      } else {
          hasLiked = false;
          $scope.liked = 'Like';
          $scope.likeCount -= 1;
      }
  };





  //   $('#myModal').on('show', function() {
  //   video.autoplay = true;
  //   video.load();
  // });

  // $('#myModal').on('hide', function() {
  //   video.autoplay = false;
  // });
  //
  $('#myModal').on('show.bs.modal', function() {
    console.log("modal showing!");
    $scope.location = JSON.parse(localStorage.getItem("clicked_location"));
    $scope.map.setCenter($scope.location.loc);
    $scope.map.setZoom(14);

    $scope.$apply();
    $scope.autoplay();


    console.log('id');
    console.log($scope.location.$id);
    // console.log(video.currentTime);
  });

  // filter for related storis
  $scope.related = function(relatedLoc) {
    var count = 0;
    if (relatedLoc.name === $scope.location.name) {
      return false;
    }
    for (var i = 0; i < $scope.location.tags.length; i++) {
      if (relatedLoc.tags.includes($scope.location.tags[i])) {
        count++;
      }
    }
    console.log(relatedLoc.name);
    console.log(count);
    relatedLoc.counter = count;
    if (count > 0) {
      return true
    }
    return false;
  };

  $scope.openRelated = function(relatedLoc) {
    $scope.location = relatedLoc;
    $scope.$apply();
    $scope.autoplay();
    $scope.map.setCenter(relatedLoc.loc);
    $scope.map.setZoom(14);
  };

  $scope.autoplay = function() {
    // Video
    video.src = $scope.location.videoUrl;
    video.load();
    video.play();

    //Audio
    audio.src = $scope.location.audioUrl;
    audio.load();
    audio.play();
  };

  $scope.stopPlay = function() {
    video.pause();
    audio.pause();
    $scope.addToHistory();
  };

  $scope.addToHistory = function() {
    console.log(audio.duration);
    console.log(video.duration);
    console.log(audio.currentTime/audio.duration);
    console.log(video.currentTime/video.duration);
    console.log('id');
    console.log($scope.location.$id);
    if (isNaN(audio.duration) == false) {
      var percentage = audio.currentTime/audio.duration
    }
    else if (isNaN(video.duration) == false) {
      var percentage = video.currentTime/video.duration
    }
    console.log(percentage);
    // var newVideo = {
    //   id: $scope.location.$id,
    //   percentage: percentage
    // }
    $scope.user = User.get();
    if (typeof $scope.user.historyList == 'undefined') {
      $scope.user.historyList = [$scope.location.$id];
      $scope.user.historyTime = [percentage];
    }
    else {
      var added = false;
      for (var i = 0; i < $scope.user.historyList.length; i++) {
        if ($scope.user.historyList[i] === $scope.location.$id) {
          added = true;
          $scope.user.historyTime[i] = Math.max($scope.user.historyTime[i], percentage);
        }
      }
      if (!added) {
        $scope.user.historyList.push($scope.location.$id);
        $scope.user.historyTime.push(percentage);
      }

    }
    User.save()
  }

  $(".modal-transparent").on('show.bs.modal', function () {
    console.log(".modal-transparent on 'show.bs.modal'");
    setTimeout( function() {
      $(".modal-backdrop").addClass("modal-backdrop-transparent");
    }, 0);
  });
  $(".modal-transparent").on('hidden.bs.modal', function () {
    console.log(".modal-transparent on 'hidden.bs.modal'");
    $(".modal-backdrop").addClass("modal-backdrop-transparent");
  });



  // Buttons
  var playButton = document.getElementById("play-pause");
  var fullScreenButton = document.getElementById("full-screen");
  var playButtonAudio = document.getElementById("play-pause-audio");

  // Sliders
  var seekBar = document.getElementById("seek-bar");
  var volumeBar = document.getElementById("volume-bar");
  var seekBarAudio = document.getElementById("seek-bar-audio");

    // Event listener for the play/pause button
  playButton.addEventListener("click", function() {
    if (video.paused == true) {
      // Play the video
      video.play();

      // Update the button text to 'Pause'
      playButton.innerHTML = '<i class="icon ion-pause orange"></i>';
    } else {
      // Pause the video
      video.pause();

      // Update the button text to 'Play'
      playButton.innerHTML = '<i class="icon ion-play orange"></i>';
    }
  });


  // Event listener for the seek bar
  seekBar.addEventListener("change", function() {
    // Calculate the new time
    var time = video.duration * (seekBar.value / 100);

    // Update the video time
    video.currentTime = time;
  });

  // Update the seek bar as the video plays
  video.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / video.duration) * video.currentTime;
    // console.log(video.currentTime);

    // Update the slider value
    seekBar.value = value;
  });

  video.addEventListener('ended',gotoRelated,false);
  function gotoRelated() {
    console.log("ended! going to relatedStories");
    var footerOffeset = $('#relatedStories').offset().top;
    console.log("footer offset: " + footerOffeset);
    $('#myModal').scrollTop(footerOffeset);
  };


  // Pause the video when the slider handle is being dragged
  seekBar.addEventListener("mousedown", function() {
    video.pause();
  });

  // Play the video when the slider handle is dropped
  seekBar.addEventListener("mouseup", function() {
    video.play();
  });






  // FOR AUDIO
  // Event listener for the seek bar
  seekBarAudio.addEventListener("change", function() {
    // Calculate the new time
    var time = audio.duration * (seekBarAudio.value / 100);

    // Update the video time
    audio.currentTime = time;
  });

  // Update the seek bar as the video plays
  audio.addEventListener("timeupdate", function() {
    // Calculate the slider value
    var value = (100 / audio.duration) * audio.currentTime;

    // console.log(audio.currentTime);

    // Update the slider value
    seekBarAudio.value = value;
  });

  audio.addEventListener('ended',gotoRelated,false);


  // Pause the video when the slider handle is being dragged
  seekBarAudio.addEventListener("mousedown", function() {
    audio.pause();
  });

  // Play the video when the slider handle is dropped
  seekBarAudio.addEventListener("mouseup", function() {
    audio.play();
  });

   // Event listener for the play/pause button
  playButtonAudio.addEventListener("click", function() {
    if (audio.paused == true) {
      // Play the video
      audio.play();

      // Update the button text to 'Pause'
      playButtonAudio.innerHTML = '<i class="icon ion-pause orange"></i>';
    } else {
      // Pause the video
      audio.pause();

      // Update the button text to 'Play'
      playButtonAudio.innerHTML = '<i class="icon ion-play orange"></i>';
    }
  });

  $scope.modalClose = function() {
    supersonic.ui.modal.hide();
  }


});




