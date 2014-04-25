app.controller("ctrl", ["$scope", "fileservice", function($scope, fileservice) {
    $scope.title = "This is title";

    var promise = fileservice.getfiles()
    promise.then(function(actual) {
        $scope.files = actual;
    })

}]);