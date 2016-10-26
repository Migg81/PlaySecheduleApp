(function(){

var app = angular.module("eliteApp");
var teamdetailsCtrl = function ($stateParams,eliteApi) {
    var vm=this;    
    console.log("stateParam",$stateParams);
    vm.teamId=Number($stateParams.id)

    var getTeamdetailsData=function(data){
        var data=data;
        //var team=_.chain(data.teams).flatten("divisionTeams").find({"id":vm.teamId}).value();

    data.teams.forEach(function(note,index){
      note.divisionTeams.find(function(d) {
        if(d.id===vm.teamId)
       team = d;
     });
    });
        vm.teamName=team.name;
var kk=data.games.filter(isTeamInGame);

        vm.games=data.games.filter(isTeamInGame)
                    .map(function(item){
                        var isTeam1=(item.team1Id===vm.teamId?true:false);
                        var opponentName=isTeam1?item.team2:item.team1;
                        var scoreDisplay=getScoreDisplay(isTeam1,item.team1Score,item.team2Score);
                        return{
                            gameId:item.id,
                            opponent:opponentName,
                            time:item.time,
                            location:item.location,
                            locationUrl:item.locationUrl,
                            scoreDisplay:scoreDisplay,
                            homeAway:(isTeam1?"vs.":"at")
                        }
                    });

                    var tt=5+team.name;

       /* vm.games=_.chain(data.games).filter(isTeamInGame)
                    .map(function(item){
                        var isTeam1=(item.teamId===vm.teamId?true:false);
                        var opponentName=isTeam1?item.team2:item.team1;
                        var scoreDisplay=getScoreDisplay(isTeam1,item.team1Secore,item.team2Secore);
                        return{
                            gameId:item.id,
                            opponent:opponentName,
                            time:item.time,
                            location:item.location,
                            locationUrl:item.locationUrl,
                            scoreDisplay:scoreDisplay,
                            homeAway:(isTeam1?"vs.":"at")
                        }
                    }).value();*/

        function isTeamInGame(item)        
        {
            return item.team1Id===vm.teamId||item.team2Id===vm.teamId;
        }  
        function getScoreDisplay(isTeam1,team1Secore ,team2Secore)
        {
            if(team1Secore&&team2Secore){
                var teamScore=(isTeam1?team1Secore:team2Secore);
                var opponentScore=(isTeam1?team2Secore:team1Secore);
                var winIndicator=teamScore>opponentScore?"W: ": "L: ";
                return winIndicator + teamScore +"-" +opponentScore;
            }
            else
            {
                return "";
            }
        }
    }

    var onError = function (reason) {
        $scope.error = "Somthing went wron try after some time.";
    };
        
    eliteApi.getLeagueData().then(getTeamdetailsData, onError);
}

app.controller('teamdetailsCtrl', teamdetailsCtrl);

})();