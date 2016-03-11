(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
* ui-select-tree.js
*
* Released under MIT License.
* Copyright (c) 2016 Rémi Becheras All rights reserved
*
*/

'use strict';

require('./src/ui-select-tree.module');

},{"./src/ui-select-tree.module":5}],2:[function(require,module,exports){
'use strict';

module.exports = [function(){

  var tree;

  this.loadTree = function(data){
    tree = data;
  };

  this.$get = function(){
    return {
      load: function (id) {
        return tree[id];
      }
    };
  };

}];

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
    templateUrl: 'ui-select-tree.tpl.html'
  };
}];

},{}],5:[function(require,module,exports){
'use strict';



var uiSelectTreeDirective = require('./ui-select-tree.directive');
var uiSelectFocuserDirective = require('./ui-select-focuser.directive');
var groupFactoryProvider = require('./group-factory.provider');

var templateContent;

var uiSelectTreeModule = angular.module('ui.selectTree', ['ui.select', 'ngSanitize']);

uiSelectTreeModule.directive('uiSelectTree',uiSelectTreeDirective);
uiSelectTreeModule.directive('uiSelectFocuser',uiSelectFocuserDirective);
uiSelectTreeModule.provider('groupFactory',groupFactoryProvider);

templateContent = "<div ng-show=\"$select.open\"\n  class=\"ui-select-choices group-tree selectize-dropdown single\">\n  <div ng-show=\"breadcrumbs.length > 1\" class=\"ui-select-breadcrumbs\">\n    <span class=\"ui-breadcrumb\" ng-repeat=\"crumb in breadcrumbs\"\n       ng-click=\"navigateBackTo(crumb, $select)\">\n       {{crumb.title}}\n    </span>\n  </div>\n  <div class=\"ui-select-choices-content selectize-dropdown-content\">\n    <div class=\"ui-select-choices-group optgroup\">\n      <div ng-show=\"$select.isGrouped\"\n        class=\"ui-select-choices-group-label optgroup-header\">\n        {{$group}}\n      </div>\n      <div class=\"ui-select-choices-row\">\n        <div class=\"option ui-select-choices-row-inner\"\n           data-selectable=\"\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
uiSelectTreeModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('selectize-choices.tpl.html', templateContent);
}]);

templateContent = "<ui-select ng-model=\"model.$selected\" ui-select-focuser theme=\"selectize\">\n  <ui-select-match placeholder=\"Select a group\">\n    {{ $select.selected.title }}\n  </ui-select-match>\n\n  <ui-select-choices repeat=\"group in groups | filter: $select.search\">\n    <div>\n      <span ng-bind-html=\"group.title | highlight: $select.search\"></span>\n      <span ng-bind-html=\"'('+group.size+' users)'\"></span>\n      <a href ng-show=\"group.parent\" class=\"goto-child-group\" ng-click=\"loadChildGroupsOf(group, $select)\">\n        <i class=\"fa fa-angle-right\"></i>\n      </a>\n    </div>\n  </ui-select-choices>\n</ui-select>\n";
uiSelectTreeModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('ui-select-tree.tpl.html', templateContent);
}]);

},{"./group-factory.provider":2,"./ui-select-focuser.directive":3,"./ui-select-tree.directive":4}]},{},[1]);
