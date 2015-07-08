/**
 * Created by itaysh on 7/7/15.
 */

var ProductList = ProductList || {};


ProductList.Store = (function() {
    'use strict';

    var products = ProductList.Mock,
        itemsTypes = ['default', 'onSale', 'outOfStock'];


    // objects

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
        getAllData: function(){
            return this.data;
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
    ItemOnSale.prototype.constructor = ItemOnSale;
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
    ItemOutOfStock.prototype.constructor = ItemOutOfStock;

    function Coupon(code){
        this.code = code;
        this.validated = false;
        this.used = false;
    }

    Coupon.prototype = {
        validate: function(code){
            this.validated = (this.code === code);
            return this;
        },
        constructor: Coupon
    };

    function CouponDiscount(code, discountPercent){
        Coupon.call(this, code);
        this.discountPercent = discountPercent;
    }
    CouponDiscount.prototype = Object.create(Coupon.prototype);
    CouponDiscount.prototype.constructor = CouponDiscount;
    CouponDiscount.prototype.apply = function(){
        if (this.validated && !this.used){
            products = products.map(convertItemToOnSale);
            ProductList.PubSub.publish("couponApplied");
            this.used = true;
            return true;
        }
        return false;
    };



    var coupons = [new CouponDiscount('123', 20)];

    // functions

    /**
     *  Convert Item to be ItemOnSale
     *
     *  item {Item} - item to convert
     */
    function convertItemToOnSale(item){
        var itemData = {};
        if (item instanceof ItemOutOfStock){
            return item;
        }
        itemData = item.getAllData();
        itemData.discountPercent = itemData.discountPercent || 0;
        itemData.discountPercent += 20;
        return new ItemOnSale(itemData);
    }

    /**
     *  Covert product item literal objects to Item objects
     */
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

    /**
     *  Get an array of Item objects
     *
     * @returns {Array} - array of Item objects
     */
    function getProducts(){
        return products;
    }


    /**
     *  Get an array of Coupon objects
     *
     * @returns {Array} - array of Coupon objects
     */
    function getCoupons(){
        return coupons;
    }



    covertProductsToObjects();

    return {
        Item: Item,
        ItemOnSale: ItemOnSale,
        ItemOutOfStock: ItemOutOfStock,
        Coupon: Coupon,
        CouponDiscount: CouponDiscount,
        getProducts: getProducts,
        getCoupons: getCoupons
    };

})();