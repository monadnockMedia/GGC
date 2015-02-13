'use strict';

angular.module('ggcApp')
  .controller('NavbarCtrl', function ($scope, $location, hotkeys) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Edit',
      'link': '/edit'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

	hotkeys.add({
	    combo: 'P',
	    description: 'Preview Mode',
	    callback: function() {
	      $location.path('/preview');
	    }
	  });
	hotkeys.add({
	    combo: 'E',
	    description: 'Edit Mode',
	    callback: function() {
	      $location.path('/edit');
	    }
	  });
	hotkeys.add({
	    combo: 'a',
	    description: 'Alert Mode',
	    callback: function() {
	      alert("Alert");
	    }
	  });

	
  });