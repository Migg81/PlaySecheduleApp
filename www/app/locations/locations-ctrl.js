(function(){

    var app = angular.module("eliteApp");
    var locationCtrl = function (eliteApi) {

        var vm=this;

        var getLocationData=function(data){
            vm.locations=data.locations;
            $ionicLoading.hide();
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
            $ionicLoading.hide();
        };
        
        eliteApi.getLeagueData().then(getLocationData, onError);
    }

    app.controller('locationCtrl', locationCtrl);

})();