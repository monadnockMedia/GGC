'use strict';

angular.module('ggcApp')
  .service('ggcUtil', function ($http, $sce) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	this.getCards = function(){
		console.log("Service.getCards");
		 return $http.get('/api/cards'); //custom endpoint
	};
	
	this.getIcons = function(){
		 return $http.get('/api/Icon'); //fng endpoint
	};
	
	this.trustHTML = function(e){return $sce.trustAsHtml(e)};
	this.trustSVG = this.trustHTML;
	
	this.printObject = function(o){
		return JSON.stringify(o, null, 3);
	};
	
	this.getEditURL = function(id){
		console.log("TRUSTING",id);
		/* SCE is the securuty/trust handling in angular */
		return $sce.trustAsResourceUrl("./data/Card/"+id+"/edit");
	};
	
	
	
});
