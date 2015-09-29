'use strict';

window.appData = {};

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
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');

  })
  .run(function($rootScope){
    $rootScope.config = angular.copy(window.appData.config);
    $rootScope.cards = angular.copy(window.appData.cards);
    $rootScope.playerNames = angular.copy(window.appData.playerNames);
    delete window.appData;
  });

  formsAngular.config(['cssFrameworkServiceProvider', 'routingServiceProvider', function (cssFrameworkService, routingService) {
      routingService.start({html5Mode: true, prefix:'/data', routing: 'uirouter'});
      cssFrameworkService.setOptions({framework: 'bs3'});
      }]);





angular.lazy("ggcApp")
  .resolve(['$http', function ($http) {
    return $http.get('/api/cards/grouped')
      .then(function (resp) {
        window.appData.cards = resp.data;
        window.appData.playerNames = Object.keys(resp.data);
      }, function (err){
        angular.element('#error').show();
      });
  }])
  .resolve(['$http', function ($http) {
    return $http.get('/appConfig')
      .then(function (resp) {
        window.appData.config = resp.data;

      }, function (err){
        angular.element('#error').show();
      });
  }])
  .bootstrap();

