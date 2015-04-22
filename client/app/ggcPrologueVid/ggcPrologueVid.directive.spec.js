'use strict';

describe('Directive: ggcPrologueVid', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/ggcPrologueVid/ggcPrologueVid.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ggc-prologue-vid></ggc-prologue-vid>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ggcPrologueVid directive');
  }));
});