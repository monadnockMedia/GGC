'use strict';

angular.module('ggcApp')
  .controller('EditCtrl', function ($scope, $http, ggcUtil) {

	$scope.printObject = ggcUtil.printObject;
	
	$scope.getEditURL = ggcUtil.getEditURL;
	
	$http.get('/api/Card').success(function(_cards) {
		$scope.cards = _cards;
	});
	
});
