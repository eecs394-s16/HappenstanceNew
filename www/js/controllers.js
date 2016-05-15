angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {

  // hardcode data for locations
      var location1 = {
      name : 'Green Door Tavern',
      videoUrl :null,
      audioUrl : "https://s3-us-west-2.amazonaws.com/audio.happenstance/Janet+Fuller-+Speakeasies_Abridged_mixdown.mp3",
      loc : {
        lat : 41.894854,
        lng : -87.6396137
      },
      description : "Curious about the meaning behind that colorful door? Let our food expert Janet Fuller tell you all about how this popular watering hole used to be a speakeasy.",
      imageUrl : "https://s3-us-west-2.amazonaws.com/audio.happenstance/green_door_tavern.jpg",
      tags: ['entertainment', 'bar']

    };    https://s3-us-west-2.amazonaws.com/audio.happenstance/green_door_tavern.jpg?X-Amz-Date=20160510T044953Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=f9a132d37fcc6517929ed941b460b0999d5cf38e4e84f02168d31c9b4846c78a&X-Amz-Credential=ASIAJ3NLGIP5K6RJNNSQ/20160510/us-west-2/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEOX//////////wEaDHN6an18CQN73uIAsSLHAdX34fSEmq18WJCd8KfG2emLbd0ALo/3KPmCPKJ2nqVeWteGvVDm5sJ5Bk2r3ERAZlKdxGVeEVHrbrRAfPqGkn/n5vqpYlX5RgizISaovx5aTKijjUuUusB7N0FErLGttEU988htDLF/g10rmXEi43mFb5TAcwJfCCRIsGhBq//GCrwHQ7cGVGO3D3lpW7JM6%2BdpqbqbOxkgWJ8fv3T6clSZVm145m/BQsgvnTlr9eYiBlom7TDu1zdv%2B32t4dIf2s3BcfPAOpwo2r/FuQU%3D

    var location2 = {
      name : ' International Museum of Surgical Science',
      videoUrl :null,
      audioUrl : "https://s3-us-west-2.amazonaws.com/audio.happenstance/Surgical+Museum_Abridged_mixdown.mp3",
      loc : {
        lat : 41.9103997,
        lng : -87.6276496
      },
      description : 'Ever thought about exchanging vows surrounded by amputation kits and ancient infant skulls? The International Museum of Surgical Science has hosted a variety of guests, even those about to say “I do.”',
      imageUrl : "https://s3-us-west-2.amazonaws.com/audio.happenstance/surgical_museum__1__720.jpg",
      tags: ['entertainment', 'science']
    };
    var location3 = {
      name : 'Northwestern University',
      videoUrl :"http://www.w3schools.com/html/mov_bbb.mp4",
      audioUrl : null,
      loc : {
        lat : 42.058044,
        lng : -87.677041
      },
      description : "Northwestern University is a private research university with campuses in Evanston and Chicago in Illinois, United States, as well as Doha, Qatar.",
      imageUrl : "https://geo1.ggpht.com/cbk?panoid=JQKsWM6AZwFa93Rc0Zo7-g&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=256&yaw=82.027817&pitch=0",
      tags: ['education', 'science']

    };

    $scope.locations = [location1, location2, location3];


  $scope.mapCreated = function(map) {
    $scope.map = map;

    $scope.myCenter = new google.maps.LatLng(41.904373,-87.6336537);
    $scope.map.setCenter($scope.myCenter);
    $scope.map.setZoom(14);

    $scope.locations.forEach(function(location) {
      var marker = new google.maps.Marker({
      position: location.loc
      });
      marker.setMap($scope.map);

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
    });

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };




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
.controller('ModalCtrl', function($scope) {
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
    $scope.$apply();
    $scope.autoplay();

  });

  // filter for related storis
  $scope.related = function(relatedLoc) {
      if (relatedLoc.name === $scope.location.name) {
        return false;
      }

      for (var i = 0; i < $scope.location.tags.length; i++) {
        if (relatedLoc.tags.includes($scope.location.tags[i])) {
          console.log("tag found in relatedLoc");
          return true;
        }
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
  };

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
