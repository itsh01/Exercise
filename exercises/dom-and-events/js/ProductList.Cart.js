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
        items[id] += price;
        addCash(price);
    }

    function removeItem(id, price){
        items[id] = items[id] || 0;
        items[id] -= price;
        removeCash(price);
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

    function subscribeToPubSub(){
        ProductList.PubSub.subscribe('itemAdded', addItem);
        ProductList.PubSub.subscribe('itemRemoved', removeItem);
    }

    subscribeToPubSub();

    return {
        updateCart: updateCart,
        addCash: addCash,
        removeCash: removeCash,
        addItem: addItem,
        removeItem: removeItem
    }
})();