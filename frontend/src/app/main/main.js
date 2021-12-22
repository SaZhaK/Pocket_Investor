'use strict';

function MainService() {
}

function MainCtrl($scope, MainService) {
    $scope.main = "main";
}

angular
    .module('pocketInvestor.main', ['ngRoute'])
        .service('MainService', MainService)
    .controller('MainCtrl', ['$scope', 'MainService', MainCtrl])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        });
    }]);

