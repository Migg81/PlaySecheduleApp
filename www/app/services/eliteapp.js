(function () {

    var eliteApi = function ($http, $ionicLoading, CacheFactory, $q) {

        self.leagueCache = CacheFactory.get('leagueCache');
        self.leagueDataCache = CacheFactory.get('leagueDataCache');

        self.leagueCache.setOptions({
            onExpire: function (key, value) {
                getLeagues().then(
                    function () {
                        console.log("HTTP service worked well for leagueCache.")
                    },
                    function () {
                        console.log("HTTP service for leagueCache didn't worked , so putting expired item on cache")
                        self.leagueCache.put(key, value);
                    })
            }
        })

        self.leagueDataCache.setOptions({
            onExpire: function (key, value) {
                getLeagueData().then(
                    function () {
                        console.log("HTTP service worked well for leagueDataCache.")
                    },
                    function () {
                        console.log("HTTP service for leagueCaleagueDataCacheche didn't worked , so putting expired item on cache")
                        self.leagueDataCache.put(key, value);
                    })
            }
        })

        self.staticCache=CacheFactory.get('staticCache');

        var setLeagueId = function (leagueId) {
            self.staticCache.put("currentLeagueId",leagueId);
        }

        var getLeagueId = function () {
            var temp= self.staticCache.get("currentLeagueId");
            return temp;
        }

        var getLeagues = function () {
            var deferred = $q.defer(),
                 cachekey = "leagues",
             league = self.leagueCache.get(cachekey);
            if (league) {
                console.log("Found data inside cache", league);
                deferred.resolve(league);
            }
            else {
                $http.get("http://elite-schedule.net/api/leaguedata")
                   .success(function (response) {
                       console.log("Recevied Leagues");
                       self.leagueCache.put(cachekey, response);
                       deferred.resolve(response);
                   })
                   .error(function () {
                       console.log("Recevied data via http for Leagues failed");
                       deferred.reject();
                   });
            }
            return deferred.promise;
        };

        var getLeagueData = function (forcereferesh) {
            if(typeof forcereferesh==="undefiend"){
                forcereferesh=false;
            }
            var deferred = $q.defer(),
                cachekey = "leagueData-" + getLeagueId(),
            leagueData = null;

            if(!forcereferesh){
                leagueData=self.leagueDataCache.get(cachekey);
            }
            
            if (leagueData) {
                console.log("Found data inside cache", leagueData);
                deferred.resolve(leagueData);
            }
            else {
                $ionicLoading.show({ template: 'Loding .....' });
                $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
               .success(function (response) {
                   console.log("Recevied leaguedata");
                   self.leagueDataCache.put(cachekey, response);
                   $ionicLoading.hide();
                   deferred.resolve(response);
               })
               .error(function () {
                   console.log("Recevied data via http for leaguedata failed");
                   $ionicLoading.hide();
                   deferred.reject();
               });
            }

            return deferred.promise;
        };

        return {
            getLeagues: getLeagues,
            getLeagueData: getLeagueData,
            setLeagueId: setLeagueId
        };
    }

    var module = angular.module("eliteApp");
    module.factory("eliteApi", eliteApi);

}());
