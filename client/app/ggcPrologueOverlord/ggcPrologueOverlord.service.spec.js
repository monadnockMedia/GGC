'use strict';

describe('Service: ggcPrologueOverlord', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcPrologueOverlord;
  beforeEach(inject(function (_ggcPrologueOverlord_) {
    ggcPrologueOverlord = _ggcPrologueOverlord_;
  }));

  it('should do something', function () {
    expect(!!ggcPrologueOverlord).toBe(true);
  });

});
