'use strict';

describe('Directive: playerPanel', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/playerPanel/playerPanel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<player-panel></player-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the playerPanel directive');
  }));
});