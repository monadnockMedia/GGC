'use strict';

angular.module('ggcApp')
  .service('ggcUtil', function ($http, $sce, $interval) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getCards = function () {
      //console.log("Service.getCards");
      return $http.get('/api/cards'); //custom endpoint
    };

    this.getEvents = function () {
      //console.log("Service.getEvents");
      return $http.get('/api/Event'); //fng endpoint
    };

    this.getEndings = function () {
      //console.log("Service.getEvents");
      return $http.get('/api/Ending'); //fng endpoint
    };

    this.getHints = function () {
      //console.log("Service.getHints");
      return $http.get('/api/Hint'); //fng endpoint
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
      return JSON.stringify(o, function(k,v){
        if (k === "icon"){
          return "<!-- SVG ICON -->"
        }else{
          return v;
        }
      }, 3);
    };

    this.getEditURL = function (id) {
      //console.log("TRUSTING", id);
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

    this.roll = function(chance) {
      var noRoll = (chance == 0);

      return (noRoll) ? false : (~~(Math.random() * chance) == 0);


    }

    this.wait = function(f,t){
      var timer = $interval(function () {
        $interval.cancel(timer);
        f.call();
      }, t);
    }

    this.isArray = function(a) { //testing for single object or array contain
      return Object.prototype.toString.call(a) === "[object Array]";
    }



  });
