/**
 * Created by itaysh on 7/6/15.
 */


var ProductList = ProductList || {};


ProductList.Themes = (function () {
    'use strict';

    var themes = ['default', 'black'],
        body = document.querySelector('body');


    /**
     *  Set a different theme
     *
     * @param themeName {String} - theme name to set
     */
    function changeTheme(themeName){
        if (themes.indexOf(themeName) === -1){
            return;
        }

        body.className = themeName;
    }

    function createOptionElementByTheme(theme) {
        var optionElement = document.createElement('option');
        optionElement.innerHTML = theme;
        optionElement.value = theme;
        return optionElement;
    }

    /**
     *  Create a theme changer widget
     */
    function createThemeChanger(){
        var selectElement = document.createElement('select'),
            optionElement = null;

        _(themes).forEach(function (theme){
            optionElement = createOptionElementByTheme(theme);
            selectElement.appendChild(optionElement);
        }).value();

        selectElement.className = 'theme-changer';
        selectElement.addEventListener('change', function (){
            changeTheme(this.value);
        });

        body.appendChild(selectElement);
    }

    return {
        changeTheme: changeTheme,
        createThemeChanger: createThemeChanger
    };

}());