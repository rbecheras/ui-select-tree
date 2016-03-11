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

},{"./src/ui-select-tree.module":6}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
'use strict';

module.exports = [function(){

  var tree;

  this.loadtree = function(data){
    tree = data;
  };

  this.$get = function(){
    return tree;
  };

}];

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var fs = require('fs');

var uiSelectTreeDirective = require('./ui-select-tree.directive');
var uiSelectFocuserDirective = require('./ui-select-focuser.directive');
var groupFactoryProvider = require('./group-factory.provider');


var uiSelectTreeModule = angular.module('ui.select-tree', ['ui.select', 'ngSanitize']);

uiSelectTreeModule.directive('uiSelectTree',uiSelectTreeDirective);
uiSelectTreeModule.directive('uiSelectFocuser',uiSelectFocuserDirective);
uiSelectTreeModule.provider('groupFactoryProvider',groupFactoryProvider);

fs.readFileSync('./selectize-choices.tpl.html',function(err, data){
  if (err) {
    console.error('Impossible to read selectize-choices.tpl.html');
    throw err;
  }
  uiSelectTreeModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('selectize-choices.tpl.html', data);
  }]);
});

fs.readFileSync('./ui-select-tree.tpl.html',function(err, data){
  if (err) {
    console.error('Impossible to read ui-select-tree.tpl.html');
    throw err;
  }
  uiSelectTreeModule.run(['$templateCache', function ($templateCache) {
    $templateCache.put('ui-select-tree.tpl.html', data);
  }]);
});

},{"./group-factory.provider":3,"./ui-select-focuser.directive":4,"./ui-select-tree.directive":5,"fs":2}]},{},[1]);
