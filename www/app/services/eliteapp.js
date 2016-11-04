(function() {

var eliteApi=function($http,$ionicLoading,CacheFactory,$q){

var currentLeagueId=2039;

self.leagueCache=CacheFactory.get('leagueCache');
self.leagueDataCache=CacheFactory.get('leagueDataCache');

var getLeagues=function (){
   var deferred = $q.defer(),
        cachekey="leagues",
    leagueData=self.leagueCache.get(cachekey);
    if(leagueData){
        console.log("Found data inside cache", leagueData);
        deferred.resolve(leagueData);
    }
    else{
         $http.get("http://elite-schedule.net/api/leaguedata")
            .success(function(response) {
                console.log("Recevied leaguedata");
                self.leagueCache.put(cachekey,response);
                deferred.resolve(response);
            })
            .error(function(){
                console.log("Recevied data via http failed");
                deferred.reject(response);
            });
    } 
    return deferred.promise;
};

var getLeagueData=function (){
  var deferred=$q.defer(),
        cachekey="leagueData-"+currentLeagueId,
    leagueData=self.leagueDataCache.get(cachekey);

    if(leagueData){
        console.log("Found data inside cache", leagueData);
        deferred.resolve(leagueData);
    }
    else{
        $ionicLoading.show({template:'Loding .....'});
             $http.get("http://elite-schedule.net/api/leaguedata/"+currentLeagueId)
            .success(function(response) {
                console.log("Recevied leaguedata");
                    self.leagueDataCache.put(cachekey,response);
                    $ionicLoading.hide();
                    deferred.resolve(response);
            })
            .error(function(){
                 console.log("Recevied data via http failed");
                    $ionicLoading.hide();
                    deferred.reject(response);
            });
    }

    return deferred.promise;
};
    
var setLeagueId=function(leagueId){
    currentLeagueId=leagueId;
}  
return {
        getLeagues:getLeagues,
        getLeagueData:getLeagueData,
        setLeagueId:setLeagueId
    };
}

var module=angular.module("eliteApp");
module.factory("eliteApi",eliteApi);

}());
