'use strict';


angular.module('ggcApp')
  .controller('NavbarCtrl', function ($scope, $location, hotkeys) {
   

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };


	
  });

