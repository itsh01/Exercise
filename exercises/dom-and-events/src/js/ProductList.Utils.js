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

    /**
     *  Sort array of item objects by requested property
     *
     * @param items {Array} - items to be sorted
     * @param propertyName {String} - property name to sort by
     * @returns {Array} - array sorted by requested property
     */
    function sortItemObjectsByProperty(items, propertyName){
        return items.sort(function(a,b){
            return (a.data[propertyName] > b.data[propertyName]) ? 1 : -1;
        });
    }

    /**
     *  Get specific item by its ID from an array of items
     *
     * @param items {Array} - array of items to search in
     * @param itemId {String} - item identified
     * @returns {Object} - matching item from products
     */
    function getItemById(items, itemId) {
        return items.filter(function (item) {
            return item.getId() == itemId;
        }).pop();
    }

    /**
     *  Get random floored number between 0 and chosen range-1
     *
     * @param range {number} - top limit
     * @returns {number} - random number
     */
    function getRandom(range){
        return Math.floor( Math.random() * range );
    }

    /**
     *  Copy Object
     *
     * @param obj
     */
    function copyObject(obj){
        return JSON.parse( JSON.stringify(obj) );
    }

    return {
        convertToArray: convertToArray,
        sortItemsByProperty: sortItemsByProperty,
        sortItemObjectsByProperty: sortItemObjectsByProperty,
        getRandom: getRandom,
        copyObject: copyObject,
        getItemById: getItemById
    };

})();