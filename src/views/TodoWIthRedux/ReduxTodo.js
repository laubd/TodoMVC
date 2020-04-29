import React, { Component } from 'react'
import { connect } from 'react-redux'

import TodoInputBar from '../TodoWithClass/TodoInputBar'
import TodoFilter from '../TodoWithClass/TodoFilter'
import TodoList from '../TodoWithClass/TodoList'
import TodoItem from '../TodoWithClass/TodoItem'
import TodoFooter from '../TodoWithClass/TodoFooter'

import { TODO_STATUS } from '../../helper/constants'
import * as TodoActionCreator from '../../actions/todo'
import { selectFilteredTodoList, selectActiveTodoCount } from '../../reducers/todo'
import { todoWillEnter, todoWillLeave } from '../../helper/animation'

class ReduxTodo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todoContent: '',
      filterOptions: [
        { label: '全部', status: TODO_STATUS.ALL },
        { label: '已完成', status: TODO_STATUS.DONE },
        { label: '未完成', status: TODO_STATUS.ACTIVE }
      ]
    }
  }

  handleInputChange = (todoContent) => {
    this.setState({ todoContent })
  }

  handleUpdateCurrentStatus = (status) => {
    this.props.setSelectedStatus(status)
  }

  handleAddItem = () => {
    const content = this.state.todoContent.trim()
    if (content) {
      this.props.addTodo(content, TODO_STATUS.ACTIVE).then(() => {
        this.setState({ todoContent: '' })
      })
    }
  }

  handleDeleteItem = (id) => {
    this.props.removeTodo(id)
  }

  handleUpdateItem = (id, data) => {
    this.props.updateTodo(id, data)
  }

  handleClearDone = () => {
    this.props.removeDoneTodo()
  }

  componentDidMount () {
    this.props.getTodoList()
  }

  render () {
    const {
      todoContent,
      filterOptions
    } = this.state
    const {
      todoList,
      selectedStatus,
      activeTodoCount,
      filteredTodoList
    } = this.props

    return <div>
      <TodoInputBar
        value={todoContent}
        onChange={this.handleInputChange}
        onEnter={this.handleAddItem}
      />

      <TodoFilter
        active={selectedStatus}
        options={filterOptions}
        onClick={this.handleUpdateCurrentStatus}
      />

      <TodoList
        list={filteredTodoList}
        willLeave={todoWillLeave}
        willEnter={todoWillEnter}
        ListItem={TodoItem}
        onDelete={this.handleDeleteItem}
        onUpdate={this.handleUpdateItem}
      />
      {
        todoList.length
          ? <TodoFooter count={activeTodoCount} onClear={this.handleClearDone} />
          : null
      }
    </div>
  }
}

export default connect(
  (state) => {
    const { todo } = state
    return {
      todoList: todo.todoList,
      filteredTodoList: selectFilteredTodoList(state),
      activeTodoCount: selectActiveTodoCount(state),
      selectedStatus: todo.selectedStatus
    }
  },
  TodoActionCreator
)(ReduxTodo)