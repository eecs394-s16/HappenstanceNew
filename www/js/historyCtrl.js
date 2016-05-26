angular.module('starter.controllers')
.controller('HistoryCtrl', function($scope, $firebaseArray, User, Locations) {
      console.log("in historyCtrl");
      $scope.user = User.get();

      //
  $('#myModal2').on('show.bs.modal', function() {
    console.log("modal history showing!");
    $scope.user.$loaded().then(function(user) {
        console.log("finding my history!");
        $scope.locationList = [];
        Locations.all().$loaded().then(function(locations) {
          for (var i = 0; i < user.historyList.length; i++) {
            for (var j = 0; j < locations.length; j++) {
              if (user.historyList[i] === locations[j].$id) {
                $scope.locationList.push(locations[j]);
              }
            }
          }

          console.log($scope.locationList);
        });
      });

  });

      

  $scope.openHistory = function(location) {
    window.localStorage.setItem("location", JSON.stringify(location));
    $("#myModal2").modal("hide");
    $("#myModal1").modal("hide");
    $("#myModal").modal();
  };

});