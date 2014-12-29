angular.module('fxt.services', ['ngResource'])
.factory('APIConfig', function(){
  return {
    debug: true,
    serverAddress: "api/",
  }
})
.factory('Fixtures', function($resource, APIConfig){
  var fixturesInfo = [];
  var url = APIConfig.serverAddress + "fixtures.json";
  $resource(url).get({}, function(data){
    angular.forEach(data.matches, function(v, k){
      this.push(v);
    }, fixturesInfo);
  });
  return {
    getAll: function(){
      return fixturesInfo;
    }
  };
})
.factory('localData', ['$window', function($window) {
  return {
    set: function(key, value) {
        $window.localStorage[key] = value;
    },
    reset: function(){
      $window.localStorage.clear();
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
.factory('Standings', function($resource, APIConfig, $http) {
  var teams = []
  ,   teamNames = [];
  var url = APIConfig.serverAddress + "standings.json";
  $resource(url).get({}, function(data){
    angular.forEach(data.teams, function(v, k){
      teamNames.push(v.stand_team_name);
      this.push(v);
    }, teams)
  });
  return {
    getAll: function(){
      return teams;
    },
    getTeams: function(){
      return teamNames;
    }
  };
});
