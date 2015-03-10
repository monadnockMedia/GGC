'use strict';

angular.module('ggcApp')
  .controller('SandboxCtrl', function ($scope) {
    $scope.message = 'Hello';
  });


angular.module('ggcApp')
  .controller('GridCtrl', function ($scope, ggcMapper) {
    ggcMapper.buildHexes(16,10,800,500).then(function(d){
      console.log("MAPPER", d);
    })

  });
