app.controller("ctrl", ["$scope", "$routeParams", "$route", "fileservice", "$sce", function($scope, $routeParams, $route, fileservice, $sce) {
    var messageID = $routeParams.id;
    $scope.pageSize = 10;
    $scope.currentPage = Math.floor(parseInt(messageID, 10) / 10);
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);                
    }

    // HACK: http://stackoverflow.com/a/14329570/775359
    var lastRoute = $route.current;
    $scope.$on('$locationChangeSuccess', function(event) {
        $route.current = lastRoute;
    });

    var promise = fileservice.getfiles()
    promise.then(function(actual) {
        $scope.data = actual;
    })

    $scope.getitem = function(item) {
        fileservice.getitem(item).then(function(actual) {
            $scope.itemdata = actual.data;
        })
    }
    $scope.getitem(messageID);

    $scope.displayprocessed = function() {
        var result = [];
        if ($scope.itemdata) {
            for (var i=0; i<$scope.itemdata.processed.length; i++) {
                var pair = $scope.itemdata.processed[i];
                result.push("<span class='line'>" +
                              "<b>" + pair.key + "</b> " + pair.value +
                            "</span>");
            }
            return result.join('');
        } else {
            return "no data yet;"
        }
    }

}]);