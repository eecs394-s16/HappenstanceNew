angular.module('starter.controllers')

.controller('FavoritesCtrl', function($scope, $firebaseArray, User, Locations) {
	$scope.user = User.get();
	$('#myModal4').on('show.bs.modal', function() {
		$scope.user.$loaded().then(function(user) {
			$scope.locationList = [];
			Locations.all().$loaded().then(function(locations) {
				for (var i = 0; i < user.favoritesList.length; i++) {
					for (var j = 0; j < locations.length; j++) {
						if (user.favoritesList[i] === locations[j].$id) {
							$scope.locationList.push(locations[j]);
						}
					}
				}
			});
		});
	});

	$scope.openStory = function(location) {
		window.localStorage.setItem("clicked_location", JSON.stringify(location));
		$("#myModal4").modal("hide");
		$("#myModal1").modal("hide");
		$("#myModal").modal();
	};

	$scope.unfinished = function(location) {
		return location.playedTime < 1;
	};

	$scope.watched = function(location) {
		return location.playedTime === 1;
	};
});