import React, { PureComponent } from 'react'
import {
  TransitionMotion,
} from 'react-motion'

export default class TodoList extends PureComponent {
  render () {
    const { list, willLeave, willEnter } = this.props
    return (
      <TransitionMotion
        styles={list}
        willLeave={willLeave}
        willEnter={willEnter}>
          {
            styles => (
              <ul className="todo-list">
                {this.props.children(styles)}
              </ul>
            )
          }
      </TransitionMotion>
    )
  }
}