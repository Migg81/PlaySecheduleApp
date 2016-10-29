(function(){

    var app = angular.module("eliteApp");
    var teamsCtrl = function (eliteApi,$ionicLoading) {

        var vm=this;

        var getTeamsData=function(data){
            vm.teams=data.teams;
            $ionicLoading.hide();
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
            $ionicLoading.hide();
        };
        
        eliteApi.getLeagueData().then(getTeamsData, onError);
    }

    app.controller('teamsCtrl', teamsCtrl);

})();