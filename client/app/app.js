'use strict';



angular.module('ggcApp', [
  'ui.router',
  'ngCookies',
  'formsAngular',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngGrid',
  'ngCkeditor',
  'ui.select2',
  'uploadModule',
  'cfp.hotkeys'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

		$stateProvider
	      .state('root', {
	        url: '',
			abstract: true,
	        controller: 'RootCtrl'
	      });

  
  });

angular.module('ggcApp')
  .controller('RootCtrl', function ($scope, $location, hotkeys) {
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

  formsAngular.config(['cssFrameworkServiceProvider', 'routingServiceProvider', function (cssFrameworkService, routingService) {
      routingService.start({html5Mode: true, prefix:'/data', routing: 'uirouter'});
      cssFrameworkService.setOptions({framework: 'bs3'});
      }]);

