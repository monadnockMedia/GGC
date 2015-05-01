'use strict';

angular.module('ggcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sandbox', {
        url: '/sandbox',
        templateUrl: 'app/sandbox/sandbox.html',
        controller: 'SandboxCtrl'
      })
      .state('sandbox.grid', {
        url: '/grid',
        templateUrl: 'app/sandbox/grid.html',
        controller: 'GridCtrl'
      })
      .state('sandbox.three', {
        url: '/three',
        templateUrl: 'app/sandbox/three.html',
        controller: 'ThreeCtrl'
      }).state('sandbox.end', {
        url: '/end',
        templateUrl: 'app/sandbox/end.html',
        controller: 'EndingCtrl'
      });;
  });
