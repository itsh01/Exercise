/**
 * Created by itaysh on 6/29/15.
 */

var ProductList = ProductList || {};

// Product List Namespace

ProductList.Main = (function(){
    'use strict';

    // mock items
    var products = [
        {
            "id": "55927eac85594c45b02c5963",
            "name": "reprehenderit",
            "image": "http://placehold.it/32x32",
            "description": "Laborum veniam aliquip mollit reprehenderit ad id. Qui mollit amet voluptate consequat eiusmod consequat aliquip mollit minim fugiat nulla laborum dolor. Incididunt laborum elit laborum ad ad reprehenderit laboris consectetur dolor officia occaecat non Lorem.\r\n",
            "price": "2682$",
            "limit": 20
        },
        {
            "id": "55927eacf347ad1e77801bcb",
            "name": "pariatur",
            "image": "http://placehold.it/32x32",
            "description": "Duis duis eiusmod cupidatat sint ullamco non ut. Adipisicing pariatur eu eu id amet mollit tempor eiusmod ipsum esse ad elit non. In amet cillum esse nostrud cillum anim consequat aute occaecat.\r\n",
            "price": "6667$",
            "limit": 24
        },
        {
            "id": "55927eac3fe03090e7fcf966",
            "name": "aliquip",
            "image": "http://placehold.it/32x32",
            "description": "Voluptate eiusmod id sit in adipisicing tempor ipsum. Mollit ut amet sint reprehenderit anim incididunt. Pariatur labore tempor eu magna anim exercitation ea adipisicing exercitation adipisicing id aliquip. Amet esse fugiat anim do deserunt veniam voluptate enim duis in labore aliquip est. Ut mollit ullamco veniam consectetur aute sunt sunt consequat culpa nulla tempor quis. Fugiat ut adipisicing sint dolore consequat in nisi id nostrud ipsum.\r\n",
            "price": "4339$",
            "limit": 33
        },
        {
            "id": "55927eac01cd0f1cec513a04",
            "name": "esse",
            "image": "http://placehold.it/32x32",
            "description": "Anim nulla adipisicing reprehenderit laboris sunt nostrud incididunt pariatur nostrud. Laboris consequat cupidatat sit ea exercitation duis dolor. Cillum nostrud et cupidatat laboris culpa tempor non duis eu sint dolor aliquip. Labore magna aliquip commodo magna aliqua. Dolore incididunt dolore ea dolor consectetur consectetur do consectetur cillum culpa. Adipisicing in pariatur minim occaecat.\r\n",
            "price": "584$",
            "limit": 21
        },
        {
            "id": "55927eace5869bb53af93629",
            "name": "fugiat",
            "image": "http://placehold.it/32x32",
            "description": "Anim ut ad do aliqua minim ea nostrud dolore eu laboris cupidatat incididunt. Eu cupidatat esse ex aliquip duis aliqua. Excepteur ad elit do ex occaecat aliquip elit excepteur. Adipisicing aliquip Lorem id non et et quis dolor cillum ipsum culpa do. Adipisicing et quis Lorem in eiusmod ea in cillum.\r\n",
            "price": "9763$",
            "limit": 22
        },
        {
            "id": "55927eac289234989c56e84f",
            "name": "cupidatat",
            "image": "http://placehold.it/32x32",
            "description": "Consectetur sit irure consectetur sunt adipisicing est nisi labore reprehenderit cupidatat aute ipsum. Excepteur ex tempor enim anim cupidatat ex deserunt veniam. Anim proident ut veniam occaecat amet eu ea consectetur. Sunt sunt enim eiusmod tempor anim incididunt veniam nostrud fugiat. Magna ullamco enim adipisicing pariatur incididunt eiusmod velit do.\r\n",
            "price": "9699$",
            "limit": 33
        },
        {
            "id": "55927eac18475131d0342144",
            "name": "voluptate",
            "image": "http://placehold.it/32x32",
            "description": "Tempor quis elit proident tempor ullamco adipisicing ut duis magna sunt adipisicing dolor do mollit. Exercitation eiusmod cillum id irure do. Minim pariatur commodo pariatur commodo fugiat sint est pariatur consequat id.\r\n",
            "price": "5220$",
            "limit": 27
        },
        {
            "id": "55927eacab39a216521c1e07",
            "name": "consequat",
            "image": "http://placehold.it/32x32",
            "description": "Voluptate voluptate esse non est sint reprehenderit voluptate occaecat eiusmod consequat. Velit cillum esse labore consectetur veniam sit tempor quis duis dolor laboris laboris. Qui ad culpa enim proident consequat aute anim dolor mollit laboris commodo dolor cillum ullamco. Magna ut amet non amet eiusmod nulla laboris velit voluptate. Non do dolor id aute est cupidatat tempor et. Cupidatat enim sit enim labore ipsum culpa pariatur aliqua ex ut veniam consectetur.\r\n",
            "price": "6548$",
            "limit": 33
        },
        {
            "id": "55927eacd53d3a6cf43d1da0",
            "name": "ea",
            "image": "http://placehold.it/32x32",
            "description": "Minim quis eu laboris ipsum eiusmod velit qui exercitation ad nisi consequat nulla duis nisi. Sit adipisicing cupidatat laboris aliqua velit est sint mollit sit consequat occaecat. Velit voluptate proident adipisicing aute dolore velit culpa. Sit duis esse esse est ad eu ex exercitation culpa et ullamco reprehenderit consequat aliqua. Duis mollit veniam magna non minim tempor proident in officia incididunt.\r\n",
            "price": "2538$",
            "limit": 36
        },
        {
            "id": "55927eacdd2b5dcb9374a928",
            "name": "et",
            "image": "http://placehold.it/32x32",
            "description": "Nostrud adipisicing mollit minim consequat qui ad consectetur nostrud. Et commodo consectetur commodo culpa amet proident ipsum quis dolor. Occaecat eiusmod irure ea do aute tempor. Adipisicing velit Lorem veniam qui laboris.\r\n",
            "price": "8702$",
            "limit": 35
        },
        {
            "id": "55927eac78b393c4253e91f0",
            "name": "fugiat",
            "image": "http://placehold.it/32x32",
            "description": "Ullamco et officia sit elit occaecat duis magna fugiat deserunt ipsum do enim sunt enim. Fugiat eu ad nostrud cillum eiusmod do nisi ea anim nostrud occaecat aliqua aliquip aute. Incididunt magna minim non excepteur esse deserunt quis id. Id est amet eiusmod fugiat officia culpa.\r\n",
            "price": "4765$",
            "limit": 29
        },
        {
            "id": "55927eac43f29ceed849fc79",
            "name": "labore",
            "image": "http://placehold.it/32x32",
            "description": "Veniam ipsum magna sunt sint reprehenderit. Veniam exercitation mollit non cillum anim id et laboris reprehenderit sunt ad sit amet ipsum. Sunt Lorem magna eu laborum deserunt ex elit et. Reprehenderit pariatur adipisicing amet commodo Lorem esse exercitation magna tempor ut est voluptate cupidatat aliquip. Aute nisi proident ullamco deserunt consectetur id amet.\r\n",
            "price": "7629$",
            "limit": 21
        },
        {
            "id": "55927eacf76261770dcc06d5",
            "name": "adipisicing",
            "image": "http://placehold.it/32x32",
            "description": "Reprehenderit duis id cillum proident consectetur deserunt veniam minim id dolor sunt amet. Lorem aliqua exercitation duis consequat ut aliqua esse. Aute veniam id excepteur deserunt in occaecat non anim fugiat labore.\r\n",
            "price": "5039$",
            "limit": 25
        },
        {
            "id": "55927eac6da99d0c61e5d31a",
            "name": "occaecat",
            "image": "http://placehold.it/32x32",
            "description": "Aliquip ullamco sunt qui mollit. Fugiat ad voluptate est aliqua magna eiusmod proident excepteur consequat esse. Tempor irure incididunt eiusmod veniam voluptate laboris amet. Fugiat ullamco ex sit adipisicing exercitation et. Reprehenderit amet occaecat anim aute.\r\n",
            "price": "5102$",
            "limit": 34
        },
        {
            "id": "55927eaca917aed17f9efc8d",
            "name": "excepteur",
            "image": "http://placehold.it/32x32",
            "description": "Culpa irure quis minim labore exercitation. Deserunt nostrud occaecat commodo labore occaecat culpa ea aliqua sint quis velit. Ea aliquip aliquip consectetur deserunt deserunt. Ut enim reprehenderit ipsum non elit dolore id laboris exercitation dolor ex aliqua. Anim aliquip mollit sint Lorem do excepteur officia aliquip sit ut nostrud pariatur ipsum ex. Occaecat duis commodo occaecat consequat culpa deserunt officia laborum enim. Dolore laborum fugiat dolor dolor exercitation commodo id et sunt adipisicing laboris occaecat proident.\r\n",
            "price": "1511$",
            "limit": 21
        },
        {
            "id": "55927eac644bf2c6e10d1c3f",
            "name": "consectetur",
            "image": "http://placehold.it/32x32",
            "description": "Dolor aute laborum non mollit exercitation voluptate excepteur Lorem voluptate minim occaecat. Esse dolore qui ullamco elit ex nulla sit. Reprehenderit aute ea deserunt ex aliqua velit quis. Irure voluptate incididunt minim minim nostrud duis commodo. Est velit esse tempor et exercitation nulla minim irure nostrud id occaecat.\r\n",
            "price": "8904$",
            "limit": 40
        },
        {
            "id": "55927eac23185fdc5f50bf66",
            "name": "esse",
            "image": "http://placehold.it/32x32",
            "description": "Laboris id enim ea culpa anim deserunt duis velit est magna amet reprehenderit. Amet occaecat ex voluptate eiusmod consequat nostrud non fugiat elit consequat. Ad cupidatat amet mollit nostrud sunt.\r\n",
            "price": "5737$",
            "limit": 33
        },
        {
            "id": "55927eac1f5e780e9b949a61",
            "name": "esse",
            "image": "http://placehold.it/32x32",
            "description": "Commodo ad non velit do consectetur aliquip fugiat excepteur aliqua officia minim. Occaecat consectetur do ut occaecat irure et in occaecat sunt eu qui enim consequat. Dolor ut officia consequat fugiat adipisicing aliquip incididunt quis ea duis. Ut deserunt et reprehenderit eu adipisicing. In laboris sit aliquip consequat tempor adipisicing commodo dolor est ex anim sint.\r\n",
            "price": "9265$",
            "limit": 25
        },
        {
            "id": "55927eac072e17c0b43a2234",
            "name": "enim",
            "image": "http://placehold.it/32x32",
            "description": "Eiusmod deserunt mollit est tempor laborum deserunt magna nostrud veniam aliquip magna deserunt dolor velit. Cupidatat culpa ut commodo minim incididunt. Duis occaecat eiusmod id minim duis exercitation laboris amet in aliquip eu deserunt do cupidatat.\r\n",
            "price": "7800$",
            "limit": 29
        },
        {
            "id": "55927eac5774888947ebffbf",
            "name": "cillum",
            "image": "http://placehold.it/32x32",
            "description": "Sit qui velit deserunt exercitation dolore velit dolore labore veniam non commodo eiusmod commodo. Officia do laborum amet irure qui reprehenderit. Voluptate aliquip aute voluptate cillum tempor ex reprehenderit veniam.\r\n",
            "price": "6916$",
            "limit": 21
        },
        {
            "id": "55927eac437343d3acf3cf97",
            "name": "in",
            "image": "http://placehold.it/32x32",
            "description": "Voluptate enim eu do magna qui occaecat cupidatat cillum. Incididunt do amet velit sunt fugiat. Cupidatat aute tempor consectetur cillum duis. Elit reprehenderit ullamco ad exercitation reprehenderit proident veniam adipisicing enim sunt occaecat culpa aute.\r\n",
            "price": "2479$",
            "limit": 31
        },
        {
            "id": "55927eaccf98e2897296bc38",
            "name": "officia",
            "image": "http://placehold.it/32x32",
            "description": "Officia exercitation pariatur Lorem occaecat cupidatat ex incididunt ut minim dolor sunt. Ipsum cillum deserunt sint sunt occaecat fugiat. Voluptate ex qui proident proident. Culpa officia deserunt enim dolore minim aliqua. Id id ullamco voluptate reprehenderit mollit deserunt proident magna. Veniam duis id aliqua tempor in exercitation laborum Lorem magna. Velit ex anim cupidatat consequat mollit laboris et.\r\n",
            "price": "7045$",
            "limit": 29
        },
        {
            "id": "55927eace4f7eca209e075f5",
            "name": "magna",
            "image": "http://placehold.it/32x32",
            "description": "Minim officia non laboris tempor anim laboris excepteur velit occaecat ad incididunt. Lorem esse sunt pariatur consequat dolor minim ullamco sit. Occaecat cillum et aliqua ullamco ea anim velit esse duis veniam. Cillum duis eiusmod occaecat do fugiat ut. Occaecat deserunt cupidatat adipisicing reprehenderit. In aliquip Lorem aliquip irure.\r\n",
            "price": "8033$",
            "limit": 24
        },
        {
            "id": "55927eac53c57224803d56c0",
            "name": "quis",
            "image": "http://placehold.it/32x32",
            "description": "Adipisicing nostrud pariatur fugiat dolore voluptate ad non ex. Reprehenderit reprehenderit ad velit irure laboris sit. Voluptate cillum pariatur dolor labore qui id non sint occaecat anim occaecat aliqua. Occaecat veniam veniam aliqua Lorem nulla veniam ex cillum sunt occaecat exercitation pariatur veniam adipisicing. Irure incididunt enim deserunt pariatur id occaecat in elit irure exercitation.\r\n",
            "price": "1088$",
            "limit": 35
        },
        {
            "id": "55927eac1cf8fa3fe5cdb419",
            "name": "consequat",
            "image": "http://placehold.it/32x32",
            "description": "Est ex pariatur eu veniam ea in. Labore duis officia ut enim. Cillum adipisicing ut deserunt dolor minim enim mollit velit labore laboris sit. Dolor anim duis cillum ut commodo dolore amet dolore dolore ea cillum aute nisi. Nostrud sunt enim consectetur irure sit aute consectetur ipsum in aute laboris ad mollit fugiat.\r\n",
            "price": "9778$",
            "limit": 34
        },
        {
            "id": "55927eacecfd7399a9e335c0",
            "name": "eiusmod",
            "image": "http://placehold.it/32x32",
            "description": "Voluptate esse veniam magna ea ex. Qui eiusmod proident nisi nulla ad enim aute do laboris quis ad velit qui. Pariatur id ipsum sint consequat proident culpa culpa commodo. Ut amet cillum laboris anim sit et pariatur proident. Labore in Lorem eu exercitation eu adipisicing aliqua sint voluptate esse. Enim non cillum reprehenderit consectetur. Ut dolore commodo tempor commodo deserunt.\r\n",
            "price": "5196$",
            "limit": 21
        },
        {
            "id": "55927eac078064168962fdfe",
            "name": "nostrud",
            "image": "http://placehold.it/32x32",
            "description": "Cillum dolor ex veniam sit elit aliqua minim eu sint. Nisi velit cillum tempor in velit in. Laborum aliqua magna labore velit tempor laboris ullamco aute esse sint. Exercitation et esse pariatur do ex. Culpa adipisicing ipsum enim mollit aliqua id labore nostrud. Et quis magna enim ad id ut non qui nisi reprehenderit officia occaecat labore.\r\n",
            "price": "8987$",
            "limit": 28
        },
        {
            "id": "55927eaccff653b8e5efc711",
            "name": "do",
            "image": "http://placehold.it/32x32",
            "description": "Voluptate minim enim proident eu pariatur in quis dolore veniam amet nostrud dolore. Cupidatat et consectetur labore minim mollit. Dolore laborum amet quis id ipsum quis enim amet mollit quis aliquip nostrud qui. Tempor quis in do ipsum duis est non. Deserunt magna esse anim nulla commodo ex. Duis quis nulla esse labore ipsum nulla qui velit.\r\n",
            "price": "1877$",
            "limit": 20
        }
    ];

    ///////

    var table = document.getElementById('main-table'),
        tbody = document.getElementById('products'),
        order = getOrder(table);

    /*
     *  Get items' properties display order by table header
     */
    function getOrder(table){
        var tableHeaders = table.querySelectorAll('th[data-header]'),
            tableHeaderLength = tableHeaders.length,
            itemAttributesDisplayOrder = [],
            i;

        for (i = 0; i < tableHeaderLength; i++){
            itemAttributesDisplayOrder[i] = tableHeaders[i].dataset['header'];
        }
        return itemAttributesDisplayOrder;
    }

    /*
     *  Initialize table by products list
     *  items {Object}
     */
    function init(table, items, order, isFirst){
        var i,
            numOfItemInPage = (items.length > 5) ? 5 : items.length,
            elements = document.createDocumentFragment();

        for (i = 0; i < numOfItemInPage; i++){
            elements.appendChild(
                createRowByItem( items[i], order, numOfItemInPage)
            );

        }

        table.appendChild(elements);

        if (isFirst){
            createPager(items);
            createCart();
        }

        fixRowSelections();
        fixImages();
        updateOrderInputs();
    }

    /*
     *  Create a single row by single item
     */
    function createRowByItem(item, order, numOfItems){
        var row = document.createElement('tr'),
            cell,
            i;

        for (i in order){
            cell = document.createElement('td');
            cell.innerHTML = item[ order[i] ];
            cell.className = "item-" + order[i];
            row.appendChild(cell);
        }

        row.appendChild(getOrderButtonCell(item['id']));

        createSelect(row, numOfItems);

        return row;
    }

    function getOrderButtonCell(itemId){
        var td = document.createElement('td');

        td.innerHTML = '<input type="number" disabled="disabled" data-itemid="' + itemId + '" />';
        td.innerHTML += '<button class="btn btn-primary btn-xs change-amount" data-action="-1">-</button>';
        td.innerHTML += '<button class="btn btn-primary btn-xs change-amount" data-action="1">+</button>';

        return td;
    }

    /*
     *  Create an html select on a row
     */
    function createSelect(row, numOfItems){
        var idCellElement = row.querySelector('.item-id'),
            newCellElement = document.createElement('td'),
            selectElement = document.createElement('select'),
            optionElement,
            i;

        for (i = 0; i < numOfItems; i++){
            optionElement = document.createElement('option');
            optionElement.value = i+1;
            optionElement.innerHTML = i+1;
            selectElement.appendChild(optionElement);
        }

        selectElement.setAttribute("onchange", "ProductList.Main.handleChange(this)");

        newCellElement.className = "selectOrder";
        newCellElement.appendChild(selectElement);

        row.insertBefore(newCellElement, idCellElement);
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
            inner += '<li><a href="#" onclick="ProductList.Main.moveToPage('+page+')">'+page+'</a></li>';
        }
        inner += '</ul>';

        nav.innerHTML = inner;
        document.getElementsByClassName("container")[0].appendChild(nav);
    }

    function createCart(){
        var cart = document.createElement('div');

        cart.className = "cart";

        cart.innerHTML = '<input type="number" disabled="disabled" id="cart-input" />';

        document.getElementsByClassName("container")[0].appendChild(cart);
    }

    /*
     *  Move to another page
     */
    function moveToPage(page){
        tbody.innerHTML = '';
        init(tbody, products.slice(page * 5 - 5, page * 5), order);
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

    function fixImages(){
        var imageTds = document.querySelectorAll('.item-image'),
            i = imageTds.length-1;

        for (i ; i>=0 ; i--){
            imageTds[i].innerHTML = '<img src="'+imageTds[i].innerHTML+'" />';
        }
    }

    function updateOrderInputs(){
        var inputElements = document.querySelectorAll('[data-itemid]'),
            inputIndex = inputElements.length - 1,
            itemId = "",
            itemCount = 0;

        for (inputIndex; inputIndex >= 0; inputIndex--){
            itemId = inputElements[inputIndex].dataset['itemid'];
            itemCount = parseInt( ProductList.Cart.getItemCount(itemId) );
            inputElements[inputIndex].value = itemCount;
        }

    }

    function exceedingItemLimit(addOrRemove, inputElement, item) {
        var inputElementValue = parseInt(inputElement.value),
            exceedingTopLimit = (addOrRemove > 0 && inputElementValue === item.limit),
            exceedingBottomLimit = (addOrRemove < 0 && inputElementValue === 0);

        return exceedingBottomLimit || exceedingTopLimit;
    }

    function isChangeButton(targetButtonElement) {
        return targetButtonElement.className.match('change-amount');
    }

    function getItemById(itemId) {
        return products.filter(function (item) {
            return item.id == itemId;
        }).pop();
    }

    function publishEvents(){
        table.onclick = function(e){
            var targetButtonElement = e.target,
                inputElement = null,
                item = null,
                addOrRemove = null,
                valueToAdd = 0;


            if (isChangeButton(targetButtonElement)){

                inputElement = targetButtonElement.parentElement.querySelector('[data-itemid]');
                item = getItemById(inputElement.dataset['itemid']);
                addOrRemove = parseInt(targetButtonElement.dataset['action']);
                valueToAdd = parseInt(item.price) * addOrRemove;
                inputElement.value = inputElement.value || 0;

                if (exceedingItemLimit(addOrRemove, inputElement, item)){
                    return;
                }

                ProductList.PubSub.publish("itemUpdated", [item.id, valueToAdd]);
                inputElement.value = parseInt(inputElement.value) + addOrRemove;
            }

        }
    }

    function subscribeToPubSub(){
        //ProductList.PubSub.subscribe('itemAdded', addItem);
        //ProductList.PubSub.subscribe('itemRemoved', removeItem);
    }

    subscribeToPubSub();
    publishEvents();

    init(tbody, products, order, true);

    return {
      handleChange: handleChange,
      moveToPage: moveToPage
    };

})();