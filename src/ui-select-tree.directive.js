'use strict';

module.exports = ['groupFactory','$timeout', function(groupFactory, $timeout) {
  return {
    restrict: 'E',
    scope: { model: '=' },
    link: function (scope, el) {
      scope.breadcrumbs = [{"id":0,"title":"All"}];
      scope.groups = groupFactory.load(0);

      scope.loadChildGroupsOf = function(group, $select) {
        $select.search = '';

        scope.breadcrumbs.push(group);
        scope.groups = groupFactory.load(group.id);
        scope.$broadcast('uiSelectFocus');
      };

      scope.navigateBackTo = function (crumb, $select) {
        $select.search = '';
        var index = _.findIndex(scope.breadcrumbs, {id: crumb.id});

        scope.breadcrumbs.splice(index + 1, scope.breadcrumbs.length);
        scope.groups = groupFactory.load(_.last(scope.breadcrumbs).id);
        $select.open = false;
        scope.$broadcast('uiSelectFocus');
      };
    },
    templateUrl: '/ui-tree-select.html'
  };
}];
