'use strict';

angular.module('ggcApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      });
  });