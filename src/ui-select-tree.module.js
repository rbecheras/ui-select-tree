'use strict';

/**
 * @ngdoc overview
 * @name ui.selectTree
 * @description AWESOME
 */

var fs = require('fs');

var uiSelectTreeDirective = require('./ui-select-tree.directive');
var uiSelectFocuserDirective = require('./ui-select-focuser.directive');
var groupFactoryProvider = require('./group-factory.provider');

var templateContent;

var uiSelectTreeModule = angular.module('ui.selectTree', ['ui.select', 'ngSanitize']);

uiSelectTreeModule.directive('uiSelectTree',uiSelectTreeDirective);
uiSelectTreeModule.directive('uiSelectFocuser',uiSelectFocuserDirective);
uiSelectTreeModule.provider('groupFactory',groupFactoryProvider);

templateContent = fs.readFileSync('src/selectize-choices.tpl.html','utf-8');
uiSelectTreeModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('selectize-choices.tpl.html', templateContent);
}]);

templateContent = fs.readFileSync('src/ui-select-tree.tpl.html','utf-8');
uiSelectTreeModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('ui-select-tree.tpl.html', templateContent);
}]);
