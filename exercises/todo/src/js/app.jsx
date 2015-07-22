/**
 * Created by itaysh on 7/20/15.
 */

/** jsx React.DOM */
(function () {
    'use strict';

    var id = 2;

    function getId(){
        id += 1;
        return id;
    }

    var TaskList = React.createClass({
        displayName: 'Task List',
        propTypes: {
            addTask: React.PropTypes.function,
            tasks: React.PropTypes.array
        },
        render: function (){
            var tasks = _.map(this.props.tasks, function (task){
                return (<li>{ task.text }</li>);
            });

            return (
                <ul className="task-list">
                    { tasks }
                    <TaskForm addTask={this.props.addTask} ref="taskForm" />
                </ul>
            );
        }
    });

    var TaskForm = React.createClass({
        displayName: 'Task Form',
        propTypes: {
            addTask: React.PropTypes.function
        },
        render: function (){
            return (
                <li>
                    <form id="task=form" onSubmit={this.props.addTask} >
                        <input placeholder="New Task" ref="newTask" type="text" />
                        <button type="submit">Save</button>
                    </form>
                </li>
            );
        }
    });

    var MainContainer = React.createClass({
        displayName: 'Main Container',
        getInitialState: function (){
            // Mock data
            var list = [
                    {
                        id: 1,
                        text: 'Task 1'
                    },
                    {
                        id: 2,
                        text: 'Task 2'
                    }
                ];

            return {list: list};
        },
        addTask: function (e){
            var list = this.state.list,
                inputRef = this.refs.taskList.refs.taskForm.refs.newTask,
                inputElement = React.findDOMNode(inputRef);

            e.preventDefault();

            list.push({
                id: getId(),
                text: inputElement.value
            });

            inputElement.value = '';
            this.setState({list: list});
        },
        render: function (){
            return (
                <div>
                    <h1 className="main-header">To Do List</h1>
                    <TaskList addTask={this.addTask} ref="taskList" tasks={this.state.list} />
                </div>
            );
        }
    });

    React.render(<MainContainer />, document.getElementById('main-container'));

}());
