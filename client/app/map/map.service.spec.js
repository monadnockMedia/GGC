'use strict';

describe('Service: ggcMapper', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var map;
  beforeEach(inject(function (_map_) {
    map = _map_;
  }));

  it('should do something', function () {
    expect(!!map).toBe(true);
  });

});
