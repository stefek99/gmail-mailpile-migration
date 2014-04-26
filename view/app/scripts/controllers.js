app.controller("ctrl", ["$scope", "$routeParams", "$route", "fileservice", function($scope, $routeParams, $route, fileservice) {
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

}]);