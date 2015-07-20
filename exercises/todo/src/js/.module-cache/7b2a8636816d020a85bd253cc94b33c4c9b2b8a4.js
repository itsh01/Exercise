/**
 * Created by itaysh on 7/20/15.
 */

/** jsx React.DOM */
var MainContainer = React.createClass({displayName: "MainContainer",
    render: function () {
        return(React.createElement("h1", null, "To Do List"));
    }
});

React.render(React.createElement(MainContainer, null), document.getElementById('main-container'));