'use strict';

angular.module('ggcApp')
  .service('ggcUtil', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	this.getCards = function(){
		console.log("Service.getCards");
		 return $http.get('/api/cards');
	};
	
  });
