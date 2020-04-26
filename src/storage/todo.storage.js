import Storage from './storage'

const TODO_KEY = 'TODO_STORAGE'

export const setTodoList = (todoList) => {
  Storage.set(TODO_KEY, todoList)
}

export const getTodoList = () => {
  return Storage.get(TODO_KEY, [])
}