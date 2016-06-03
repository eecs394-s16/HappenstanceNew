angular.module('starter.controllers', ['ui.router'])

.controller('MapCtrl', function($scope, $ionicLoading, Locations, User, $state) {
	$scope.markers = [];
	if (!User.uid()) {
		$state.go('login');
	}

	 $scope.init = function() {
				if (!User.uid()) {
					return;
				}
				var myLatlng = new google.maps.LatLng(41.8923034,-87.6417088);
				var mapOptions = {
					center: myLatlng,
					zoom: 14,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
				updateLocations();
				User.get().$loaded().then(function(user) {
					$scope.userName = user.name;
				});
				// Updated Location Example (for database change -- may break map)
				// Locations.ref().on('value', function(snapshot) {
				//   console.log("locations changed!");
				//   updateLocations();
				// });
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		};

	//reloads the page if $scope.map doesn't exist
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
	};

	function onError(error) {
			alert('code: '    + error.code    + '\n' +
						'message: ' + error.message + '\n');
	}

	function updateLocations() {
		Locations.all().$loaded().then(function(locations) {
				deleteMarkers();
				$scope.locations = locations;
				$scope.locations.forEach(function(location) {
					addMarker(location);
				});
				showMarkers();
		});

	};

	// Adds a marker to the map and push to the array.
	function addMarker(location) {
		var marker = new google.maps.Marker({
			position: location.loc
		});
		// add marker event listener
		google.maps.event.addListener(marker,'click', function() {
			window.localStorage.setItem("clicked_location", JSON.stringify(location));
			$("#myModal").modal();
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

	//Geofence
	document.addEventListener('deviceready', function () {
			window.geofence.initialize().then(function () {
					addGeofence();
					onNotificationClicked();
			}, function (error) {
					// Handle error
					// console.log("Error", error);
			});
	}, false);


	function addGeofence() {
		Locations.all().$loaded().then(function(locations) {
			for (var i = 0; i < locations.length; i++) {
				var location = locations[i];
				window.geofence.addOrUpdate({
					id:             location.name,
					latitude:       location.loc.lat,
					longitude:      location.loc.lng,
					radius:         300,
					transitionType: TransitionType.BOTH,
					notification: {
						id:             i,
						title:          "Welcome to" + location.name,
						text:           location.description,
						openAppOnClick: true,
						data: location
					}
				});
			}
		});
	}

	function onNotificationClicked() {
		window.geofence.onNotificationClicked = function (location) {
			$scope.map.setCenter(location.loc);
			$scope.map.setZoom(14);
			window.localStorage.setItem("clicked_location", JSON.stringify(location));
			$("#myModal").modal();
		};
	};

	$scope.logout = function() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		}, function(error) {
			// Handle sign out error
			// console.log("error in signing out");
		});
		window.localStorage.clear();
		$("#settingsModal").modal("hide");
		$state.go('login');
	};
})





// ************************************************************
// Modal controller
.controller('ModalCtrl', function($scope, Locations, User) {
	var video = document.getElementById("myvideo");
	var audio = document.getElementById("myaudio");

	$('#myModal').on('show.bs.modal', function() {
		$scope.$apply(function(){
			$scope.notFinished = true;
		});
		$scope.location = JSON.parse(localStorage.getItem("clicked_location"));
		$scope.map.setCenter($scope.location.loc);
		$scope.map.setZoom(14);
		$scope.$apply();
		$scope.autoplay();
		$scope.initializeFavorites();
	});

	$scope.initializeFavorites = function() {
		$scope.user = User.get();
		if (typeof $scope.user.favoritesList == 'undefined') {
			$scope.inFavorites = false;
			$scope.notInFavorites = true;
		}
		else {
			var i = $scope.user.favoritesList.indexOf($scope.location.$id);
			if (i > -1) {
				$scope.notInFavorites = false;
				$scope.inFavorites = true;
			}
			else {
				$scope.inFavorites = false;
				$scope.notInFavorites = true;
			}
		}
	}

	// filter for related stories
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
		if (isNaN(audio.duration) == false) {
			var percentage = audio.currentTime/audio.duration
		}
		else if (isNaN(video.duration) == false) {
			var percentage = video.currentTime/video.duration
		}
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
		User.save();
	}

	$scope.addToFavorites = function () {
		if (typeof $scope.user.favoritesList == 'undefined') {
			$scope.user.favoritesList = [$scope.location.$id];
		}
		else {
			$scope.user.favoritesList.push($scope.location.$id);
		}
		$scope.inFavorites = true;
		$scope.notInFavorites = false;
		User.save();
	}

	$scope.removeFromFavorites = function () {
		var i = $scope.user.favoritesList.indexOf($scope.location.$id);
		if (i > -1) {
			$scope.user.favoritesList.splice(i, 1);
			$scope.inFavorites = false;
			$scope.notInFavorites = true;
			User.save();
		}
	}

	$scope.toggleFavorite = function () {
		if ($scope.inFavorites == true) {
			$scope.removeFromFavorites();
		}
		else {
			$scope.addToFavorites();
		}
	}

	$(".modal-transparent").on('show.bs.modal', function () {
		setTimeout( function() {
			$(".modal-backdrop").addClass("modal-backdrop-transparent");
		}, 0);
	});
	$(".modal-transparent").on('hidden.bs.modal', function () {
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

	// FOR VIDEO
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
		$scope.$apply(function(){
			$scope.notFinished = false;
		});
		var footerOffeset = $('#relatedStories').offset().top;
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
});

