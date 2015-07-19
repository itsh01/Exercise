/**
 * Created by itaysh on 7/6/15.
 */


var ProductList = ProductList || {};


ProductList.Themes = (function() {
    'use strict';

    var themes = ["black", "default"],
        currentTheme = "default",
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

        currentTheme = themeName;
        body.className = themeName;
    }

    /**
     *  Create a theme changer widget
     */
    function createThemeChanger(){
        var selectElement = document.createElement("select"),
            optionElement = null,
            i = themes.length-1;

        for (i; i>=0; i--){
            optionElement = document.createElement("option");
            optionElement.innerHTML = themes[i];
            optionElement.value = themes[i];
            selectElement.appendChild(optionElement);
        }

        selectElement.className = "theme-changer";
        selectElement.addEventListener('change', function(){
            changeTheme(this.value);
        });

        body.appendChild(selectElement);
    }

    return {
        changeTheme: changeTheme,
        createThemeChanger: createThemeChanger
    };

})();