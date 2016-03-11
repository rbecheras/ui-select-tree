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
