'use strict';


angular.module('ggcApp')
  .controller('AppCtrl', function ($scope, $location, hotkeys, $http, $rootScope, nwkiosk) {
    $scope.config = true;
    //$http.get('/appConfig').then(function (res) {
    //  $scope.config = res.data;
    //  $rootScope.config = res.data;
    //})
    nwkiosk.setKioskMode($rootScope.config.kiosk);
    $rootScope.$watch(function(){return $rootScope.config.kiosk }, function(n,o){
      if(n !== o )  nwkiosk.setKioskMode(n);
    });
    $scope.config = $rootScope.config;


    $rootScope.$on( '$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      console.log( 'State Change Error: ', error.stack);
    });
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Sandbox',
      'link': '/sandbox'
    }, {
      'title': 'Preview',
      'link': '/preview'
    }];

    $scope.models = ["Card", "Icon", "Ending", "Event"];

    $scope.isCollapsed = true;

    $scope.isActive = function (route) {
      return route === $location.path();
    };

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        console.log("State Change Start", fromState,toState);
        $rootScope.currentState = toState.name;
        $scope.currentState = toState.name;

      })

    hotkeys.add({
      combo: 'P',
      description: 'Preview Mode',
      callback: function () {
        $location.path('/preview');
      }
    });

    hotkeys.add({
      combo: 'E',
      description: 'Edit Mode',
      callback: function () {
        $location.path('/edit');
      }
    });

    hotkeys.add({
      combo: 'a',
      description: 'Alert Mode',
      callback: function () {
        alert("Alert");
      }
    });
    hotkeys.add({
      combo: 'D',
      description: 'Debug Mode',
      callback: function () {
        $scope.debug = true;
      }
    });


  });
