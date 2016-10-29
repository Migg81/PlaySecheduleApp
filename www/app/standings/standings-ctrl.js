(function(){

    var app = angular.module("eliteApp");
    var standingsCtrl = function (eliteApi) {

        var vm=this;

        var getStandingsData=function(data){
            vm.standings=data.standings;
            $ionicLoading.hide();
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
            $ionicLoading.hide();
        };
        
        eliteApi.getLeagueData().then(getStandingsData, onError);
    }

    app.controller('standingsCtrl', standingsCtrl);

})();