/**
 * Created by itaysh on 7/7/15.
 */

var ProductList = ProductList || {};


ProductList.Store = (function() {
    'use strict';

    //{
    //    "id": "55927eac85594c45b02c5963",
    //    "name": "reprehenderit",
    //    "image": "http://placehold.it/32x32",
    //    "description": "Laborum veniam aliquip mollit reprehenderit ad id. Qui mollit amet voluptate consequat eiusmod consequat aliquip mollit minim fugiat nulla laborum dolor. Incididunt laborum elit laborum ad ad reprehenderit laboris consectetur dolor officia occaecat non Lorem.\r\n",
    //    "price": "2682$",
    //    "limit": 20
    //}

    var products = ProductList.Mock,
        itemsTypes = ['default', 'onSale', 'outOfStock'];

    //base item
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

    //item on sale
    function ItemOnSale(data){
        this.data = data;
    }

    ItemOnSale.prototype = Object.create(Item.prototype);

    ItemOnSale.prototype.getDiscountPercent = function(){
        return this.data.discountPercent;
    };
    ItemOnSale.prototype.getPrice = function(){
        var originalPrice = parseInt(this.data.price, 10);
        return originalPrice - this.getDiscountPercent() / 100 * originalPrice;
    };


    function covertProductsToObjects(){
        products = products.map(function(data){
            var random = ProductList.Utils.getRandom(10);

            if (random < 7){
                return new Item(data);
            }
            else {
                data.discountPercent = ProductList.Utils.getRandom(50);
                return new ItemOnSale(data);
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