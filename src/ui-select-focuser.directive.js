'use strict';

/**
 * @ngdoc directive
 * @name ui.selectTree.directive:uiSelectFocuser
 * @element ?
 * @requires ui.select
 * @function
 *
 * @description
 * Force activation of uiSelect on uiSelectFocus scope event
 *
 */
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
