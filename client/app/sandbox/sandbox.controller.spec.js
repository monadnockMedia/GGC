'use strict';

describe('Controller: SandboxCtrl', function () {

  // load the controller's module
  beforeEach(module('ggcApp'));

  var SandboxCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SandboxCtrl = $controller('SandboxCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
