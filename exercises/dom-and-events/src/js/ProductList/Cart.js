/**
 * Created by itaysh on 7/22/15.
 */

define(['Store','Utils','PubSub', 'lodash'],
    function (Store, Utils, PubSub, _) {
        'use strict';

        var items = {},
            products = Store.getProducts();

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
            PubSub.publish('itemUpdated', [id]);
        }

        /**
         *  Calculate the total price
         *
         * @returns {Number} - total price
         */
        function getTotalPrice(){
            var item = null;

            products = Store.getProducts();

            return _.reduce(items, function (sum, count, id){
                item = Utils.getItemById(products, id);
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
                currentProduct = Utils.getItemById(products, id);
                currentProduct.setStock(currentProduct.getStock() - count);
            });

            items = {};
            PubSub.publish('orderCommitted', []);
        }

        /**
         *  Subscribe events to run when changes happen in cart
         */
        function subscribeToPubSub(){
            PubSub.subscribe('itemUpdated', updateTotalPrice);
            PubSub.subscribe('couponApplied', updateTotalPrice);
            PubSub.subscribe('orderCommitted', updateTotalPrice);
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
    }
);