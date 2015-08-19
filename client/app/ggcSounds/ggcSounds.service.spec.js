'use strict';

describe('Service: ggcSounds', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcSounds;
  beforeEach(inject(function (_ggcSounds_) {
    ggcSounds = _ggcSounds_;
  }));

  it('should do something', function () {
    expect(!!ggcSounds).toBe(true);
  });

});
