import * as TodoService from '../services/todo.service'
import * as TYPES from '../constants/todo'

function setTodoList (list) {
  return {
    type: TYPES.SET_TODO,
    data: list
  }
}

export function getTodoList () {
  return async (dispatch) => {
    const list = await TodoService.get()
    dispatch(setTodoList(list))
  }
}

export function addTodo (content, status) {
  return async (dispatch) => {
    await TodoService.create(content, status)
    await getTodoList()(dispatch)
  }
}

export function removeDoneTodo () {
  return async (dispatch) => {
    await TodoService.removeDone()
    await getTodoList()(dispatch)
  }
}

export function removeTodo (id) {
  return async (dispatch) => {
    await TodoService.remove(id)
    await getTodoList()(dispatch)
  }
}

export function updateTodo (id, data) {
  return async (dispatch) => {
    await TodoService.update(id, data)
    await getTodoList()(dispatch)
  }
}

export function setSelectedStatus (status) {
  return {
    type: TYPES.SET_SELECTED_STATUS,
    data: status
  }
}