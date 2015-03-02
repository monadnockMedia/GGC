'use strict';

angular.module('ggcApp')

  .controller('PreviewCtrl', function ($scope,$http,hotkeys,ggcUtil) {
	$scope.preview = {};
	$scope.preview.hideNavbar = false;
	$scope.preview.previewStates = ["cards","icons", "test"];
    $scope.preview.currentCard = 0;
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
		$scope.preview.cards = res.data;
	});
	

	
	hotkeys.bindTo($scope)
	    .add({
	      combo: 'left',
	      description: 'Previous Card',
	      callback: function(){
				$scope.preview.currentCard = ($scope.preview.currentCard == 0) ? 0 : $scope.preview.currentCard-1 ;
			}
	    })
		.add({
	      combo: 'right',
	      description: 'Next Card',
	      callback: function(){
				console.log("Current card test: ",$scope.preview.currentCard + 1, $scope.preview.cards.length )
				$scope.preview.currentCard = Math.min($scope.preview.currentCard + 1, $scope.preview.cards.length-1);
			}
	    })
		.add({
			combo: 'N',
			description: "Hide NavBar",
			callback: function(){
					
					$scope.preview.hideNavbar = !$scope.preview.hideNavbar;
				}
			
		})
	
});

angular.module('ggcApp')
  .controller('IconCtrl', function ($scope,$http,hotkeys,ggcUtil) {
		hotkeys.bindTo($scope)
		.add({
			combo: 'N',
			description: "Hide NavBar",
			callback: function(){
					
					$scope.preview.hideNavbar = !$scope.preview.hideNavbar;
				}
			
		})
	ggcUtil.getIcons().then(function(res){
		$scope.preview.icons = res.data;
	});
	
});
angular.module('ggcApp')
  .controller('TestCtrl', function ($scope,$http,hotkeys,dealer) {
		$scope.dealer = dealer;
		$scope.hands = dealer.hands;
		
		$scope.test = {
			cards: [],
			players: dealer.players
		};
		
		
		hotkeys.bindTo($scope)
		.add({
			combo: 'D',
			description: "Draw Two",
			callback: function(){
					
						dealer.drawTwo("economy");
				}
			
		})

	
});

