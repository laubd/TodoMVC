import React, { Component } from 'react'
import memoizeOne from 'memoize-one'

import TodoInputBar from './TodoInputBar'
import TodoFilter from './TodoFilter'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

import { TODO_STATUS } from '../../helper/constants'
import * as TodoService from '../../services/todo.service'
import { todoStyleNormalize, todoWillEnter, todoWillLeave } from '../../helper/animation'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      list: [],
      currentStatus: TODO_STATUS.ALL,
      filterOptions: [
        { label: '全部', status: TODO_STATUS.ALL },
        { label: '已完成', status: TODO_STATUS.DONE },
        { label: '未完成', status: TODO_STATUS.ACTIVE }
      ]
    }
  }

  /**
   * 使用memoization对列表缓存,
   * 并生成react-motion结构
   */
  filter = memoizeOne(
    (list, status) => {
      const activeList = status === TODO_STATUS.ALL ? list : list.filter(item => item.status === status)
      return activeList.map(todoStyleNormalize)
    }
  )

  /** 未完成数量 */
  undoneItemFilter = memoizeOne(
    (list) => list.filter(item => item.status === TODO_STATUS.ACTIVE).length
  )

  handleUpdateCurrentStatus = (currentStatus) => {
    this.setState({ currentStatus })
  }

  getTodoList = () => {
    TodoService.get().then(todoList => {
      this.setState({
        list: todoList
      })
    })
  }

  handleInputChange = (value) => {
    this.setState({ value })
  }

  handleAddItem = () => {
    let { value } = this.state
    value = value.trim()
    if (!value) return
    TodoService.create(value, TODO_STATUS.ACTIVE).then(() => {
      this.getTodoList()
      this.setState({
        value: ''
      })
    })
  }

  handleUpdateItem = (id, data) => {
    if (!id || !data) return
    TodoService.update(id, data).then(() => this.getTodoList())
  }

  handleDeleteItem = (id) => {
    if (!id) return
    TodoService.remove(id).then(() => this.getTodoList())
  }

  handleClearDone = () => {
    TodoService.removeDone().then(() => this.getTodoList())
  }

  willEnter = todoWillEnter

  willLeave = todoWillLeave

  componentDidMount () {
    this.getTodoList()
  }

  render () {
    const {
      value,
      list,
      currentStatus,
      filterOptions
    } = this.state
    const filteredList = this.filter(list, currentStatus)
    const leftActiveItems = this.undoneItemFilter(list)

    return <div>
      <TodoInputBar
        value={value}
        onChange={this.handleInputChange}
        onEnter={this.handleAddItem}
      />

      <TodoFilter
        active={currentStatus}
        options={filterOptions}
        onClick={this.handleUpdateCurrentStatus}
      />

      <TodoList
        list={filteredList}
        willLeave={this.willLeave}
        willEnter={this.willEnter}
      >
        {styles => (
          <>
            {
              styles.map(({key, style, data}) =>
                <TodoItem
                  key={key}
                  style={style}
                  option={data}
                  onDelete={this.handleDeleteItem}
                  onUpdate={this.handleUpdateItem}
                />)
            }
          </>
        )}
      </TodoList>
      {
        list.length
          ? <TodoFooter count={leftActiveItems} onClear={this.handleClearDone} />
          : null
      }
    </div>
  }
}

export default App;
