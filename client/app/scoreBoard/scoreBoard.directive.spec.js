'use strict';

describe('Directive: scoreBoard', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/scoreBoard/scoreBoard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<score-board></score-board>');
    element = $compile(element)(scope);

    scope.$apply();
    expect(element.text()).toBe('this is the scoreBoard directive');

  }));
});
