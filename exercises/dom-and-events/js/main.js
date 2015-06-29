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

    ///////

    var table = document.getElementById('main-table'),
        order = getOrder(table);

    function getOrder(table){
        var tableHeaders = table.querySelectorAll('th'),
            tableHeaderLength = tableHeaders.length,
            order = [],
            i;

        for (i = 0; i < tableHeaderLength; i++){
            order[i] = tableHeaders[i].dataset['header'];
        }
        return order;
    }

    /*
     * items {Object}
     */
    function init(table, items, order){
        var i,
            x = items.length,
            elements = document.createDocumentFragment();

        for (i = 0; i < x; i++){
            elements.appendChild(
                createTrByItem( items[i], order)
            );

        }
        console.log(items);
        table.appendChild(elements);
    }

    function createTrByItem(item, order){
        var tr = document.createElement('tr'),
            td,
            i;

        for (i in order){
            td = document.createElement('td');
            td.innerHTML = item[ order[i] ];
            tr.appendChild(td);
        }

        return tr;
    }

    function handleChange(){

    }

    init(table, products, order);

    return {
      handleChange: handleChange
    };

})();