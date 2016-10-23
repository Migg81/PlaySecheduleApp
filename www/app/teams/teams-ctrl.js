(function(){

    var app = angular.module("eliteApp");
    var teamsCtrl = function (eliteApi) {

        var vm=this;

        var getTeamsData=function(data){
            vm.teams=data.teams;
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
        };
        
        eliteApi.getLeagueData().then(getTeamsData, onError);
    }

    app.controller('teamsCtrl', teamsCtrl);

})();