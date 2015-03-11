'use strict';

describe('Directive: ggcGrid', function () {

  // load the directive's module
  beforeEach(module('ggcApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ggc-grid></ggc-grid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ggcGrid directive');
  }));
});