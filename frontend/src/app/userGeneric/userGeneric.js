'use strict';

function UserGenericService() {
    this.getUser = function () {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.withCredentials = false;
        xmlHttp.open("GET", "http://localhost:8080/user/all/" + localStorage.getItem("selectedUser"), false);
        xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xmlHttp.setRequestHeader('Accept', 'application/json');
        xmlHttp.send(null);

        var response = xmlHttp.responseText;
        return JSON.parse(response);
    };
}

function UserGenericCtrl($scope, UserGenericService) {
    var user = UserGenericService.getUser();

    if (user == null) {
        return;
    }

    $scope.name = user.name;
    $scope.surname = user.surname;
    $scope.age = user.age;
    $scope.education = user.education;
    $scope.registrationDate = user.registrationDate;

    var avatarNumber = Math.floor(Math.random() * 3);
    if (user.gender === "MALE") {
        $scope.gender = "Мужчина";
        $scope.avatar = "male" + avatarNumber;
    } else if (user.gender === "FEMALE") {
        $scope.gender = "Женщина";
        $scope.avatar = "female" + avatarNumber;
    } else {
        $scope.avatar = "unknown_avatar";
    }

    if (user.qualifiedInvestorStatus) {
        $scope.qualifiedInvestorStatus = "Да";
    } else {
        $scope.qualifiedInvestorStatus = "Нет";
    }
}

angular
    .module('pocketInvestor.userGeneric', ['ngRoute'])
        .service('UserGenericService', UserGenericService)
    .controller('UserGenericCtrl', ['$scope', 'UserGenericService', UserGenericCtrl])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/userGeneric', {
            templateUrl: 'app/userGeneric/userGeneric.html',
            controller: 'UserGenericCtrl'
        });
    }]);

