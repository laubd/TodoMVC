import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'

import TodoInputBar from '../TodoWithClass/TodoInputBar'
import TodoFilter from '../TodoWithClass/TodoFilter'
import TodoFooter from '../TodoWithClass/TodoFooter'
import TodoList from '../TodoWithClass/TodoList'
import HooksTodoItem from './HooksTodoItem'

import { useBind } from '../../helper/hooks'
import { TODO_STATUS } from '../../helper/constants'
import * as TodoService from '../../services/todo.service'
import { todoStyleNormalize, todoWillEnter, todoWillLeave } from '../../helper/animation'

function HooksTodo () {
  const [ todoList, refreshTodoList ] = useTodoList([])
  const newTodo = useBind('')
  const [ selectedStatus, setStatus ] = useState(TODO_STATUS.ALL)
  const filterOptions = useMemo(() => ([
    { label: '全部', status: TODO_STATUS.ALL },
    { label: '已完成', status: TODO_STATUS.DONE },
    { label: '未完成', status: TODO_STATUS.ACTIVE }
  ]), [])

  const filteredList = useMemo(() => {
    const list= selectedStatus === TODO_STATUS.ALL
      ? todoList
      : todoList.filter(item => item.status === selectedStatus)
    return list.map(todoStyleNormalize)
  }, [todoList, selectedStatus])

  const activeTodoCount = useMemo(() => {
    return todoList.filter(item => item.status === TODO_STATUS.ACTIVE).length
  }, [todoList])

  const createTodo = useCallback(() => {
    const { value, onChange } = newTodo
    const title = value.trim()
    if (!title) return
    TodoService.create(title, TODO_STATUS.ACTIVE).then(() => {
      refreshTodoList()
      onChange('')
    })
  }, [newTodo, refreshTodoList])

  const updateTodo = useCallback((id, option) => {
    if (id && option) {
      TodoService.update(id, option).then(refreshTodoList)
    }
  }, [refreshTodoList])

  const removeTodo = useCallback(id => {
    if (!id) return
    TodoService.remove(id).then(refreshTodoList)
  }, [refreshTodoList])

  const removeDoneTodo = useCallback(() => {
    TodoService.removeDone().then(refreshTodoList)
  }, [refreshTodoList])

  return <div>
    <TodoInputBar {...newTodo} onEnter={createTodo} />
    <TodoFilter
      options={filterOptions}
      active={selectedStatus}
      onClick={setStatus}
    />
    <TodoList
      list={filteredList}
      willLeave={todoWillLeave}
      willEnter={todoWillEnter}
      ListItem={HooksTodoItem}
      onUpdate={updateTodo}
      onDelete={removeTodo}
    />
    <TodoFooter count={activeTodoCount} onClear={removeDoneTodo}/>
  </div>
}

/**
 * 获取todo list和更新todo list
 */
function useTodoList (initValue = []) {
  const [ todoList, setTodoList ] = useState(initValue)

  const refresh = useCallback(() => {
    TodoService.get().then(setTodoList)
  }, [setTodoList])

  useEffect(() => {
    refresh()
  }, [refresh])

  return [todoList, refresh]
}

export default HooksTodo