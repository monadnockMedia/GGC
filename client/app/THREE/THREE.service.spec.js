'use strict';

describe('Service: THREE', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var THREE;
  beforeEach(inject(function (_THREE_) {
    THREE = _THREE_;
  }));

  it('should do something', function () {
    expect(!!THREE).toBe(true);
  });

});
