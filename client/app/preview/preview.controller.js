'use strict';

angular.module('ggcApp')
  .controller('PreviewCtrl', function ($scope,$http,hotkeys,$sce) {
	
    $scope.currentCard = 0;
	$scope.printObject = function(o){
		return JSON.stringify(o, null, 3);
	};
	$http.get('/api/Card').success(function(_cards) {
		console.log("CARDS",_cards);
		$scope.cards = _cards;
	});
	$scope.changeCard = function(n){
		console.log("ChangeCard", n);
		$scope.currentCard += n;
	}
	 $scope.trust = function(e){return $sce.trustAsHtml(e)};
	
	hotkeys.bindTo($scope)
	    .add({
	      combo: 'left',
	      description: 'Previous Card',
	      callback: function(){
				$scope.currentCard += -1;
			}
	    })
		.add({
	      combo: 'right',
	      description: 'Next Card',
	      callback: function(){
				$scope.currentCard += 1;
			}
	    })
});
