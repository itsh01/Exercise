/**
 * Created by itaysh on 6/30/15.
 */

var ProductList = ProductList || {};

// Product List Namespace

ProductList.Cart = (function() {
    'use strict';

    var cash = 0,
        items = {},
        products = ProductList.Mock;

    function addItem(id){
        items[id] = items[id] || 0;
        items[id] += 1;
        updateTotalPrice();
    }

    function removeItem(id){
        items[id] = items[id] || 0;
        if (items[id] > 0){
            items[id] -= 1;
            updateTotalPrice();
        }
    }

    function updateItem(id, price){
        (price > 0) ? addItem(id) : removeItem(id);
    }

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

    function updateTotalPrice(){
        var cartInput = document.getElementById('cart-input'),
            totalPrice = getTotalPrice();

        cash = totalPrice;
        cartInput.value = totalPrice;
    }

    function getItemCount(itemId){
        return items[itemId];
    }

    function getItemsSummary(){
        return items;
    }

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