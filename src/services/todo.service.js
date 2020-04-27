import shortId from 'shortid'
import { getTodoList, setTodoList } from '../storage/todo.storage'
import { TODO_STATUS } from '../helper/constants'

let data = getTodoList()

export const get = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 100)
  })
}

export const create = (todoContent, todoStatus) => {
  return new Promise(resolve => {
    data = data.concat({
      id: shortId.generate(),
      title: todoContent,
      status: todoStatus
    })
    setTodoList(data)
    resolve()
  })
}

export const update = (id, payload = {}) => {
  return new Promise(resolve => {
    data = data.map(todo => todo.id === id ? { ...todo, ...payload } : todo)
    setTodoList(data)
    resolve()
  })
}

export const remove = (id) => {
  return new Promise(resolve => {
    data = data.filter(todo => todo.id !== id)
    setTodoList(data)
    resolve()
  })
}

export const removeDone = () => {
  return new Promise(resolve => {
    data = data.filter(todo => todo.status === TODO_STATUS.ACTIVE)
    setTodoList(data)
    resolve()
  })
}