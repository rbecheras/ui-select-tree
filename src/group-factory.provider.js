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
