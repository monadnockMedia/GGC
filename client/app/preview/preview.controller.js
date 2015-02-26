'use strict';

angular.module('ggcApp')
  .controller('PreviewCtrl', function ($scope,$http,hotkeys,ggcUtil) {
	
	$scope.config.previewStates = ["cards","icons"];
	
    $scope.currentCard = 0;
	$scope.printObject = function(o){
		return JSON.stringify(o, null, 3);
	};
	

	$scope.trust = ggcUtil.trustSVG;
	

});


angular.module('ggcApp')
  .controller('CardCtrl', function ($scope,$http,hotkeys,ggcUtil) {
	
	
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

	
	hotkeys.bindTo($scope)
	    .add({
	      combo: 'left',
	      description: 'Previous Card',
	      callback: function(){
				$scope.currentCard = ($scope.currentCard == 0) ? 0 : $scope.currentCard-1 ;
			}
	    })
		.add({
	      combo: 'right',
	      description: 'Next Card',
	      callback: function(){
				console.log("Current card test: ",$scope.currentCard + 1, $scope.cards.length )
				$scope.currentCard = Math.min($scope.currentCard + 1, $scope.cards.length-1);
			}
	    })
});

angular.module('ggcApp')
  .controller('IconCtrl', function ($scope,$http,hotkeys,ggcUtil) {
	
	
	
	ggcUtil.getIcons().then(function(res){
		console.log("icons",res.data);
		$scope.icons = res.data;
	});
	
});
