'use strict';
var app = angular.module('ggcApp');
app
  .controller('SandboxCtrl', function ($scope) {
    $scope.message = 'Hello';
  });

app
  .controller('EndingCtrl', function ($scope, ggcUtil, $filter) {
    $scope.message = 'Hello';
    ggcUtil.getEndings().then(function(d){
      $filter("endObject")(d.data);
    })
  });

app
  .controller('GridCtrl', function ($scope, ggcMapper, ggcUtil, $interval, hotkeys) {
    var l = 14;
    $scope.clicked = function($ev){
      var icon = $scope.icons[~~(Math.random() * 10)];
      //ggcMapper.putIcon(ggcMapper.randomIndex(), icon._id);
      ggcMapper.addPriorityIcon(icon);
    };


    ggcUtil.getIcons().then(function (res) {
      $scope.icons = res.data;

    });

    hotkeys.bindTo($scope)
      .add({
        combo: 'g',
        description: 'PushGrid',
        callback: function(){
          var icon = $scope.icons[~~(Math.random() * $scope.icons.length)];
          //ggcMapper.putIcon(ggcMapper.randomIndex(), icon._id);
          ggcMapper.addPriorityIcon(icon);
        }
      })

  });
