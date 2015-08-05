'use strict';

describe('Service: ggcGame', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcGame;
  beforeEach(inject(function (_ggcGame_) {
    ggcGame = _ggcGame_;
  }));

  it('should do something', function () {
    expect(!!ggcGame).toBe(true);
  });

});
