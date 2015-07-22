/**
 * Created by itaysh on 7/22/15.
 */

define(['Mock','Utils','PubSub', 'lodash'],
    function (Mock, Utils, PubSub, _) {
        'use strict';

        var products = Mock;

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
            getId: function (){
                return this.data.id;
            },
            setId: function (newValue){
                this.data.id = newValue;
                return newValue;
            },
            getName: function (){
                return this.data.name;
            },
            getPrice: function (){
                return parseInt(this.data.price, 10);
            },
            getStock: function (){
                return this.data.limit;
            },
            setStock: function (newValue){
                this.data.limit = newValue;
                return newValue;
            },
            isInStock: function (){
                return this.data.limit > 0;
            },
            getAllData: function (){
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
        ItemOnSale.prototype.getDiscountPercent = function (){
            return this.data.discountPercent;
        };
        ItemOnSale.prototype.getPrice = function (){
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
            data.limit = 0;
            Item.call(this, data);
        }
        ItemOutOfStock.prototype = Object.create(Item.prototype);
        ItemOutOfStock.prototype.constructor = ItemOutOfStock;

        /**
         * Base Coupon
         * @param code {String} - coupon code to be validated
         * @constructor {Coupon}
         */
        function Coupon(code){
            this.code = code;
            this.validated = false;
            this.used = false;
        }

        Coupon.prototype = {
            validate: function (code){
                this.validated = this.code === code;
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
        CouponDiscount.prototype.getDiscountPercent = function () {
            return this.discountPercent;
        };
        CouponDiscount.prototype.apply = function () {
            if (this.validated && !this.used){
                var self = this;
                products = products.map( function (item){
                    return convertItemToOnSale(item, self);
                });
                PubSub.publish('couponApplied', []);
                this.used = true;
                return true;
            }
            return false;
        };

        function CouponFreeItem(code, itemId) {
            Coupon.call(this, code);
            this.itemId = itemId;
        }
        CouponFreeItem.prototype = Object.create(Coupon.prototype);
        CouponFreeItem.prototype.constructor = CouponFreeItem;
        CouponFreeItem.prototype.getDiscountPercent = function () {
            return 100;
        };
        CouponFreeItem.prototype.getItemId = function () {
            return this.itemId;
        };
        CouponFreeItem.prototype.apply = function () {
            if (this.validated && !this.used) {
                var originalItem = Utils.getItemById( products, this.getItemId() ),
                    originalItemStock = originalItem.getStock(),
                    freeItem = convertItemToOnSale(originalItem, this);

                if (!originalItem.isInStock()){
                    /*eslint no-alert:0*/
                    alert('Sorry, item out of stock.');
                    return true;
                }
                originalItem.setStock(originalItemStock - 1);
                freeItem.setId( freeItem.getId() + 'F' );
                freeItem.setStock(1);
                products.unshift(freeItem);
                PubSub.publish('couponApplied', []);
                this.used = true;
                return true;
            }
            return false;
        };

        var coupons = [
            new CouponDiscount('123', 20),
            new CouponFreeItem('qwe', '55927eac85594c45b02c5963')
        ];

        // functions

        /**
         *  Convert Item to be ItemOnSale
         *
         * @param item {Item} - item to convert
         * @param coupon
         * @returns {*}
         */
        function convertItemToOnSale(item, coupon){
            var itemData = Utils.copyObject( item.getAllData() ),
                newDiscount = coupon.getDiscountPercent();

            if (item instanceof ItemOutOfStock || item.getPrice() === 0){
                return item;
            }

            itemData.discountPercent = itemData.discountPercent || 0;
            itemData.discountPercent += newDiscount;

            if (itemData.discountPercent > 100){
                itemData.discountPercent = 100;
            }

            return new ItemOnSale(itemData);
        }

        /**
         *  Covert product item literal objects to Item objects
         */
        function covertProductsToObjects() {
            products = products.map(function (data) {
                var random = Utils.getRandom(10),
                    retVal = null;

                if (random < 7) {
                    retVal = new Item(data);
                } else if (random < 9) {
                    data.discountPercent = Utils.getRandom(50);
                    retVal = new ItemOnSale(data);
                } else {
                    retVal = new ItemOutOfStock(data);
                }
                return retVal;

            });
        }

        /**
         *  Get an array of Item objects
         *
         * @returns {Array} - array of Item objects
         */
        function getProducts() {
            return products;
        }


        /**
         *  Get an array of Coupon objects
         *
         * @returns {Array} - array of Coupon objects
         */
        function getCoupons() {
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

    }
);