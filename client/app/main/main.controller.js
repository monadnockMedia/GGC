'use strict';

angular.module('ggcApp')
  .controller('MainCtrl', function ($scope, $http, $location, ggcUtil) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
	
	ggcUtil.getCards().then(function(d){console.log("Contorller",d)});


	

	

  });
