import React, { PureComponent } from 'react'
import {Input} from 'antd'

export default class TodoInputBar extends PureComponent {
  render () {
    const { value, onEnter } = this.props

    return <div>
      <Input
        className="todo-input-bar__input"
        value={value}
        onPressEnter={onEnter}
        onChange={e => this.props.onInputChange(e.target.value)}
      />
    </div>
  }
}
