/**
 * Created by itaysh on 7/6/15.
 */


var ProductList = ProductList || {};


ProductList.Utils = (function() {
    'use strict';

    /**
     *  Convert a collection of items to array
     *
     * @param collection {Object} - collection
     * @returns {Array} - array of items
     */
    function convertToArray(collection){
        return [].slice.call(collection);
    }

    /**
     *  Sort array of items by requested property
     *
     * @param items {Array} - items to be sorted
     * @param propertyName {String} - property name to sort by
     * @returns {Array} - array sorted by requested property
     */
    function sortItemsByProperty(items, propertyName){
        return items.sort(function(a,b){
            return (a[propertyName] > b[propertyName]) ? 1 : -1;
        });
    }

    return {
        convertToArray: convertToArray,
        sortItemsByProperty: sortItemsByProperty
    };

})();