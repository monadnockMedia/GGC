'use strict';

angular.module('ggcApp')
  .controller('SandboxCtrl', function ($scope) {
    $scope.message = 'Hello';
  });


angular.module('ggcApp')
  .controller('GridCtrl', function ($scope, ggcMapper, ggcUtil) {
    ggcUtil.getIcons().then(function (res) {
      $scope.icons = res.data;

    });

  });
