/**
 * Created by itaysh on 7/20/15.
 */

/** jsx React.DOM */
(function () {
    'use strict';

    var MainContainer = React.createClass({
        displayName: 'Main Container',
        render: function () {
            return (
                <div>
                    <h1>To Do List</h1>
                </div>
            );
        }
    });

    React.render(<MainContainer />, document.getElementById('main-container'));

}());
