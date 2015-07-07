/**
 * Created by itaysh on 6/29/15.
 */

var ProductList = ProductList || {};

// Product List Namespace

ProductList.Main = (function(){
    'use strict';

    // mock items
    var products = ProductList.Mock;

    ///////

    var table = document.getElementById('main-table'),
        tableHeaders = table.querySelectorAll('[data-header]'),
        tbody = document.getElementById('products'),
        thead = document.getElementById('table-header'),
        columnsOrder = getColumnsOrder(),
        moveToPageEvent = new CustomEvent('moveToPageEvent'),
        itemsPerPage = 5,
        currentPage = 1;

    /**
     *  Get items' properties display order by table header
     *
     * @param table {Element} - DOMElement table read the display from
     * @returns {Array} - display order
     */
    function getColumnsOrder(){
        var tableHeaderLength = tableHeaders.length,
            itemAttributesDisplayOrder = [],
            i;

        for (i = 0; i < tableHeaderLength; i++){
            itemAttributesDisplayOrder[i] = tableHeaders[i].dataset['header'];
        }
        return itemAttributesDisplayOrder;
    }

    /**
     *  Update Fields on the DOM by the suitable objects
     */
    function fixTableState() {
        fixRowSelections();
        fixImages();
        updateOrderInputs();
    }

    /**
     *  Create a fragment of rows elements by items
     *
     * @param items {Array} - items to create rows by
     * @param columnsOrder {Array} - order of items' properties
     * @returns {DocumentFragment} - fragment of rows
     */
    function createTableRowElements(items, columnsOrder) {
        var i = 0,
            numOfItemInPage = (items.length > itemsPerPage) ? itemsPerPage : items.length,
            tableRowsFragment = document.createDocumentFragment();

        for (i; i < numOfItemInPage; i++) {
            tableRowsFragment.appendChild(
                createRowByItem(items[i], columnsOrder, numOfItemInPage)
            );
        }

        return tableRowsFragment;
    }

    /**
     *  Initialize table by products list
     *
     * @param tableElement {Element} - DOMElement table to add to
     * @param items {Array} - Items to display
     * @param columnsOrder {Array} - Item's properties display order
     */
    function populateTableElement(tableElement, items, columnsOrder){
        var tableRowsFragment = null;

        tableRowsFragment = createTableRowElements(items, columnsOrder);
        tableElement.appendChild(tableRowsFragment);

        fixTableState();
    }

    /**
     *  Create a single row by single item
     *
     * @param item {Object} - item to create row by
     * @param order {Array} - item's properties display oreder
     * @param numOfItems {Number} - number if items
     * @returns {Element} - DOMElement row of item
     */
    function createRowByItem(item, order, numOfItems){
        var row = document.createElement('div'),
            cell,
            i;

        row.className = "table-row";

        for (i in order){
            cell = document.createElement('div');
            cell.innerHTML = item[ order[i] ];
            cell.className = "table-cell item-" + order[i];
            row.appendChild(cell);
        }

        row.appendChild(getOrderButtonCell(item['id']));

        createSelectInRow(row, numOfItems);

        return row;
    }

    /**
     *  Create an order button with add/remove options
     *
     * @param itemId {String} - item identifier
     * @returns {Element} - DOMElement button
     */
    function getOrderButtonCell(itemId){
        var cellElement = document.createElement('div');

        cellElement.className = "table-cell";

        cellElement.innerHTML = '<input type="number" disabled="disabled" data-itemid="' + itemId + '" />';
        cellElement.innerHTML += '<button class="btn btn-primary btn-xs change-amount" data-action="-1">-</button>';
        cellElement.innerHTML += '<button class="btn btn-primary btn-xs change-amount" data-action="1">+</button>';

        return cellElement;
    }

    /**
     *  Create an html select on a row
     *
     * @param row {Element} - DOMElement row to add select element to
     * @param numOfItems {Number} - number of options where to move
     */
    function createSelectInRow(row, numOfItems){
        var idCellElement = row.querySelector('.item-id'),
            newCellElement = document.createElement('div'),
            selectElement = document.createElement('select');

        selectElement.innerHTML = createNumberOptions(1,numOfItems+1);

        selectElement.addEventListener('change', function(){
            handleChange(this);
        });

        newCellElement.className = "table-cell selectOrder";
        newCellElement.appendChild(selectElement);

        row.insertBefore(newCellElement, idCellElement);
    }

    /**
     *  Create options html string
     *
     * @param from {Number} - starting option
     * @param to {Number} - ending option
     * @returns {String} - html options string
     */
    function createNumberOptions(from, to) {
        var htmlString = '',
            i = from;

        for (i; i < to; i++) {
            htmlString += '<option value="' + i + '">' + i + '</option>';
        }

        return htmlString;
    }

    /**
     *  Attach moving to another page when clicked on pager
     *
     * @param navElement {Element} - pager nav element
     */
    function attachPagerEvent(navElement) {
        var i = 0,
            pageNum = 0,
            pageLinks = ProductList.Utils.convertToArray(navElement.querySelectorAll('[data-pagenum]')),
            anchorsLength = pageLinks.length;

        for (i; i < anchorsLength; i++) {
            pageNum = pageLinks[i].dataset['pagenum'];
            pageLinks[i].addEventListener('moveToPageEvent', moveToPage.bind(null, pageNum));
            pageLinks[i].addEventListener('click', function(){
                this.dispatchEvent(moveToPageEvent);
            });
        }
    }

    /**
     *  set num per page element state
     */
    function setNumPerPageElementState() {
        var numPerPageElement = document.getElementById('items-per-page');
        numPerPageElement.addEventListener('change', changeItemsPerPage);
        numPerPageElement.value = itemsPerPage;
    }

    /**
     *  append an element to container main element
     *
     * @param childElement {Element} - child to append
     */
    function appendToContainerElement(childElement) {
        document.getElementsByClassName("container")[0].appendChild(childElement);
    }

    /**
     *  Create a page navigation
     *
     * @param items {Array} - items to create pager by
     */
    function createPager(items){
        var navElement = document.createElement('nav'),
            lastNav,
            inner = '<ul class="pagination">',
            pages = Math.ceil(items.length / itemsPerPage),
            i = 0,
            page = 0;

        navElement.className = "pagination-container";

        for(i ; i < pages; i++){
            page = i + 1;
            inner += '<li><a href="#" data-pagenum="' + page + '">' + page + '</a></li>';
        }
        inner += '</ul><select id="items-per-page" class="per-page-selection">';
        inner += createNumberOptions(5, 11);
        inner += '</select>';

        navElement.innerHTML = inner;

        attachPagerEvent(navElement);

        lastNav = document.querySelector('.pagination-container');
        if (lastNav){
            lastNav.remove();
        }
        appendToContainerElement(navElement);
        setNumPerPageElementState();
    }

    /**
     *  Create cart total display
     */
    function createCart(){
        var cartElement = document.createElement('div');

        cartElement.className = "cart";

        cartElement.innerHTML = '<input type="number" disabled="disabled" id="cart-input" />';

        appendToContainerElement(cartElement);
    }

    /**
     *  Change num of items per page
     */
    function changeItemsPerPage(){
        itemsPerPage = parseInt(this.value, 10);
        createPager(products);
        moveToPage(1);
    }

    /**
     *  Update cart items summary display
     */
    function updateCart(){
        var cartSummaryElement = document.createElement('div'),
            lastCart,
            itemsSummary,
            inner = '',
            item,
            id;


        itemsSummary = ProductList.Cart.getItemsSummary();

        inner += '<ul>';
        for (id in itemsSummary){
            if (itemsSummary.hasOwnProperty(id) && itemsSummary[id] !== 0){
                item = ProductList.Utils.getItemById(products, id);
                inner += '<li>' + itemsSummary[id] + ' - ' + item.name + '</li>';
            }
        }
        inner += '</ul>';

        lastCart = document.getElementById('cart-summery');
        if(lastCart){
          lastCart.remove();
        }
        cartSummaryElement.innerHTML = inner;
        cartSummaryElement.setAttribute('id','cart-summery');
        cartSummaryElement.className = "items-summery";
        appendToContainerElement(cartSummaryElement);
    }

    /**
     *  Move to another page
     *
     * @param page {Number} - Page to switch to
     */
    function moveToPage(page){
        deleteElementContent(tbody);
        populateTableElement(tbody, products.slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage), columnsOrder);
        currentPage = page;
    }

    /**
     *  set innerHTML of an element to ''
     *
     * @param element {Element} - DOMElement to delete its content
     */
    function deleteElementContent(element){
        element.innerHTML = '';
    }

    /**
     *  Handling a change in a select
     *
     * @param selectElement {Object} - select input to handle its value change
     */
    function handleChange(selectElement){

        var selectedOption = parseInt(selectElement.selectedOptions[0].value, 10),
            tbody = document.getElementById("products"),
            rowToBeMoved = tbody.removeChild(selectElement.parentElement.parentElement),
            toBeReplacedWith;

        toBeReplacedWith = document.querySelector('.tbody .table-row:nth-child('+(selectedOption)+')');

        if (toBeReplacedWith){
            tbody.insertBefore(rowToBeMoved,toBeReplacedWith);
        }
        else {
            tbody.appendChild(rowToBeMoved);
        }

        fixRowSelections();
    }

    /**
     *  Fix Selects value according to row position
     */
    function fixRowSelections(){
        var rows = document.getElementById("products").children,
            rowsLength = rows.length,
            i;

        for( i = 0; i < rowsLength; i++ ){
           rows[i].querySelector(".selectOrder select").selectedIndex = i;
        }
    }

    /**
     *  Fix images display from path string to <img> tag
     */
    function fixImages(){
        var imageCells = document.querySelectorAll('.item-image'),
            i = imageCells.length-1;

        for (i ; i>=0 ; i--){
            imageCells[i].innerHTML = '<img src="'+imageCells[i].innerHTML+'" />';
        }
    }

    /**
     *  Update order input elements according to cart
     */
    function updateOrderInputs(){
        var inputElements = document.querySelectorAll('[data-itemid]'),
            inputIndex = inputElements.length - 1,
            itemId = "",
            itemCount = 0;

        for (inputIndex; inputIndex >= 0; inputIndex--){
            itemId = inputElements[inputIndex].dataset['itemid'];
            itemCount = parseInt( ProductList.Cart.getItemCount(itemId), 10 );
            inputElements[inputIndex].value = itemCount;
        }

    }

    /**
     *  Check if items' order is exceeding the limit,
     *  bottom limit is 0
     *  top limit is according to item object
     *
     * @param addOrRemove {Number} - 1 -> add flag, -1 -> remove flag
     * @param inputElement {Element} - DOMElement input to check its value
     * @param item {Object} - item object to check its limit
     * @returns {boolean} - is exceeding limit
     */
    function exceedingItemLimit(addOrRemove, inputElement, item) {
        var inputElementValue = parseInt(inputElement.value, 10),
            exceedingTopLimit = (addOrRemove > 0 && inputElementValue === item.limit),
            exceedingBottomLimit = (addOrRemove < 0 && inputElementValue === 0);

        return exceedingBottomLimit || exceedingTopLimit;
    }

    /**
     *  Check if element is a change button
     *
     * @param targetButtonElement {Element} - DOMElement to check
     * @returns {Array|{index: number, input: string}} - is a change button
     */
    function isChangeButton(targetButtonElement) {
        return targetButtonElement.className.match('change-amount');
    }

    /**
     *  Publish itemUpdate event when add/remove to cart
     */
    function attachOrderAddRemoveEvent() {

        table.addEventListener('click', function(e){
            var targetButtonElement = e.target,
                inputElement = null,
                item = null,
                addOrRemove = null;


            if (isChangeButton(targetButtonElement)) {

                inputElement = targetButtonElement.parentElement.querySelector('[data-itemid]');
                item = ProductList.Utils.getItemById(products, inputElement.dataset['itemid']);
                addOrRemove = parseInt(targetButtonElement.dataset['action'], 10);
                inputElement.value = inputElement.value || 0;

                if (exceedingItemLimit(addOrRemove, inputElement, item)) {
                    return;
                }

                ProductList.Cart.updateItem(item.id, addOrRemove);
            }

        });
    }

    /**
     *  Update current amount of ordered item in the suitable input
     *
     * @param id {String} - item id to update its input
     */
    function updateItemAmountInput(id){
        var itemAmountInputElement = document.querySelector('[data-itemid="'+id+'"]');

        itemAmountInputElement.value = ProductList.Cart.getItemCount(id);
    }

    /**
     *  Publish sort event when header is clicked
     */
    function attachSortEvent(){
        thead.addEventListener('click', function(e){
            var targetHeaderElement = e.target,
                columnHeader = targetHeaderElement.dataset["header"];

            if (columnHeader){
                ProductList.PubSub.publish('itemsSorted', [columnHeader]);
            }
        });
    }

    /**
     *  Draw table with sorted items by requested property
     *
     * @param property {String} - property to order by
     */
    function drawSortedItems(property){
        var sortedItems = ProductList.Utils.sortItemsByProperty(products, property);

        deleteElementContent(tbody);
        populateTableElement(tbody, sortedItems, columnsOrder);
        moveToPage(currentPage);
    }

    /**
     *  Subscribe events to suitable functions
     */
    function subscribeToPubSub() {
        var eventName = null,
            i = 0,
            eventFunctionList = [],
            eventFunctions = {
            'itemsSorted': [drawSortedItems],
            'itemUpdated': [updateCart, updateItemAmountInput]
        };

        for (eventName in eventFunctions){
            if (eventFunctions.hasOwnProperty(eventName)){
                eventFunctionList = eventFunctions[eventName];
                for (i=0 ; i < eventFunctionList.length; i++){
                    ProductList.PubSub.subscribe(eventName, eventFunctionList[i]);
                }
            }
        }
    }

    /**
     *  Attach events to suitable items
     */
    function attachEvents(){
        attachOrderAddRemoveEvent();
        attachSortEvent();
    }

    /**
     *  Initialize state
     */
    function init(){
        subscribeToPubSub();
        attachEvents();
        moveToPage(1);
        createPager(products);
        createCart();
        ProductList.Themes.createThemeChanger();
    }

    init();

    return {
      handleChange: handleChange,
      moveToPage: moveToPage
    };

})();