import { createSelector } from 'reselect'
import * as TYPES from '../constants/todo'
import { TODO_STATUS } from '../helper/constants'
import { todoStyleNormalize} from '../helper/animation'

const INITIAL_STATE = {
  todoList: [],
  selectedStatus: TODO_STATUS.ALL
}

const selectTodoList = state => state.todo.todoList
const selectStatus = state => state.todo.selectedStatus

export const selectFilteredTodoList = createSelector(
  selectTodoList,
  selectStatus,
  (todoList, selectStatus) => {
    const activeTodoList = selectStatus === TODO_STATUS.ALL
      ? todoList
      : todoList.filter(item => item.status === selectStatus)
    return activeTodoList.map(todoStyleNormalize)
  }
)

export default function app (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET_TODO: {
      return {
        ...state,
        todoList: action.data
      }
    }
    case TYPES.SET_SELECTED_STATUS: {
      return {
        ...state,
        selectedStatus: action.data
      }
    }
    default:
      return state
  }
}
