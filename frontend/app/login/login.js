'use strict';

var environment = {
    production: false,
    baseUrl: 'http://localhost:8080'
};

var authorizeEndpoint = '/oauth2/authorization/github';
var tokenEndpoint = '/login/oauth2/code/github';
var baseUrl = environment.baseUrl;
var tokenKey = 'token';

function login() {
    window.open(baseUrl + authorizeEndpoint, '_self');
}

function updateToken(token) {
    localStorage.setItem(tokenKey, token);
}

function fetchToken(code, state) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("GET", baseUrl + tokenEndpoint + '?code=' + code + '&state=' + state, false);
    xhr.send(null);

    return xhr.responseText;
}

function getToken() {
    return localStorage.getItem(tokenKey);
}

function isLoggedIn() {
    var token = getToken();
    return token != null;
}

function removeToken() {
    localStorage.removeItem(tokenKey);
}

function logout() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", baseUrl + '/logout', false);
    xhr.send(getToken());

    return xhr.responseText;
}

function LoginService() {
}

function LoginCtrl($scope, LoginService) {
    $scope.login = function () {
        login();
    };
}

angular
    .module('pocketInvestor.login', ['ngRoute'])
    .controller('LoginCtrl', LoginCtrl)
    .service('LoginService', LoginService)
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }]);

