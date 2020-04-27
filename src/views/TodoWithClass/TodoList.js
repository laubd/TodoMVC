import React, { memo } from 'react'
import {
  TransitionMotion,
} from 'react-motion'

function TodoList (props) {
  const { list, willLeave, willEnter } = props
  return (
    <TransitionMotion
      styles={list}
      willLeave={willLeave}
      willEnter={willEnter}
    >
      {
        styles => (
          <ul className="todo-list">
            {props.children(styles)}
          </ul>
        )
      }
    </TransitionMotion>
  )
}

export default memo(TodoList)