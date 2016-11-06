(function(){
    'use strict';
    var app = angular.module("eliteApp");
    var myTeamCtrl = function (myTeamService,$state,$scope,eliteApi) {

        var vm=this;
        vm.myTeams=myTeamService.getFollowedTeams();
        vm.goToteam=function(team){
            eliteApi.setLeagueId(team.leagueId);
            $state.go("app.team-detail",{id:team.id});
        };
    }

    app.controller('myTeamCtrl', myTeamCtrl);
}());