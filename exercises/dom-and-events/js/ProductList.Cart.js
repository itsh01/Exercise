/**
 * Created by itaysh on 6/30/15.
 */

var ProductList = ProductList || {};

// Product List Namespace

ProductList.Cart = (function() {
    'use strict';

    var items = {},
        products = ProductList.Mock;

    /**
     *  Add item to cart
     *
     * @param id {String} - id of added item
     */
    function addItem(id){
        items[id] = items[id] || 0;
        items[id] += 1;
        updateTotalPrice();
    }

    /**
     *  Remove item to cart
     *
     * @param id {String} - id of removed item
     */
    function removeItem(id){
        items[id] = items[id] || 0;
        if (items[id] > 0){
            items[id] -= 1;
            updateTotalPrice();
        }
    }

    /**
     *  Update items count
     *
     * @param id {String} - id of added/removed item
     * @param addOrRemove {Number} - 1/-1 either add or remove accordingly
     */
    function updateItem(id, addOrRemove){
        if( addOrRemove === null ){
            updateTotalPrice();
        }
        (addOrRemove > 0) ? addItem(id) : removeItem(id);
    }

    /**
     *  Calculate the total price
     *
     * @returns {Number} - total price
     */
    function getTotalPrice(){
        var key = '',
            totalPrice = 0,
            item;

        for (key in items){
            if (items.hasOwnProperty(key)){
                item = ProductList.Utils.getItemById(products, key);
                totalPrice += parseInt(item.price, 10) * items[key];
            }
        }

        return totalPrice;
    }

    /**
     *  Update the total price in the ui
     */
    function updateTotalPrice(){
        var cartInput = document.getElementById('cart-input');

        cartInput.value = getTotalPrice();
    }

    /**
     *  Get number of requested items from specific type
     *
     * @param itemId {String} - item id
     * @returns {Number} - count order from specific item
     */
    function getItemCount(itemId){
        return items[itemId];
    }

    /**
     *  Get total cart items order
     *
     * @returns {Object} - items order
     */
    function getItemsSummary(){
        return items;
    }

    /**
     *  Subscribe events to run when changes happen in cart
     */
    function subscribeToPubSub(){
        ProductList.PubSub.subscribe('itemUpdated', updateItem);
        ProductList.PubSub.subscribe('itemAdded', addItem);
        ProductList.PubSub.subscribe('itemRemoved', removeItem);
    }

    subscribeToPubSub();

    return {
        updateCart: updateTotalPrice,
        addItem: addItem,
        removeItem: removeItem,
        updateItem: updateItem,
        getItemCount: getItemCount,
        getItemsSummary: getItemsSummary,
        getTotalPrice: getTotalPrice
    }
})();