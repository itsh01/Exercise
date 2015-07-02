/**
 * Created by itaysh on 6/30/15.
 */

var ProductList = ProductList || {};

// Product List Namespace

ProductList.Cart = (function() {
    'use strict';

    var cash = 0,
        items = {};

    function addItem(id, price){
        items[id] = items[id] || 0;
        items[id] += 1;
        addCash(price);
    }

    function removeItem(id, price){
        items[id] = items[id] || 0;
        if (items[id] > 0){
            items[id] -= 1;
            removeCash(price);
        }
    }

    function updateItem(id, price){
        (price > 0) ? addItem(id, price) : removeItem(id, -price);
    }

    function addCash(moreCash){
        cash += moreCash;
        updateCart();
    }

    function removeCash(moreCash){
        cash -= moreCash;
        updateCart();
    }

    function updateCart(){
        var cartInput = document.getElementById('cart-input');

        cartInput.value = cash;
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
        updateCart: updateCart,
        addCash: addCash,
        removeCash: removeCash,
        addItem: addItem,
        removeItem: removeItem,
        updateItem: updateItem,
        getItemCount: getItemCount,
        getItemsSummary: getItemsSummary
    }
})();