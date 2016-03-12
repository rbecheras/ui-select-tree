'use strict';

/**
 * @ngdoc service
 * @serviceProvider
 * @name ui.selectTree.provider:groupFactory
 * @requires ui.select
 * @module ui.selectTree
 * @function
 *
 * @description
 * Provides tree selection on top of angular-ui/ui-select
 *
 */
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
