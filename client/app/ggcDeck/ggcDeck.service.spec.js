'use strict';

describe('Service: ggcDeck', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcDeck;
  beforeEach(inject(function (_ggcDeck_) {
    ggcDeck = _ggcDeck_;
  }));

  it('should do something', function () {
    expect(!!ggcDeck).toBe(true);
  });

});
