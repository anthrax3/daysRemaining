var app = angular.module('showcase', ['daysRemaining']);

app.controller('MainCtrl', ['$scope', 'daysRemaining',
  function($scope, daysRemaining) {
    'use strict';

    $scope.theme = 'gold';
    $scope.themeOptions = ['gold', 'pink'];

    $scope.position = 'left';
    $scope.positionOptions = ['left', 'right'];

    daysRemaining.set('2015-12-25', 'https://isitchristmas.com/');

    $scope.setDefaultPosition = function() {
        daysRemaining.config({
            position: $scope.position
        });
    daysRemaining.set('2015-12-25', 'https://isitchristmas.com/');
    };

    $scope.setDefaultTheme = function() {
        daysRemaining.config({
            theme: $scope.theme
        });
    daysRemaining.set('2015-12-25', 'https://isitchristmas.com/');
    };

  }
]);
