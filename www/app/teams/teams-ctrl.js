(function(){

    var app = angular.module("eliteApp");
    var teamsCtrl = function (eliteApi,$scope,$ionicLoading) {

        var vm=this;

        var getTeamsData=function(data){
            vm.teams=data.teams;
            $ionicLoading.hide();
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
            $ionicLoading.hide();
        };
        
        vm.loadList=function(forcereferesh){
            eliteApi.getLeagueData(forcereferesh).then(getTeamsData, onError).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        
        vm.loadList(false);
    }

    app.controller('teamsCtrl', teamsCtrl);

})();