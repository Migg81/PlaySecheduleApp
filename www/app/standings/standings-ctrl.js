(function(){

    var app = angular.module("eliteApp");
    var standingsCtrl = function (eliteApi) {

        var vm=this;

        var getStandingsData=function(data){
            vm.standings=data.standings;
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
        };
        
        eliteApi.getLeagueData().then(getStandingsData, onError);
    }

    app.controller('standingsCtrl', standingsCtrl);

})();