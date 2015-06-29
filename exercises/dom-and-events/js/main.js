/**
 * Created by itaysh on 6/29/15.
 */

ProductList = (function(){
    'use strict';

    // mock items
    var products = [
        {
            "id": 1,
            "name": "velit",
            "price": 494
        },
        {
            "id": 2,
            "name": "veniam",
            "price": 628
        },
        {
            "id": 3,
            "name": "est",
            "price": 322
        },
        {
            "id": 4,
            "name": "sunt",
            "price": 403
        },
        {
            "id": 5,
            "name": "in",
            "price": 970
        },
        {
            "id": 6,
            "name": "eiusmod",
            "price": 364
        },
        {
            "id": 7,
            "name": "ea",
            "price": 796
        },
        {
            "id": 8,
            "name": "consequat",
            "price": 191
        },
        {
            "id": 9,
            "name": "deserunt",
            "price": 469
        },
        {
            "id": 10,
            "name": "elit",
            "price": 868
        },
        {
            "id": 11,
            "name": "duis",
            "price": 700
        },
        {
            "id": 12,
            "name": "ex",
            "price": 662
        },
        {
            "id": 13,
            "name": "tempor",
            "price": 623
        },
        {
            "id": 14,
            "name": "consequat",
            "price": 222
        },
        {
            "id": 15,
            "name": "fugiat",
            "price": 573
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
    function init(table, items, order, isFirst){
        var i,
            x = (items.length > 5) ? 5 : items.length,
            elements = document.createDocumentFragment();

        for (i = 0; i < x; i++){
            elements.appendChild(
                createTrByItem( items[i], order, x)
            );

        }

        table.appendChild(elements);

        if (isFirst){
            createPager(items);
        }
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
     *  Create a page navigation
     */
    function createPager(items){
        var nav = document.createElement('nav'),
            inner = '<ul class="pagination">',
            pages = Math.ceil(items.length / 5),
            i = 0,
            page = 0;

        for(i ; i < pages; i++){
            page = i + 1;
            inner += '<li><a href="#" onclick="ProductList.moveToPage('+page+')">'+page+'</a></li>';
        }
        inner += '</ul>';

        nav.innerHTML = inner;
        document.getElementsByClassName("container")[0].appendChild(nav);
    }

    /*
     *  Move to another page
     */
    function moveToPage(page){
        tbody.innerHTML = '';
        init(tbody, products.slice(page * 5 - 5, page * 5), order);
        fixRowSelections();
    }

    /*
     *  Handling a change in a select
     */
    function handleChange(select){

        var selectedOption = parseInt(select.selectedOptions[0].value),
            tbody = document.getElementById("products"),
            trToBeMoved = tbody.removeChild(select.parentElement.parentElement),
            toBeReplacedWith;

        toBeReplacedWith = document.querySelector('tbody tr:nth-child('+(selectedOption)+')');

        if (toBeReplacedWith){
            tbody.insertBefore(trToBeMoved,toBeReplacedWith);
        }
        else {
            tbody.appendChild(trToBeMoved);
        }

        fixRowSelections();
    }

    /*
     *  Fix Selects value according to row position
     */
    function fixRowSelections(){
        var rows = document.getElementById("products").children,
            i = rows.length-1;

        for( i; i >= 0; i-- ){
           rows[i].querySelector(".selectOrder select").selectedIndex = rows[i].sectionRowIndex;
        }
    }

    init(tbody, products, order, true);

    return {
      handleChange: handleChange,
      moveToPage: moveToPage
    };

})();