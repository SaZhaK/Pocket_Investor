'use strict';

function getCurrentPrice(ticker) {
    var tokenKey = 'token';
    var token = localStorage.getItem(tokenKey);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = false;
    xmlHttp.open("GET", "http://localhost:8080/asset/price/" + ticker, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlHttp.setRequestHeader('Accept', 'application/json');
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.send(null);

    var response = JSON.parse(xmlHttp.responseText);

    if (response.price == null) {
        return null;
    }

    return Number(response.price).toFixed(2);
}

function PortfolioService() {
    this.getTrades = function () {
        var tokenKey = 'token';
        var token = localStorage.getItem(tokenKey);

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.withCredentials = false;
        xmlHttp.open("GET", "http://localhost:8080/portfolio/my/" + localStorage.getItem("userId"), false);
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
            var averagePrice = Number(array[i].price).toFixed(2);
            var invested = amount * averagePrice;

            var currentPrice = currentPrices[i].toFixed(2);
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

function editSharesTable($scope) {
    var inputList = document.getElementsByClassName("trade_input");
    var trades = $scope.trades;

    var total = 0;
    var currentPrices = [];
    for (var i = 0; i < trades.length; i++) {
        var trade = trades[i];
        trade.currency = {};
        // TODO
        trade.currency.name = "USD";
        trade.asset = {};
        trade.asset.ticker = inputList[3 * i].value;
        trade.amount = inputList[3 * i + 1].value;
        trade.price = inputList[3 * i + 2].value;

        trade.currentPrice = (getCurrentPrice(trade.ticker) * Number(trade.amount)).toFixed(2);
        total += trade.currentPrice;
        currentPrices[i] = trade.currentPrice;
    }

    for (i = 0; i < trades.length; i++) {
        var trade2 = trades[i];
        var amount = Number(trade2.amount);
        var averagePrice = Number(trade2.averagePrice);
        var currentPrice = currentPrices[i];
        var invested = amount * averagePrice;

        trade2.invested = invested;
        trade2.delta = currentPrice - invested;
        trade2.deltaPercent = (currentPrice / invested * 100 - 100).toFixed(2);
        trade2.percentage = (currentPrice / total * 100).toFixed(2);
    }

    for (i = 0; i < inputList.length; i++) {
        var input = inputList[i];
        if (input.getAttribute("disabled") === "disabled") {
            inputList[i].removeAttribute("disabled");
        } else {
            inputList[i].setAttribute("disabled", "disabled");
        }
    }

    var deleteBtnList = document.getElementsByClassName("delete_trade_btn");
    for (var j = 0; j < deleteBtnList.length; j++) {
        var deleteBtn = deleteBtnList[j];
        if (deleteBtn.style.visibility === "hidden" || deleteBtn.style.visibility === "") {
            deleteBtn.style.visibility = "visible";
        } else {
            deleteBtn.style.visibility = "hidden";
        }
    }

    var addBtn = document.getElementById("add_trade_btn");
    if (addBtn.style.visibility === "hidden" || addBtn.style.visibility === "") {
        addBtn.style.visibility = "visible";
    } else {
        addBtn.style.visibility = "hidden";
    }

    $scope.editMode = !$scope.editMode;
    if (!$scope.editMode) {
        createCharts(trades);
    }

    var summary = countPortfolioSummary(trades);
    $scope.totalPortfolioPrice = summary.totalPortfolioPrice;
    $scope.totalDelta = summary.totalDelta;
    $scope.totalInvested = summary.totalInvested;

    var portfolio = {};
    portfolio.trades = trades;
    var json = JSON.stringify(portfolio);

    var tokenKey = 'token';
    var token = localStorage.getItem(tokenKey);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = false;
    xmlHttp.open("PUT", "http://localhost:8080/portfolio/my/" + localStorage.getItem("userId"), false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.setRequestHeader('Accept', 'application/json');
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.send(json);
}

function addTrade($scope) {
    var trades = $scope.trades;
    trades.push({});

    $scope.disabled = function () {
        return false;
    };
}

function deleteTrade($index, $scope) {
    var trades = $scope.trades;
    trades.splice($index, 1);

    var total = 0;
    var currentPrices = [];
    for (var i = 0; i < trades.length; i++) {
        currentPrices[i] = trades[i].currentPrice;
        total += currentPrices[i];
    }

    for (i = 0; i < trades.length; i++) {
        trades[i].percentage = (currentPrices[i] / total * 100).toFixed(2);
    }

    createCharts(trades);

    var summary = countPortfolioSummary(trades);
    $scope.totalPortfolioPrice = summary.totalPortfolioPrice;
    $scope.totalDelta = summary.totalDelta;
    $scope.totalInvested = summary.totalInvested;
}

function PortfolioCtrl($scope, PortfolioService) {
    var trades = PortfolioService.getTrades();

    if (trades == null) {
        return;
    }

    createCharts(trades);

    var summary = countPortfolioSummary(trades);

    $scope.totalPortfolioPrice = summary.totalPortfolioPrice;
    $scope.totalDelta = summary.totalDelta;
    $scope.totalInvested = summary.totalInvested;

    $scope.trades = trades;

    $scope.editMode = false;

    $scope.disabled = function () {
        return true;
    };

    $scope.editSharesTable = function () {
        editSharesTable($scope);
    };

    $scope.addTrade = function () {
        addTrade($scope);
    };

    $scope.deleteTrade = function ($index) {
        deleteTrade($index, $scope);
    };
}

angular
    .module('pocketInvestor.portfolio', ['ngRoute'])
    .controller('PortfolioCtrl', PortfolioCtrl)
    .service('PortfolioService', PortfolioService)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/portfolio', {
            templateUrl: 'app/portfolio/portfolio.html',
            controller: 'PortfolioCtrl'
        });
    }]);

