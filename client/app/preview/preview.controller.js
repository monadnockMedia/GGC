'use strict';

///Main preview controller

angular.module('ggcApp')
  .controller('PreviewCtrl', function ($scope, $http, hotkeys, ggcUtil, $rootScope) {
    $scope.preview = {};
    $scope.preview.hideNavbar = false;

    $scope.preview.previewStates = ["cards", "icons", "test", "game","screen"];

    $scope.preview.currentCard = 0;
    $scope.printObject = function (o) {
      return JSON.stringify(o, null, 3);
    };

    $scope.trust = ggcUtil.trustSVG;

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){

      })

  });

/// controller for Card preview

angular.module('ggcApp')
  .controller('CardCtrl', function ($scope,$http,hotkeys,ggcUtil,dealer) {

    $scope.dealer = dealer;
    $scope.game = dealer.game;
    $scope.hands = dealer.hands;


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

/// controller for Icon preview
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


//Ryan's Test controller
angular.module('ggcApp')
  .controller('TestCtrl', function ($scope,$http,hotkeys,dealer) {
		$scope.dealer = dealer;
		$scope.game = dealer.game;
		///dealer.hands contains the current "card" views for each player, as well as the main player
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
		.add({
			combo: 'M',
			description: "Print Model",
			callback: function(){
					console.log("hands:",JSON.stringify($scope.hands,null,3), "game: ",JSON.stringify($scope.game,null,3));
				}

		})


});

angular.module('ggcApp')

  .controller('ScreenCtrl', function ($scope,$http,hotkeys,dealer) {
		var visibiltyAccess=false, enviroPanelExtended=false, econoPanelExtended=false, energyPanelExtended=false;


    $scope.dealer = dealer;
    $scope.game = dealer.game;
    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;

    $scope.enviroDocked = $scope.game;
    console.log("Test");
    console.log($scope.enviroDocked);




    $scope.openPanel = function(player) {
      if (player == "environment") {
        if (!enviroPanelExtended) {
          $('#enviroPanelInner').addClass('extended');
          enviroPanelExtended = true;
        } else {
          $('#enviroPanelInner').removeClass('extended');
          enviroPanelExtended = false;
        }
        } else if (player == "energy") {
        if (!energyPanelExtended) {
          $('#energyPanelInner').addClass('extended');
          energyPanelExtended = true;
        } else {
          $('#energyPanelInner').removeClass('extended');
          energyPanelExtended = false;
        }
      } else if (player == "economy") {
        if (!econoPanelExtended) {
          $('#econoPanelInner').addClass('extended');
          econoPanelExtended = true;
        } else {
          $('#econoPanelInner').removeClass('extended');
          econoPanelExtended = false;
        }
      }
    }




		hotkeys.bindTo($scope)
		.add({
			combo: 'D',
			description: "Draw Two",
			callback: function(){
					dealer.drawTwo("economy");

				}
			})
    .add({
       combo: 'E',
       description: "Draw Two",
       callback: function(){
        dealer.drawTwo("energy");
       }
      })
      .add({
        combo: 'R',
        description: "Draw Two",
        callback: function(){
          dealer.drawTwo("environment");
        }
      })
		.add({
			combo: 'M',
			description: "Print Model",
			callback: function(){
				console.log("hands:",JSON.stringify($scope.hands,null,3), "game: ",JSON.stringify($scope.game,null,3));d
			}
		})
      .add({
        combo: 'm',
        description: "Print Model",
        callback: function () {
          console.log("game:", $scope.game);
        }

      })

});

'use strict';

///Main preview controller

angular.module('ggcApp')
  .controller('PreviewCtrl', function ($scope, $http, hotkeys, ggcUtil, $rootScope) {
    $scope.preview = {};
    $scope.preview.hideNavbar = false;
    $scope.preview.previewStates = ["cards", "icons", "game"];
    $scope.preview.currentCard = 0;
    $scope.printObject = function (o) {
      return JSON.stringify(o, null, 3);
    };

    $scope.trust = ggcUtil.trustSVG;

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){

      })

  });

/// controller for Card preview

angular.module('ggcApp')
  .controller('CardCtrl', function ($scope, $http, hotkeys, ggcUtil) {

    $scope.currentCard = 0;
    $scope.printObject = function (o) {
      return JSON.stringify(o, null, 3);
    };

    ggcUtil.getCards().then(function (res) {
      console.log("cards", res.data);
      $scope.preview.cards = res.data;
    });


    hotkeys.bindTo($scope)
      .add({
        combo: 'left',
        description: 'Previous Card',
        callback: function () {
          $scope.preview.currentCard = ($scope.preview.currentCard == 0) ? 0 : $scope.preview.currentCard - 1;
        }
      })
      .add({
        combo: 'right',
        description: 'Next Card',
        callback: function () {
          console.log("Current card test: ", $scope.preview.currentCard + 1, $scope.preview.cards.length)
          $scope.preview.currentCard = Math.min($scope.preview.currentCard + 1, $scope.preview.cards.length - 1);
        }
      })
      .add({
        combo: 'N',
        description: "Hide NavBar",
        callback: function () {

          $scope.preview.hideNavbar = !$scope.preview.hideNavbar;
        }

      })

  });

/// controller for Icon preview
angular.module('ggcApp')
  .controller('IconCtrl', function ($scope, $http, hotkeys, ggcUtil) {
    hotkeys.bindTo($scope)
      .add({
        combo: 'N',
        description: "Hide NavBar",
        callback: function () {

          $scope.preview.hideNavbar = !$scope.preview.hideNavbar;
        }

      })
    ggcUtil.getIcons().then(function (res) {
      $scope.preview.icons = res.data;
    });

  });


//Ryan's Test controller
angular.module('ggcApp')
  .controller('GameLoopCtrl', function ($scope, $http, hotkeys, dealer) {
    $scope.dealer = dealer;
    $scope.game = dealer.game;
    ///dealer.hands contains the current "card" views for each player, as well as the main player
    $scope.hands = dealer.hands;

    $scope.test = {
      cards: [],
      players: dealer.players
    };





    hotkeys.bindTo($scope)
      .add({
        combo: 'D',
        description: "Draw Two",
        callback: function () {

          dealer.drawTwo("economy");
        }

      })
      .add({
        combo: 'M',
        description: "Print Model JSON",
        callback: function () {
          console.log("hands:", JSON.stringify($scope.hands, null, 3), "game: ", JSON.stringify($scope.game, null, 3));
        }

      })
      .add({
        combo: 'm',
        description: "Print Model",
        callback: function () {
          console.log("game:", $scope.game);
        }

      })


  });


