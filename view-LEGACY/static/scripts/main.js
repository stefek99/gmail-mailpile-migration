g = {};
g.host = "http://localhost:3002";

var app = angular.module('app', []);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
