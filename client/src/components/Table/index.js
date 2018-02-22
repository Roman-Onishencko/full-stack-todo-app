import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody  } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import FilterCategory from './filterCategory';
import EmptyTableImg from './emptyTableImg';
import AddTaskBtn from './Buttons/addTaskBtn';
import FilterCategoriesBtn from './Buttons/filterCategoriesBtn';
import ClearTasksBtn from './Buttons/clearTasksBtn';
import NotDoneTask  from './Tasks/notDoneTask';
import DoneTask  from './Tasks/doneTask';
import NoTasksText  from './noTasksText';


export default class TasksTable extends Component {
  state = {
    filtersOpened: true,
    priority: 'all',
    category: 'day',
    taskDone: '0',
  };

  changeFiltersVisibility = () => {
    this.setState((prevState) => ({
      filtersOpened: !prevState.filtersOpened
    }));
  }

  changeFilterCriteria = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  getTaskByPriority = (priority, category, taskDone) => {
    if(priority === 'all') {
      return this.props.tasksList.
        filter(task => task.get('category') === category).
        filter(task => task.get('isDone') === Number(taskDone)).
        sort((taskA, taskB) => taskA.get("priority") - taskB.get("priority"))
    } else {
      return this.props.tasksList.
        filter(task => task.get('priority') === priority).
        filter(task => task.get('category') === category).
        filter(task => task.get('isDone') === Number(taskDone)).
        sort((taskA, taskB) => taskA.get("priority") - taskB.get("priority"))
    }
  }

  render() {
    const { tasksList } = this.props;
    const { priority, category, taskDone } = this.state;
    return (
      <Paper className="paper">
        <AddTaskBtn showTaskAddModal={this.props.showTaskAddModal} />
        <div className="table-wrapper">
          <NoTasksText />
          <Table className="table">
            <TableBody>
              {!Number(taskDone) ? 
                this.getTaskByPriority(priority, category, taskDone).map(task => 
                  <NotDoneTask
                    key={task.get('id')}
                    task={task}
                    showTaskEditModal={this.props.showTaskEditModal}
                    doneTask={this.props.doneTask}
                    deleteTask={this.props.deleteTask}
                  />)
              :
                this.getTaskByPriority(priority, category, taskDone).map(task => 
                  <DoneTask key={task.get('id')} task={task} />)
              }
            </TableBody>
          </Table>
        </div>
        <div className="buttons-container">
          <FilterCategoriesBtn filtersOpened={this.state.filtersOpened} changeFiltersVisibility={this.changeFiltersVisibility} />
          <ClearTasksBtn />
        </div>
        {this.state.filtersOpened && 
          <FilterCategory 
            priority={this.state.priority}
            category={this.state.category}
            taskDone={this.state.taskDone}
            changeFilterCriteria={this.changeFilterCriteria}
        />}
      </Paper>
    );
  }
}

TasksTable.propTypes = {
  tasksList: PropTypes.object,
};
