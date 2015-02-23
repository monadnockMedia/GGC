'use strict';

angular.module('ggcApp')
  .controller('PreviewCtrl', function ($scope,$http,hotkeys,ggcUtil) {
	
    $scope.currentCard = 0;
	$scope.printObject = function(o){
		return JSON.stringify(o, null, 3);
	};
	
	ggcUtil.getCards().then(function(res){
		console.log("cards",res.data);
		$scope.cards = res.data;
	});
	

	$scope.changeCard = function(n){
		console.log("ChangeCard", n);
		$scope.currentCard += n;
	}
	$scope.trust = ggcUtil.trustSVG;
	
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
