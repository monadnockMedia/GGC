'use strict';



angular.module('ggcApp')
  .controller('AppCtrl', function ($scope, $location, hotkeys, $http) {
	
	$http.get('app/config.json').then(function(res){
	
		$scope.config = res.data;
			console.log("CONFIG" , res);
	})
	
	
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Edit',
      'link': '/edit'
    },{
      'title': 'Preview',
      'link': '/preview'
    }];

	$scope.models =["Card", "Icon", "Script", "Test"];

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