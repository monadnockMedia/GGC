'use strict';

angular.module('ggcApp')
  .config(function ($stateProvider) {
    $stateProvider
	.state('preview',{
        url: '/preview',

        templateUrl: 'app/preview/preview.html',
		controller: 'PreviewCtrl'
      })
      .state('preview.cards', {
        url: '/cards',
        templateUrl: 'app/preview/preview.cards.html',
        controller: 'CardCtrl',
      })
	.state('preview.icons', {
        url: '/cards',
        templateUrl: 'app/preview/preview.icons.html',
        controller: 'IconCtrl',
      })
	
  });