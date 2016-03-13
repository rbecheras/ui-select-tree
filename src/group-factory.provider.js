'use strict';

/**
 * @ngdoc service
 * @serviceProvider
 * @constructor
 * @name ui.selectTree.provider:groupFactory
 * @requires ui.select
 * @module ui.selectTree
 * @function
 *
 * @description
 * The factory is used by directives to load the ui-select list with children on selection change
 *
 */
 function groupFactoryProvider(){

   /**
    * The tree data store
    * @property
    * @private
    *
    */
   var tree;

   /**
    * The method used in a config block, to load a full tree formatted data in the factory.
    * @method
    * @param {object} data An indexed object (keys are numbers starting at zero) where members are arrays of objects (items to select)
    * @returns void
    */
   this.loadTree = function(data){
     tree = data;
   };

   /**
    * Implementation of the $get method of the angular module#factory interface. It returns the groupFactory service.
    * @method
    * @returns {object} the groupFactory instance.
    */
   this.$get = function(){
     /**
      * The groupFactory instance.
      * @name groupFactory
      * @type {object}
      */
     return {
       /**
        * Load the ui-select list by a sub-group given by its specific id.
        * @method
        * @memberof groupFactory
        * @param {integer} id The item id.
        * @returns The requested item.
        */
       load: function (id) {
         return tree[id];
       }
     };
   };

 }

// Annotate the angular factory, and export it.
// No dependency, so no supplementary annotation, just wrap the factory in an array.
module.exports = [groupFactoryProvider];
