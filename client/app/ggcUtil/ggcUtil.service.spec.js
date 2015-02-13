'use strict';

describe('Service: ggcUtil', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcUtil;
  beforeEach(inject(function (_ggcUtil_) {
    ggcUtil = _ggcUtil_;
  }));

  it('should do something', function () {
    expect(!!ggcUtil).toBe(true);
  });

});
