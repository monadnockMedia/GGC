'use strict';

describe('Directive: ggcIconGrid', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/ggcIconGrid/ggcIconGrid.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ggc-icon-grid></ggc-icon-grid>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ggcIconGrid directive');
  }));
});