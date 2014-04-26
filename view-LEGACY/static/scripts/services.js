app.factory('fileservice', ["$http", "$q", function($http, $q) {
    var defer = $q.defer();

    $http.get('/getfiles').success(function(data, status, headers, config) {
        defer.resolve(data);
    });

    var getfiles = function() {
        return defer.promise;
    }

    var getitem = function(item) {
        return $http({
            url : "/getitem",
            method : "GET",
            params : {id : item}
        });
    }

    return {
        getfiles : getfiles,
        getitem : getitem
    }
}]);