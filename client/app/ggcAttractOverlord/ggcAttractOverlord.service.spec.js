'use strict';

describe('Service: ggcAttractOverlord', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcAttractOverlord;
  beforeEach(inject(function (_ggcAttractOverlord_) {
    ggcAttractOverlord = _ggcAttractOverlord_;
  }));

  it('should do something', function () {
    expect(!!ggcAttractOverlord).toBe(true);
  });

});
