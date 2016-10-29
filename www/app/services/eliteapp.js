(function() {

var eliteApi=function($http,$ionicLoading){

var getLeagues=function (){
      return $http.get("http://elite-schedule.net/api/leaguedata")
            .then(function(response) {
                return response.data;
            });
};

var getLeagueData=function (){
    $ionicLoading.show({template:'Loding .....'});
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
