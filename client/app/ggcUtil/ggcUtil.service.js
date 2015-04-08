'use strict';

angular.module('ggcApp')
  .service('ggcUtil', function ($http, $sce) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getCards = function () {
      console.log("Service.getCards");
      return $http.get('/api/cards'); //custom endpoint
    };

    this.getEvents = function () {
      console.log("Service.getEvents");
      return $http.get('/api/Event'); //fng endpoint
    };

    this.getIcons = function (_id) {
      var res;
      if (_id) {
        res = $http.get('/api/Icon/' + _id);
      } else {
        res = $http.get('/api/Icon');//fng endpoin
      }
      return res;
    };

    this.getVideoURL = function(v){
      return $sce.trustAsResourceUrl("vid/"+v);
    };

    this.trustHTML = function (e) {
      return $sce.trustAsHtml(e)
    };

    this.trustSVG = this.trustHTML;

    this.printObject = function (o) {
      return JSON.stringify(o, null, 3);
    };

    this.getEditURL = function (id) {
      console.log("TRUSTING", id);
      /* SCE is the securuty/trust handling in angular */
      return $sce.trustAsResourceUrl("./data/Card/" + id + "/edit");
    };

    this.shuffle = function (array) {
      var copy = [],
        n = array.length,
        i;

      // While there remain elements to shuffle…
      while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * array.length);

        // If not already shuffled, move it to the new array.
        if (i in array) {
          copy.push(array[i]);
          delete array[i];
          n--;
        }
      }

      return copy;
    }


  });
