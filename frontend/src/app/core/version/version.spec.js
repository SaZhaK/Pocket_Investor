'use strict';

describe('pocketInvestor.version module', function() {
  beforeEach(module('pocketInvestor.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
