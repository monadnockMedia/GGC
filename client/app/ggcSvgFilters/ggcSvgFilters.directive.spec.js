'use strict';

describe('Directive: ggcSvgFilters', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/ggcSvgFilters/ggcSvgFilters.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ggc-svg-filters></ggc-svg-filters>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ggcSvgFilters directive');
  }));
});