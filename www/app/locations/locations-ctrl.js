(function(){

    var app = angular.module("eliteApp");
    var locationCtrl = function (eliteApi) {

        var vm=this;

        var getLocationData=function(data){
            vm.locations=data.locations;
        }
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
        };
        
        eliteApi.getLeagueData().then(getLocationData, onError);
    }

    app.controller('locationCtrl', locationCtrl);

})();