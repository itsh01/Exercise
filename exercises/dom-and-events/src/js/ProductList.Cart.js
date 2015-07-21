/**
 * Created by itaysh on 6/30/15.
 */

var ProductList = ProductList || {};

// Product List Namespace

ProductList.Cart = ( function () {
    'use strict';

    var items = {},
        products = ProductList.Store.getProducts();

    /**
     *  Add item to cart
     *
     * @param id {String} - id of added item
     */
    function addItem(id){
        items[id] = items[id] || 0;
        items[id] += 1;
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
        }
    }

    /**
     *  Update items count
     *
     * @param id {String} - id of added/removed item
     * @param addOrRemove {Number} - 1/-1 either add or remove accordingly
     */
    function updateItem(id, addOrRemove){
        if (addOrRemove > 0) {
            addItem(id);
        } else {
            removeItem(id);
        }
        ProductList.PubSub.publish('itemUpdated', [id]);
    }

    /**
     *  Calculate the total price
     *
     * @returns {Number} - total price
     */
    function getTotalPrice(){
        var item = null;

        products = ProductList.Store.getProducts();

        return _.reduce(items, function (sum, count, id){
            item = ProductList.Utils.getItemById(products, id);
            return sum + parseInt(item.getPrice(), 10) * count;
        }, 0);

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
     *  Commit Order
     */
    function commitOrder(){
        var currentProduct = null;

        _.forIn(items, function (count, id){
            currentProduct = ProductList.Utils.getItemById(products, id);
            currentProduct.setStock(currentProduct.getStock() - count);
        });

        items = {};
        ProductList.PubSub.publish('orderCommitted', []);
    }

    /**
     *  Subscribe events to run when changes happen in cart
     */
    function subscribeToPubSub(){
        ProductList.PubSub.subscribe('itemUpdated', updateTotalPrice);
        ProductList.PubSub.subscribe('couponApplied', updateTotalPrice);
        ProductList.PubSub.subscribe('orderCommitted', updateTotalPrice);
    }

    subscribeToPubSub();

    return {
        updateCart: updateTotalPrice,
        updateItem: updateItem,
        getItemCount: getItemCount,
        commitOrder: commitOrder,
        getItemsSummary: getItemsSummary,
        getTotalPrice: getTotalPrice
    };
}());