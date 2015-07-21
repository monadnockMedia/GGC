'use strict';

describe('Directive: ggcAttractVid', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/ggcAttractVid/ggcAttractVid.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ggc-attract-vid></ggc-attract-vid>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ggcAttractVid directive');
  }));
});