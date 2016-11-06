(function(){

    var app = angular.module("eliteApp");
    
    var LeaguesCtrl=function(eliteApi,$state,$scope){
        var vm =this;
        //var leagues=eliteApi.getLeague();
        //var leagueDta=eliteApi.getLeagueData();
    var onLeaguesComplete = function (data) {
        vm.leagues=data;
    };

    var onLeaguesDataComplete=function(data){
         vm.leagueDta=data;  
    };

    var onError = function (reason) {
        $scope.error = "Somthing went wron try after some time.";
    };

    vm.selectLeague=function (leaguid)
    {
        //to do need fix we need send leaguid below code is not working
        eliteApi.setLeagueId(leaguid);
        $state.go("app.teams")
    };

    eliteApi.getLeagues().then(onLeaguesComplete, onError);
//    eliteApi.getLeagueData().then(onLeaguesDataComplete, onError);
    };

    app.controller('LeaguesCtrl', LeaguesCtrl);
}())