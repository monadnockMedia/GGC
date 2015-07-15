'use strict';

describe('Service: nwkiosk', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var nwkiosk;
  beforeEach(inject(function (_nwkiosk_) {
    nwkiosk = _nwkiosk_;
  }));

  it('should do something', function () {
    expect(!!nwkiosk).toBe(true);
  });

});
