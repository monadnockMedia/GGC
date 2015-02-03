'use strict';

angular.module('ggcApp')
  .controller('EditCtrl', function ($scope, $http, $sce) {
    $scope.message = 'Hello';
	$scope.printObject = function(o){
		return JSON.stringify(o, null, 3);
	};
	$scope.getEditURL = function(id){
		console.log("TRUSTING",id);
	
		return $sce.trustAsResourceUrl("./data/Card/"+id+"/edit");
	};
	$http.get('/api/Card').success(function(_cards) {
		console.log("CARDS",_cards);
		$scope.cards = _cards;
	});
	
});
