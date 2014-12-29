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

      var userObject = {
        teams: $scope.userTeams
      }
      localData.setObject("userTeams", userObject);
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
    $scope.userTeams = localTeams;
    $scope.newUser = false;
  }
  $scope.selectTeam = function(name){
    $scope.addButton = false;
    // if the team is already added, reject the action
    if($scope.userTeams.length == 0 || $scope.userTeams.indexOf(name) == -1){
      $scope.userTeams.push(name);
      var userObject = {
        teams: $scope.userTeams
      }
      localData.setObject("userTeams", userObject);
    }
    $scope.newUser = false;

  };
})
.controller('StandingsCtrl', function($scope, Standings, localData){
  var data = localData.getObject("userTeams");
  var toHighlightCSS = false;
  if(data.teams){
    toHighlightCSS = "";
    for(var x=0; x<data.teams.length;x++){
      toHighlightCSS+= "team.stand_team_name == '"+ data.teams[x] + "'";
      if(x!=(data.teams.length-1)){
        toHighlightCSS+= " || ";
      }
    }
  }
  $scope.toHighlight = toHighlightCSS;
  $scope.teams = Standings.getAll();
})
.controller('LaunchCtrl', function($scope, $timeout, $state){
  $scope.goDash = function(){
    $state.go("tab.dash");
  }
  $timeout(function(){slideUpShowMenu()}, 1000);
})
.controller('FixturesCtrl', function($scope, Fixtures, localData) {
  var data = localData.getObject("userTeams");
  var toHighlightCSS = false;
  if(data.teams){
    toHighlightCSS = "";
    for(var x=0; x<data.teams.length;x++){
      toHighlightCSS+= "fixture.match_localteam_name == '"+ data.teams[x] + "' || fixture.match_visitorteam_name == '"+ data.teams[x] +"'";
      if(x!=(data.teams.length-1)){
        toHighlightCSS+= " || ";
      }
    }
  }
  $scope.toHighlight = toHighlightCSS;
  $scope.fixtures = Fixtures.getAll();
})
// .controller('FriendsCtrl', function($scope, Friends) {
//   $scope.friends = Friends.all();
// })

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

.controller('SettingsCtrl', function($scope, localData) {
  var data = localData.getObject("userTeams");
  $scope.teams = data.teams;
});
