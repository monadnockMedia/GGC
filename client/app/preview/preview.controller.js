'use strict';

angular.module('ggcApp')
  .controller('PreviewCtrl', function ($scope,$http,hotkeys,$sce,ggcUtil) {
	
    $scope.currentCard = 0;
	$scope.printObject = function(o){
		return JSON.stringify(o, null, 3);
	};
	
	ggcUtil.getCards().then(function(res){
	
		$scope.cards = res.data;
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
