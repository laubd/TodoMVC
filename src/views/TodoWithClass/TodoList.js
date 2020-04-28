import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  TransitionMotion,
} from 'react-motion'

function TodoList (props) {
  const { list, willLeave, willEnter, ListItem, ...events } = props
  return (
    <TransitionMotion
      styles={list}
      willLeave={willLeave}
      willEnter={willEnter}
    >
      {
        styles => (
          <ul className="todo-list">
            {
              styles.map(({key, style, data}) =>
                <ListItem
                  key={key}
                  style={style}
                  todo={data}
                  {...events}
                />)
            }
          </ul>
        )
      }
    </TransitionMotion>
  )
}

TodoList.propTypes = {
  list: PropTypes.array.isRequired,
  willLeave: PropTypes.func.isRequired,
  willEnter: PropTypes.func.isRequired,
  ListItem: PropTypes.any.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
export default memo(TodoList)