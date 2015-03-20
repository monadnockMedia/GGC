'use strict';

angular.module('ggcApp')
  .directive('ggcThree', function (ggcThreeScene) {
    return {
      templateUrl: 'app/ggcThree/ggcThree.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        ggcThreeScene.setup(scope.config.scene);
        element.append( ggcThreeScene.renderer.domElement );

        ggcThreeScene.addCube();
        ggcThreeScene.render();
      }
    };
  });
