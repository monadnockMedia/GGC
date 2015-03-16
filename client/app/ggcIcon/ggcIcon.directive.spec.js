'use strict';

describe('Directive: ggcIcon', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/ggcIcon/ggcIcon.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ggc-icon></ggc-icon>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ggcIcon directive');
  }));
});