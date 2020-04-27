import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import * as TodoService from '../../services/todo.service'

import { TODO_STATUS } from '../../constants'
import TodoInputBar from '../TodoWithClass/TodoInputBar'
import TodoFilter from '../TodoWithClass/TodoFilter'
import TodoFooter from '../TodoWithClass/TodoFooter'
import HooksTodoItem from './HooksTodoItem'
import { useBind } from './util'

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
    return selectedStatus === TODO_STATUS.ALL ? todoList : todoList.filter(item => item.status === selectedStatus)
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
    <TodoFilter options={filterOptions} active={selectedStatus} onClick={setStatus}></TodoFilter>
    <div className="todo-list">
      {
        filteredList.map(item => {
          return <HooksTodoItem
            key={item.id}
            todo={item}
            onUpdate={updateTodo}
            onDelete={removeTodo}
          />
        })
      }
    </div>
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