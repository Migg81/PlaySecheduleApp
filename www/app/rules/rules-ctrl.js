(function(){

    var app = angular.module("eliteApp");
    var rulesCtrl = function (eliteApi,$scope) {

        var vm=this;

        var getRuleData=function(data){
            vm.mainContent=data.league.rulesScreen;
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
        };
        
        eliteApi.getLeagueData().then(getRuleData, onError);
    }

    app.controller('rulesCtrl', rulesCtrl);

})();