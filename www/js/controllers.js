angular.module('fxt.controllers', [])

.controller('DashCtrl', function($scope, Standings, APIConfig, localData) {
  if(APIConfig.debug){
    $scope.debug = true;
    $scope.reset = function(){
      localData.set("userTeams", null);
    }
  }
  $scope.teams = Standings.getTeams();
  $scope.newUser = true;
  $scope.userTeams = [];
  // if data already exists, then this is not a new user
  if(localData.get("userTeams")){
    $scope.userTeams = localData.get("userTeams");
    console.log($scope.userTeams);
    $scope.newUser = false;
  }
  $scope.selectTeam = function(name){
    $scope.userTeams.push(name);
    localData.set("userTeams", $scope.userTeams);
  };
})
.controller('StandingsCtrl', function($scope, Standings){
  $scope.teams = Standings.getAll();
})
.controller('FixturesCtrl', function($scope, Fixtures) {
  $scope.fixtures = Fixtures.getAll();
})
// .controller('FriendsCtrl', function($scope, Friends) {
//   $scope.friends = Friends.all();
// })

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

.controller('AccountCtrl', function($scope) {
});
