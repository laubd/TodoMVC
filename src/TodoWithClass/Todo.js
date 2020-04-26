import React, { Component } from 'react'
import memoizeOne from 'memoize-one'
import shortId from 'shortid'
import {
  spring,
  presets
} from 'react-motion'

import TodoInputBar from './TodoInputBar'
import TodoFilter from './TodoFilter'
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

import { TODO_STATUS } from '../constants'
import * as TodoService from '../services/todo.service'

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
      return activeList.map((todo, i) => {
        // 返回react-motion结构
        return {
          data: todo,
          key: todo.id,
          style: {
            height: spring(48, presets.gentle),
            opacity: spring(1, presets.gentle),
            marginBottom: spring(10, presets.gentle)
          }
        }
      })
    }
  )

  /** 未完成数量 */
  undoneItemFilter = memoizeOne(
    (list) => list.filter(item => item.status === TODO_STATUS.ACTIVE).length
  )

  updateCurrentStatus = (currentStatus) => {
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
    TodoService.create({
      id: shortId.generate(),
      title: value,
      status: TODO_STATUS.ACTIVE
    }).then(() => {
      this.getTodoList()
      this.setState({
        value: ''
      })
    })
  }

  handleItemStatusUpdate = (id, toStatus) => {
    if (!id) return
    TodoService.update(id, { status: toStatus }).then(() => this.getTodoList())
  }

  handleUpdateItem = (id, title) => {
    if (!id || !title) return
    TodoService.update(id, { title }).then(() => this.getTodoList())
  }

  handleDeleteItem = (id) => {
    if (!id) return
    TodoService.remove(id).then(() => this.getTodoList())
  }

  handleClearDone = () => {
    TodoService.removeDone().then(() => this.getTodoList())
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1,
      marginBottom: 0
    }
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
      marginBottom: spring(0),
      border: 0
    }
  }

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
        onInputChange={this.handleInputChange}
        onEnter={this.handleAddItem}
      />

      <TodoFilter
        active={currentStatus}
        options={filterOptions}
        onClick={this.updateCurrentStatus}
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
                  onStatusUpdate={this.handleItemStatusUpdate}
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
