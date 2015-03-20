'use strict';

describe('Service: ggcThreeScene', function () {

  // load the service's module
  beforeEach(module('ggcApp'));

  // instantiate service
  var ggcThreeScene;
  beforeEach(inject(function (_ggcThreeScene_) {
    ggcThreeScene = _ggcThreeScene_;
  }));

  it('should do something', function () {
    expect(!!ggcThreeScene).toBe(true);
  });

});
