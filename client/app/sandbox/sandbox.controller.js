'use strict';

angular.module('ggcApp')
  .controller('SandboxCtrl', function ($scope) {
    $scope.message = 'Hello';
  });


angular.module('ggcApp')
  .controller('GridCtrl', function ($scope, ggcMapper) {
    $scope.grid = {};

    ggcMapper.buildHexes(16,10,800,500).then(function(d){
      $scope.grid = ggcMapper.grid;
      $scope.hexBin = ggcMapper.hexBin;
      $scope.grid.hexScale = 0.8;
    })

  });
