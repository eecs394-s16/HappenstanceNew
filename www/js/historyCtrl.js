angular.module('starter.controllers')

.controller('HistoryCtrl', function($scope, $firebaseArray, User, Locations) {
	$scope.user = User.get();

	$('#myModal2').on('show.bs.modal', function() {
		$scope.user.$loaded().then(function(user) {
			$scope.locationList = [];
			Locations.all().$loaded().then(function(locations) {
				for (var i = 0; i < user.historyList.length; i++) {
					for (var j = 0; j < locations.length; j++) {
						if (user.historyList[i] === locations[j].$id) {
							locations[j].playedTime = user.historyTime[i];
							$scope.locationList.push(locations[j]);
						}
					}
				}
			});
		});
	});

	$scope.openHistory = function(location) {
		window.localStorage.setItem("clicked_location", JSON.stringify(location));
		$("#myModal2").modal("hide");
		$("#myModal1").modal("hide");
		$("#myModal").modal();
	};

	$scope.unfinished = function(location) {
		return location.playedTime < 1;
	};

	$scope.watched= function(location) {
		return location.playedTime === 1;
	};
});