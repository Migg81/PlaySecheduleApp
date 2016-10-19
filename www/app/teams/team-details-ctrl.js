(function(){

var app = angular.module("eliteApp");
var teamdetailsCtrl = function ($stateParams) {
 console.log("stateParam",$stateParams);
}

app.controller('teamdetailsCtrl', teamdetailsCtrl);

})();