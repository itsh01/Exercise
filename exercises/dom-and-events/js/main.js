/**
 * Created by itaysh on 6/29/15.
 */

ProductList = (function(){
    'use strict';

    // mock items
    var products = [
        {
            "id": 1,
            "name": "tv",
            "price": 200
        },
        {
            "id": 2,
            "name": "computer",
            "price": 100
        },
        {
            "id": 3,
            "name": "phone",
            "price": 50
        },
        {
            "id": 4,
            "name": "slave",
            "price": 1000
        },
        {
            "id": 5,
            "name": "shoko",
            "price": 5
        }
    ];

    /*
     * items {Object}
     */
    function init(items){
        var i,
            x = items.length,
            elements = [];
        for (i = 0; i < x; i++){

        }
    }

    function handleChange(){

    }

    init(products);

    return {
      handleChange: handleChange
    };

})();