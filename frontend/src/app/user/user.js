'use strict';

function UserService() {
    this.getUser = function () {
        var tokenKey = 'token';
        var token = localStorage.getItem(tokenKey);

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.withCredentials = false;
        xmlHttp.open("GET", "http://localhost:8080/user/my/" + localStorage.getItem("userId"), false);
        xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xmlHttp.setRequestHeader('Accept', 'application/json');
        xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
        xmlHttp.send(null);

        if (xmlHttp.status === 401) {
            window.location.href = '/#!/login';
            return;
        }

        var response = xmlHttp.responseText;
        return JSON.parse(response);
    };
}

function editUser() {
    var inputList = document.getElementById("user_summary").getElementsByTagName("input");
    for (var i = 0; i < inputList.length; i++) {
        var input = inputList[i];
        if (input.getAttribute("disabled") === "disabled") {
            inputList[i].removeAttribute("disabled");
        } else {
            inputList[i].setAttribute("disabled", "disabled");
        }
    }

    var saveBtn = document.getElementById("user_save_button");
    if (saveBtn.style.visibility === "hidden" || saveBtn.style.visibility === "") {
        saveBtn.style.visibility = "visible";
    } else {
        saveBtn.style.visibility = "hidden";
    }
}

function saveUser($scope) {
    var inputList = document.getElementById("user_summary").getElementsByTagName("input");

    for (var i = 0; i < inputList.length; i++) {
        inputList[i].setAttribute("disabled", "disabled");
    }

    var style = "visibility: hidden;";
    var saveBtn = document.getElementById("user_save_button");
    saveBtn.setAttribute("style", style);

    var user = {};
    user.name = $scope.name;
    user.surname = $scope.surname;
    user.age = $scope.age;
    user.education = $scope.education;
    user.registrationDate = $scope.registrationDate;

    if ($scope.gender === "Мужчина") {
        user.gender = "MALE";
    } else {
        user.gender = "FEMALE";
    }
    user.qualifiedInvestorStatus = $scope.qualifiedInvestorStatus === "Да";

    var json = JSON.stringify(user);

    var tokenKey = 'token';
    var token = localStorage.getItem(tokenKey);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = false;
    xmlHttp.open("PUT", "http://localhost:8080/user/my/" + localStorage.getItem("userId"), false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.setRequestHeader('Accept', 'application/json');
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlHttp.send(json);
}

function logout() {
    logout2();
    removeToken();
    window.location.href = '/#!/main';
}

function logout2() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", 'http://localhost:8080/logout', false);
    xhr.send(getToken());

    return xhr.responseText;
}

function removeToken() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("userId");
}

function getToken() {
    return localStorage.getItem(tokenKey);
}

function UserCtrl($scope, UserService) {
    var user = UserService.getUser();

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

    $scope.editUser = function () {
        editUser();
    };

    $scope.saveUser = function () {
        saveUser($scope);
    };

    $scope.logout = function () {
        logout();
    };
}

angular.module('pocketInvestor.user', ['ngRoute'])
    .service('UserService', UserService)
    .controller('UserCtrl', ['$scope', 'UserService', UserCtrl])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'app/user/user.html',
            controller: 'UserCtrl'
        });
    }]);

