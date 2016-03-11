'use strict';

module.exports = [function(){

  var tree;

  this.loadtree = function(data){
    tree = data;
  };

  this.$get = function(){
    return {
      load: function (id) {
        return tree[id];
      }
    }
  };

}];
