/**
 * Created by itaysh on 7/20/15.
 */

/** jsx React.DOM */
(function () {
    'use strict';

    var TaskList = React.createClass({
        displayName: 'Task List',
        propTypes: {
            tasks: React.PropTypes.array
        },
        render: function (){
            var tasks = this.props.tasks.map(function (task){
                return (<li>{ task.text }</li>);
            });

            return (
                <ul className="task-list">
                    { tasks }
                </ul>
            );
        }
    });

    var MainContainer = React.createClass({
        displayName: 'Main Container',
        getInitialState: function (){
            // Mock data
            var list = [
                    {
                        text: 'Task 1'
                    },
                    {
                        text: 'Task 2'
                    }
                ];
            return {list: list};
        },
        render: function (){
            return (
                <div>
                    <h1 className="main-header">To Do List</h1>
                    <TaskList tasks={this.state.list} />
                </div>
            );
        }
    });

    React.render(<MainContainer />, document.getElementById('main-container'));

}());
