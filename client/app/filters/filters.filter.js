'use strict';
var app = angular.module('ggcApp');

app.filter('percent', function () {
    return function (input) {
      return ~~(input*100)+"%";
    };
  });

app.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

app.filter('supercap', function() {

  return function(input, scope) {
    if (input!=null) {
      var i, j, lowers, uppers;
      input = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });

      // Certain minor words should be left lowercase unless
      // they are the first or last words in the string
      lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
      for (i = 0, j = lowers.length; i < j; i++)
        input = input.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
          function(txt) {
            return txt.toLowerCase();
          });

      // Certain words such as initialisms or acronyms should be left uppercase
      uppers = ['Id', 'Tv'];
      for (i = 0, j = uppers.length; i < j; i++)
        input = input.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
          uppers[i].toUpperCase());


      return input;
    }

  }

});
