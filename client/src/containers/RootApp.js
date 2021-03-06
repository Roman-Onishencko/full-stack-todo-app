import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../reduxBase/actions/';
import TasksTable from '../components/Table/';
import AddModal from '../components/Modals/AddModal/';
import EditModal from '../components/Modals/EditModal/';
import ErrorBoundary from '../components/ErrorBoundary/';

class RootApp extends Component {
  static propTypes = {
    tasksReducer: PropTypes.object,
    addTask: PropTypes.func,
    createTask: PropTypes.func,
    updateTask: PropTypes.func,
    showTaskAddModal: PropTypes.func,
    showTaskEditModal: PropTypes.func,
    hideTaskModal: PropTypes.func,
    deleteTask: PropTypes.func,
    doneTask: PropTypes.func,
    clearTasksList: PropTypes.func,
    getTasks: PropTypes.func,
  }
  
  render() {
    const idsEqual = (this.props.match.params.id === localStorage.getItem('uId'));
    const userId = localStorage.getItem('uId');
    const tasksList = this.props.tasksReducer.get('tasks');
    const errorMessage = this.props.tasksReducer.get('errorMessage');
    const modalType = this.props.tasksReducer.get('modalType');
    const activeTaskId = this.props.tasksReducer.get('taskId');
    let activeTask;
    if (activeTaskId) {
      activeTask = this.props.tasksReducer.get('tasks').find(task => task.get('id') === activeTaskId);
    }
    return (
      <div className="wrapper">
        <ErrorBoundary>
          {modalType === 'addTask' &&
            <AddModal
              open
              userId={userId}
              hideTaskModal={this.props.hideTaskModal}
              createTask={this.props.createTask}
            />
          }
          {modalType === 'editTask' &&
            <EditModal
              open
              userId={userId}
              activeTask={activeTask}
              hideTaskModal={this.props.hideTaskModal}
              updateTask={this.props.updateTask}
            />
          }
          {idsEqual && 
            <TasksTable
              errorMessage={errorMessage}
              userLogin={localStorage.getItem('uLogin')}
              userId={userId}
              tasksList={tasksList}
              showTaskAddModal={this.props.showTaskAddModal}
              showTaskEditModal={this.props.showTaskEditModal}
              deleteTask={this.props.deleteTask}
              updateTask={this.props.updateTask}
              doneTask={this.props.doneTask}
              getTasks={this.props.getTasks}
              clearTasksList={this.props.clearTasksList}
            />
          }
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(
  state => ({
     tasksReducer: state.todoAppReducer
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(RootApp);