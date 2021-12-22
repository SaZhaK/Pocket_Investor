'use strict';

var environment = {
    production: false,
    baseUrl: 'http://localhost:8080'
};

var authorizeEndpoint = '/oauth2/authorization/github';
var tokenEndpoint = '/login/oauth2/code/github';
var baseUrl = environment.baseUrl;
var tokenKey = 'token';

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

function CallbackService() {
}

function CallbackCtrl($scope, CallbackService) {
    var code = getUrlParameter('code');
    var state = getUrlParameter('state');
    var data = fetchToken(code, state);
    var json = JSON.parse(data);

    updateToken(json.accessToken);

    var userId = getUserId();
    localStorage.setItem("userId", userId);

    window.location.href = '/#!/user';
}

function getUserId() {
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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

angular
    .module('pocketInvestor.callback', ['ngRoute'])
        .service('CallbackService', CallbackService)
    .controller('CallbackCtrl', ['$scope', 'CallbackService', CallbackCtrl])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/callback', {
            templateUrl: 'app/callback/callback.html',
            controller: 'CallbackCtrl'
        });
    }]);

