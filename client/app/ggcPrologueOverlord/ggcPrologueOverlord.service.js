'use strict';

angular.module('ggcApp')
  .service('ggcPrologueOverlord', function (dealer) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pop;
    this.makePop = function(v){
      pop = Popcorn(v);
      pop.play();

      pop.code({
        start: 1,
        end: 3,
        onStart: function(){dealer.dockAll(true)},
        onEnd: function(){dealer.dockAll(false)},
      })
    }
  });
