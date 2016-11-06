(function () {
    var myTeamService = function ($http, CacheFactory) {

        self.myteamCache = CacheFactory.get('myteamCache');

        var followTeam=function(team){
            self.myteamCache.put(team.id,team)
        };

        var unfollowTeam=function(team){
            self.myteamCache.remove(team.id.toString())
        };

        var getFollowedTeams=function(){
            var teams=[],
                keys=self.myteamCache.keys();
            for(var i=0;i<keys.length;i++ ){
                var team=self.myteamCache.get(keys[i]);
                teams.push(team);
            }
            return teams;
        };

        var isFollowingTeam=function(teamid){
            var team=self.myteamCache.get(teamid);
            return team;
        };

        return{
            followTeam:followTeam,
            unfollowTeam:unfollowTeam,
            getFollowedTeams:getFollowedTeams,
            isFollowingTeam:isFollowingTeam
        };
    }
    var module = angular.module("eliteApp");
    module.factory("myTeamService", myTeamService);
}());
