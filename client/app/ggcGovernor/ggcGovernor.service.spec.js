'use strict';

describe('Service: ggcGovernor', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcGovernor;
  beforeEach(inject(function (_ggcGovernor_) {
    ggcGovernor = _ggcGovernor_;
  }));

  it('should do something', function () {
    expect(!!ggcGovernor).toBe(true);
  });

});
