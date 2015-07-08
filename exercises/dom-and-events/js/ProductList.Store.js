/**
 * Created by itaysh on 7/7/15.
 */

var ProductList = ProductList || {};


ProductList.Store = (function() {
    'use strict';

    var products = ProductList.Mock,
        itemsTypes = ['default', 'onSale', 'outOfStock'];

    /**
     *  Base Item object
     * @param data {Object}
     * @constructor {Item}
     */
    function Item(data){
        this.data = data;
    }

    Item.prototype = {
        getId: function(){
            return this.data.id;
        },
        getName: function(){
            return this.data.name;
        },
        getPrice: function(){
            return parseInt(this.data.price, 10);
        },
        getStock:function(){
            return this.data.limit;
        },
        isInStock: function(){
            return this.data.limit > 0;
        },
        constructor: Item
    };

    /**
     *  Item on sale object
     * @param data {Object}
     * @constructor {ItemOnSale}
     */
    function ItemOnSale(data){
        Item.call(this, data);
    }

    ItemOnSale.prototype = Object.create(Item.prototype);
    ItemOnSale.prototype.getDiscountPercent = function(){
        return this.data.discountPercent;
    };
    ItemOnSale.prototype.getPrice = function(){
        var originalPrice = parseInt(this.data.price, 10),
            discountedPrice = originalPrice - this.getDiscountPercent() / 100 * originalPrice;

        return parseInt(discountedPrice, 10);
    };

    /**
     *  Item on sale object
     * @param data {Object}
     * @constructor {ItemOutOfStock}
     */
    function ItemOutOfStock(data){
        Item.call(this, data);
    }
    ItemOutOfStock.prototype = Object.create(Item.prototype);

    function covertProductsToObjects(){
        products = products.map(function(data){
            var random = ProductList.Utils.getRandom(10);

            if (random < 7){
                return new Item(data);
            }
            else if (random < 9){
                data.discountPercent = ProductList.Utils.getRandom(50);
                return new ItemOnSale(data);
            }
            else {
                data.limit = 0;
                return new ItemOutOfStock(data);
            }

        });
    }

    function getProducts(){
        return products;
    }

    covertProductsToObjects();

    return {
        Item: Item,
        ItemOnSale: ItemOnSale,
        getProducts: getProducts
    };

})();