'use strict';
var app = angular.module('ggcApp');
app
  .controller('SandboxCtrl', function ($scope) {
    $scope.message = 'Hello';
  });

app
  .controller('ThreeCtrl', function ($scope) {
    $scope.message = 'Hello';
  });

app
  .controller('GridCtrl', function ($scope, ggcMapper, ggcUtil, $interval) {
    var l = 14;
    $scope.clicked = function($ev){
      var icon = $scope.icons[~~(Math.random() * 10)];
      var i = $ev.target.attributes["grid-index"].value;
      ggcMapper.putIcon(i, icon._id);
    };
    ggcUtil.getIcons().then(function (res) {
      $scope.icons = res.data;
      /*for(var j = 0; j<10; j++){
        var icon = $scope.icons[~~(Math.random() * j)];

        ggcMapper.putIcon(j, icon._id);
        console.log(j, icon._id);
      }*/

    });

  });
