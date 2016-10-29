(function(){

var app = angular.module("eliteApp");
var teamdetailsCtrl = function ($stateParams,$ionicPopup,$ionicLoading,eliteApi) {
    var vm=this;    
    console.log("stateParam",$stateParams);
    vm.teamId=Number($stateParams.id)

    var getTeamdetailsData=function(data){

        data.teams.forEach(function(note,index){
        note.divisionTeams.find(function(d) {
            if(d.id===vm.teamId){
                 team = d;
            }});
        });
    
        vm.teamName=team.name;
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
        
        data.standings.forEach(function(note,index){
            note.divisionStandings.find(function(d) {
                if(d.teamId===vm.teamId){
                    vm.teamStanding = d;
                }
            });
        });
        
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

        $ionicLoading.hide();
    }

    var onError = function (reason) {
        $scope.error = "Somthing went wron try after some time.";
        $ionicLoading.hide();
    };
        
    eliteApi.getLeagueData().then(getTeamdetailsData, onError);

    vm.following=false;
    vm.toggleFollow=function(){
            if(vm.following){
                var confirmPopup=$ionicPopup.confirm({
                    title:'Unfollow?',
                    template:"Are you sure you want to unfollow?"
                });
                confirmPopup.then(function(res){
                    if(res){
                        vm.following=!vm.following;
                    }
                })
            }else{
                vm.following=!vm.following;
            }
        }
}

app.controller('teamdetailsCtrl', teamdetailsCtrl);

})();