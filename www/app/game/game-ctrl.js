(function(){

    var app = angular.module("eliteApp");
    var gameCtrl = function (eliteApi , $stateParams) {
    var vm=this;
    var gameId=Number($stateParams.id)

    var getGameData=function(data){
       vm.game = data.games.find(function(d){ return d.id === gameId });
    }
    var onError = function (reason) {
        $scope.error = "Somthing went wron try after some time.";
    };  

    eliteApi.getLeagueData().then(getGameData, onError);
    }
    app.controller('gameCtrl', gameCtrl);
})();