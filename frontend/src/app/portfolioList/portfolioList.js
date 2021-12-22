'use strict';

function PortfolioListService() {
    this.getPortfolios = function () {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.withCredentials = false;
        xmlHttp.open("GET", "http://localhost:8080/user/all", false);
        xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xmlHttp.setRequestHeader('Accept', 'application/json');
        xmlHttp.send(null);

        var response = xmlHttp.responseText;
        var array = JSON.parse(response);

        var result = [];
        for (var i = 0; i < array.length; i++) {
            var name = array[i].name;
            var surname = array[i].surname;
            var githubLogin = array[i].githubLogin;

            var username = {};
            if (name != null && surname != null) {
                username = surname + " " + name;
            } else {
                username = githubLogin;
            }

            var portfolio = array[i].portfolio;
            console.log(portfolio);

            result[i] = {
                id: portfolio.id,
                userId : array[i].id,
                username: username,
                totalCost: Number(portfolio.totalCost).toFixed(2),
                delta: Number(portfolio.delta).toFixed(2),
                deltaPercentage: Number(portfolio.deltaPercentage).toFixed(2)
            };
        }

        return result;
    };
}

function openPortfolio(userId) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = false;
    xmlHttp.open("GET", "http://localhost:8080/user/all/" + userId, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlHttp.setRequestHeader('Accept', 'application/json');
    xmlHttp.send(null);

    var response = xmlHttp.responseText;
    var user = JSON.parse(response);

    var name = user.name;
    var surname = user.surname;
    var githubLogin = user.githubLogin;

    var username = {};
    if (name != null && surname != null) {
        username = surname + " " + name;
    } else {
        username = githubLogin;
    }

    localStorage.setItem("selectedPortfolio", user.portfolio.id);
    localStorage.setItem("selectedUser", userId);
    localStorage.setItem("selectedUsername", username);
    window.location.href = '/#!/portfolioGeneric';
}

function PortfolioListCtrl($scope, PortfolioListService) {
    $scope.portfolios = PortfolioListService.getPortfolios();

    $scope.openPortfolio = function (id) {
        openPortfolio(id);
    };
}

angular
    .module('pocketInvestor.portfolioList', ['ngRoute'])
        .service('PortfolioListService', PortfolioListService)
    .controller('PortfolioListCtrl', ['$scope', 'PortfolioListService', PortfolioListCtrl])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/portfolioList', {
            templateUrl: 'app/portfolioList/portfolioList.html',
            controller: 'PortfolioListCtrl'
        });
    }]);

