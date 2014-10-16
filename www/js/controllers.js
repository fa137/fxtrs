angular.module('fxt.controllers', [])

.controller('DashCtrl', function($scope) {
})
.controller('StandingsCtrl', function($scope, $http) {

  $http.get('/api/standings-epl.json').success(function(data){
     $scope.teams = data.teams;
  })
})
.controller('FixturesCtrl', function($scope, $http) {

})
// .controller('FriendsCtrl', function($scope, Friends) {
//   $scope.friends = Friends.all();
// })

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

.controller('AccountCtrl', function($scope) {
});
