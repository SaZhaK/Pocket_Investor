'use strict';


var environment = {
    production: false,
    baseUrl: 'http://localhost:8080'
};

function HomeService() {
}

function HomeCtrl($scope, HomeService) {
    var data = getUserInfo();
    $scope.name = data.name;
    $scope.logout = function () {
        logout();
    };
}

function getUserInfo() {
    var tokenKey = 'token';
    var token = localStorage.getItem(tokenKey);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("GET", environment.baseUrl + '/v1/home', false);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send(null);

    return JSON.parse(xhr.responseText);
}

function logout() {
    logout2();
    removeToken();
    window.location.href = '/#!/main';
}

function removeToken() {
    localStorage.removeItem(tokenKey);
}

function logout2() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", baseUrl + '/logout', false);
    xhr.send(getToken());

    return xhr.responseText;
}

angular
    .module('pocketInvestor.home', ['ngRoute'])
        .service('HomeService', HomeService)
    .controller('HomeCtrl', ['$scope', 'HomeService', HomeCtrl])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        });
    }]);

