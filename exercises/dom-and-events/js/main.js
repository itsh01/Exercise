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
        tbody = document.getElementById('products'),
        order = getOrder(table);

    /*
     *  Get items' properties order by table header
     */
    function getOrder(table){
        var tableHeaders = table.querySelectorAll('th[data-header]'),
            tableHeaderLength = tableHeaders.length,
            order = [],
            i;

        for (i = 0; i < tableHeaderLength; i++){
            order[i] = tableHeaders[i].dataset['header'];
        }
        return order;
    }

    /*
     *  Initialize table by products list
     *  items {Object}
     */
    function init(table, items, order){
        var i,
            x = items.length,
            elements = document.createDocumentFragment();

        for (i = 0; i < x; i++){
            elements.appendChild(
                createTrByItem( items[i], order, x)
            );

        }

        table.appendChild(elements);
    }

    /*
     *  Create a single row by single item
     */
    function createTrByItem(item, order, numOfItems){
        var tr = document.createElement('tr'),
            select,
            td,
            i;

        for (i in order){
            td = document.createElement('td');
            td.innerHTML = item[ order[i] ];
            td.className = "item-" + order[i];
            tr.appendChild(td);
        }

        createSelect(tr, numOfItems);

        select = tr.querySelector('select');
        select.selectedIndex = item['id'] - 1;
        return tr;
    }

    /*
     *  Create an html select on a row
     */
    function createSelect(tr, numOfItems){
        var idTd = tr.querySelector('.item-id'),
            newTd = document.createElement('td'),
            select = document.createElement('select'),
            option,
            i;

        for (i = 0; i < numOfItems; i++){
            option = document.createElement('option');
            option.value = i+1;
            option.innerHTML = i+1;
            select.appendChild(option);
        }

        select.setAttribute("onchange", "ProductList.handleChange(this)");

        newTd.className = "selectOrder";
        newTd.appendChild(select);

        tr.insertBefore(newTd, idTd);
    }

    /*
     *  Handling a change in a select
     */
    function handleChange(select){
        var selectedOption = select.selectedOptions[0].value,
            trToBeMoved = select.parentElement.parentElement,
            toBeReplacedWith = document.querySelector('tr:nth-child('+selectedOption+')');

        toBeReplacedWith.parentElement.insertBefore(trToBeMoved,toBeReplacedWith.nextElementSibling);
    }

    init(tbody, products, order);

    return {
      handleChange: handleChange
    };

})();