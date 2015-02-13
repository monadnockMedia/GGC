'use strict';

angular.module('ggcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('preview', {
        url: '/preview',
        templateUrl: 'app/preview/preview.html',
        controller: 'PreviewCtrl',
		hotkeys: [
		      ['p', 'Previous card', 'changeCard(-1)'],
				['n', 'Next card', 'changeCard(1)']
		    ]
      });
  });