'use strict';

describe('Service: dealer', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var dealer;
  beforeEach(inject(function (_dealer_) {
    dealer = _dealer_;
  }));

  it('should do something', function () {
    expect(!!dealer).toBe(true);
  });

});
