'use strict';

angular.module('pocketInvestor', [
  'ngRoute',
  'pocketInvestor.main',
  'pocketInvestor.portfolio',
  'pocketInvestor.portfolioList',
  'pocketInvestor.portfolioGeneric',
  'pocketInvestor.user',
  'pocketInvestor.userGeneric',
  'pocketInvestor.login',
  'pocketInvestor.callback',
  'pocketInvestor.home',
  'pocketInvestor.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
