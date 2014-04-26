g = {};
g.host = "http://localhost:3002";

var app = angular.module('app', ['ngRoute']);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'ctrl'
    })    
    .when('/:id', {
      templateUrl: 'views/main.html',
      controller: 'ctrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});