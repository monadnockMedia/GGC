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

  
  });

  formsAngular.config(['cssFrameworkServiceProvider', 'routingServiceProvider', function (cssFrameworkService, routingService) {
      routingService.start({html5Mode: true, prefix:'/data', routing: 'uirouter'});
      cssFrameworkService.setOptions({framework: 'bs3'});
      }]);
