angular.module('fxt.controllers', [])

.controller('DashCtrl', function($scope) {
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
