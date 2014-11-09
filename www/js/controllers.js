angular.module('fxt.controllers', [])

.controller('DashCtrl', function($scope, Standings, APIConfig, localData) {

  $scope.teams = Standings.getTeams();
  $scope.newUser = true;
  $scope.userTeams = [];

  if(APIConfig.debug){
    $scope.debug = true;
    $scope.reset = function(){
      $scope.userTeams = [];
      $scope.newUser = true;
      localData.reset();
    }
    $scope.populate = function(){
      // populate local db with fake information
      // for easier debugging
      $scope.userTeams = ["Arsenal","Chelsea","Manchester City"];
      $scope.newUser = false;
    }
  }
  $scope.addMore = function(){
    $scope.addButton = true;
    $scope.newUser = true;
  }
  $scope.goBack = function(){
    $scope.addButton = false;
    $scope.newUser = false;
  }
  // if data already exists, then this is not a new user
  if(Object.keys(localData.getObject("userTeams")).length>0){
    var localTeams = localData.getObject("userTeams").teams;
    console.log(localData.getObject("userTeams"));
    $scope.userTeams = localTeams;
    $scope.newUser = false;
  }
  $scope.selectTeam = function(name){
    // if the team is already added, reject the action
    if($scope.userTeams.length == 0 || $scope.userTeams.indexOf(name) == -1){
      $scope.userTeams.push(name);
      var userObject = {
        teams: $scope.userTeams
      }
      localData.setObject("userTeams", userObject);
      $scope.newUser = false;
    }else{
      console.log("team is already added...");
    }
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
