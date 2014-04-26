app.controller("ctrl", ["$scope", "fileservice", function($scope, fileservice) {
    $scope.title = "This is title";

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);                
    }

    var promise = fileservice.getfiles()
    promise.then(function(actual) {
        $scope.data = actual;
    })

    $scope.getitem = function(item) {
        $scope.item = item;

        fileservice.getitem(item).then(function(actual) {
            $scope.itemdata = actual.data;
        })
    }

}]);