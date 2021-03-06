'use strict';

describe('Directive: cardList', function () {

  // load the directive's module and view
  beforeEach(module('ggcApp'));
  beforeEach(module('app/cardList/cardList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<card-list></card-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cardList directive');
  }));
});