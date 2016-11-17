(function(){

    var app = angular.module("eliteApp");
    
    var markdown=function(eliteApi){
        var vm =this;

        var converter=new showdown.Converter();

        var directive={
            link:link,
            restrict:'A',
        };

        return directive;

        function link(scope,element,attrs){
            attrs.$observe('markdown',function(value){
                var markup=converter.makeHtml(value);
                element.html(markup);
            });
        }
    };

    app.directive('markdown', markdown);
}())