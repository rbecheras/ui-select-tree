'use strict';

module.exports = ['$timeout',function($timeout) {
  return {
    restrict: 'A',
    require: '^uiSelect',
    link: function (scope, elem, attrs, uiSelect) {
      scope.$on('uiSelectFocus', function () {
        $timeout(uiSelect.activate);
      });
    }
  };
}];
