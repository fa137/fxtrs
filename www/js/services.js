angular.module('fxt.services', ['ngResource'])
.factory('APIConfig', function(){
  return {
    ServerAddress: "http://localhost:8100"
  }
})
.factory('Fixtures', function($resource, APIConfig){
  var fxt = [];
  var url = APIConfig.ServerAddress + "/api/fixtures-thru-dec.json";
  $resource(url).get({}, function(data){
    angular.forEach(data.matches, function(v, k){
      console.log(v);
      this.push(v);
    }, fxt);
  });
  return {
    getAll: function(){
      return fxt;
    }
  };
})
.factory('Standings', function($resource, APIConfig) {
  var teams = []
  ,   teamNames = [];
  var url = APIConfig.ServerAddress + "/api/standings-epl.json";
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
