(function(){

    var app = angular.module("eliteApp");
    var locationMapCtrl = function ($stateParams,$scope,eliteApi) {

        var vm=this;
        vm.locationid=Number($stateParams.id)
       
       vm.map={
           center:{
               latitude: 38.897677 ,
               longitude: -77.0036530
           },
           zoom:12
       };
       vm.marker={};

       var getMapLocationData=function(data){
            vm.location=_.find(data.locations,{id:vm.locationid});
            vm.marker={
                latitude:vm.location.latitude,
                longitude:vm.location.longitude,
                title:vm.location.name +"<br/>(tap for direection)",
                showWindow:true
            };

            vm.map.center.latitude=vm.location.latitude;
            vm.map.center.longitude=vm.location.longitude;
        }

        vm.map.options={

        };
        var onError = function (reason) {
            $scope.error = "Somthing went wron try after some time.";
        };
        
        eliteApi.getLeagueData().then(getMapLocationData, onError);
    }

    app.controller('locationMapCtrl', locationMapCtrl);

})();