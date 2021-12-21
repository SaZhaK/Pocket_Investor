'use strict';

function MainService() {
}

function MainCtrl($scope, MainService) {
    $scope.main = "main";
}

angular
    .module('pocketInvestor.main', ['ngRoute'])
    .controller('MainCtrl', MainCtrl)
    .service('MainService', MainService)
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        });
    }]);

