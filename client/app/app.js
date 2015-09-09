'use strict';



angular.module('ggcApp', [
  'ui.router',
  'ui.router.stateHelper',
	'ngAnimate',
  'ngCookies',
  'formsAngular',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap',
  'ngCkeditor',
  'ui.select2',
  'uploadModule',
  'ngAudio',
  'cfp.hotkeys'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

  });

  formsAngular.config(['cssFrameworkServiceProvider', 'routingServiceProvider', function (cssFrameworkService, routingService) {
      routingService.start({html5Mode: true, prefix:'/data', routing: 'uirouter'});
      cssFrameworkService.setOptions({framework: 'bs3'});
      }]);

