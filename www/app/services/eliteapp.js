(function() {

var eliteApi=function($http){

var getLeagues=function (){
      return $http.get("http://elite-schedule.net/api/leaguedata")
            .then(function(response) {
                return response.data;
            });
};

var getLeagueData=function (){
     return $http.get("http://elite-schedule.net/api/leaguedata/2039")
            .then(function(response) {
                return response.data;
            });
};
    
return {
        getLeagues:getLeagues,
        getLeagueData:getLeagueData
    };

}

var module=angular.module("eliteApp");
module.factory("eliteApi",eliteApi);

}());
