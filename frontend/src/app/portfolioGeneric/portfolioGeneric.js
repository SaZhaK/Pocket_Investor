'use strict';

function getCurrentPrice(ticker) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = false;
    xmlHttp.open("GET", "http://localhost:8080/asset/price/" + ticker, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlHttp.setRequestHeader('Accept', 'application/json');
    xmlHttp.send(null);

    var response = JSON.parse(xmlHttp.responseText);

    if (response.price == null) {
        return null;
    }

    return Number(response.price).toFixed(2);
}

function PortfolioGenericService() {
    this.getTrades = function () {
        var tokenKey = 'token';
        var token = localStorage.getItem(tokenKey);

        var portfolioId = localStorage.getItem("selectedPortfolio");

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.withCredentials = false;
        // TODO fix
        xmlHttp.open("GET", "http://localhost:8080/portfolio/all/" + portfolioId, false);
        xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xmlHttp.setRequestHeader('Accept', 'application/json');
        xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
        xmlHttp.send(null);

        if (xmlHttp.status === 401) {
            window.location.href = '/#!/login';
            return;
        }

        var response = xmlHttp.responseText;
        var portfolio = JSON.parse(response);
        var array = portfolio.trades;

        var currentPrices = [];
        var total = 0;
        for (var j = 0; j < array.length; j++) {
            var curPrice = getCurrentPrice(array[j].asset.ticker);
            if (curPrice == null) {
                currentPrices[j] = -1;
            } else {
                currentPrices[j] = curPrice * Number(array[j].amount);
                total += currentPrices[j];
            }
        }

        var result = [];

        for (var i = 0; i < array.length; i++) {
            var ticker = array[i].asset.ticker;
            var amount = Number(array[i].amount);
            var averagePrice = Number(array[i].price);
            var invested = amount * averagePrice;

            var currentPrice = currentPrices[i];
            if (currentPrice === -1) {
                result[i] = {
                    ticker: ticker,
                    amount: amount,
                    averagePrice: averagePrice,
                    invested: invested,
                    currentPrice: "загрузка...",
                    delta: "загрузка...",
                    deltaPercent: "загрузка...",
                    percentage: "загрузка..."
                };
            } else {
                var delta = (currentPrice - invested).toFixed(2);
                var deltaPercent = (currentPrice / invested * 100 - 100).toFixed(2);
                var percentage = (currentPrice / total * 100).toFixed(2);

                result[i] = {
                    ticker: ticker,
                    amount: amount,
                    averagePrice: averagePrice,
                    invested: invested,
                    currentPrice: currentPrice,
                    delta: delta,
                    deltaPercent: deltaPercent,
                    percentage: percentage
                };
            }
        }

        return result;
    };
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var barChart = null;
var pieChart = null;

function createBarChart(labels, data, backGroundColor) {
    var ctx = angular.element(document.getElementById("barChart").getContext('2d'));

    if (barChart != null) {
        barChart.destroy();
    }

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                axis: 'y',
                label: "Delta data",
                data: data,
                backgroundColor: backGroundColor,
                borderWidth: 1
            }]
        }
    });
}

function createPieChart(labels, data, backGroundColor) {
    var ctx = angular.element(document.getElementById("pieChart").getContext('2d'));

    if (pieChart != null) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backGroundColor,
                borderWidth: 1
            }]
        }
    });
}

function createCharts(trades) {
    var labels = [];
    var deltaData = [];
    var percentageData = [];
    var backGroundColor = [];
    for (var i = 0; i < trades.length; i++) {
        var ticker = trades[i].ticker;
        var delta = trades[i].delta;
        var percentage = trades[i].percentage;

        labels[i] = ticker;
        deltaData[i] = delta;
        percentageData[i] = percentage;
        backGroundColor[i] = getRandomColor();
    }

    createBarChart(labels, deltaData, backGroundColor);
    createPieChart(labels, percentageData, backGroundColor);
}

function countPortfolioSummary(trades) {
    var summary = {};
    var totalPortfolioPrice = 0;
    var totalDelta = 0;
    var totalInvested = 0;

    for (var i = 0; i < trades.length; i++) {
        var curPrice = Number(trades[i].currentPrice);
        var delta = Number(trades[i].delta);

        if (curPrice !== 'загрузка...') {
            totalPortfolioPrice += curPrice;
        }

        if (delta !== 'загрузка...') {
            totalDelta += delta;
        }

        totalInvested += Number(trades[i].invested);
    }

    summary.totalPortfolioPrice = Number(totalPortfolioPrice).toFixed(2);
    summary.totalDelta = Number(totalDelta).toFixed(2);
    summary.totalInvested = Number(totalInvested).toFixed(2);

    return summary;
}

function openProfile() {
    window.location.href = '/#!/userGeneric';
}

function PortfolioGenericCtrl($scope, PortfolioGenericService) {
    var trades = PortfolioGenericService.getTrades();

    if (trades == null) {
        return;
    }

    createCharts(trades);

    var summary = countPortfolioSummary(trades);

    $scope.totalPortfolioPrice = summary.totalPortfolioPrice;
    $scope.totalDelta = summary.totalDelta;
    $scope.totalInvested = summary.totalInvested;

    $scope.trades = trades;

    $scope.username = localStorage.getItem("selectedUsername");

    $scope.openProfile = function () {
        openProfile();
    };
}

angular
    .module('pocketInvestor.portfolioGeneric', ['ngRoute'])
        .service('PortfolioGenericService', PortfolioGenericService)
    .controller('PortfolioGenericCtrl', ['$scope', 'PortfolioGenericService', PortfolioGenericCtrl])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/portfolioGeneric', {
            templateUrl: 'app/portfolioGeneric/portfolioGeneric.html',
            controller: 'PortfolioGenericCtrl'
        });
    }]);

