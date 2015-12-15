'use strict';

angular.module('ggcApp')
  .controller('EditCtrl', function ($scope, $http, ggcUtil) {

	$scope.printObject = ggcUtil.printObject;

	$scope.getEditURL = ggcUtil.getEditURL;




	$http.get('/api/Card').success(function(_cards) {
    //console.log("get('api/Card')");
		$scope.cards = _cards;
    $scope.myData = [];

   // $scope.myData = [{Title: "Save the Fishies", EconPrim: "1", EconSec: "0", NatPrim: "1", NatSec: "0", EnPrim: "2", EnSec:"-1"}];



    for (var j = 0; j < $scope.cards.length; j++){
      var obj = {
                  Team: $scope.cards[j].team,
                  CardTitle: $scope.cards[j].action,
                  EconomyPrimary: $scope.cards[j].effects.economy.primaryScore,
                  EconomySecondary: $scope.cards[j].effects.economy.secondaryScore,
                  EnvironmentPrimary: $scope.cards[j].effects.environment.primaryScore,
                  EnvironmentSecondary:$scope.cards[j].effects.environment.secondaryScore,
                  EnergyPrimary: $scope.cards[j].effects.energy.primaryScore,
                  EnergySecondary:$scope.cards[j].effects.energy.secondaryScore
                };

      //console.log($scope.cards[j]);



      $scope.myData.push(obj);
    }

    $scope.gridOptions = { data: 'myData', enableColumnResize: true };
	});

});
