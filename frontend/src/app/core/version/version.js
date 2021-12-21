'use strict';

angular.module('pocketInvestor.version', [
  'pocketInvestor.version.interpolate-filter',
  'pocketInvestor.version.version-directive'
])

.value('version', '0.1');
