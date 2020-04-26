import React from 'react'
import {Input} from 'antd'

function TodoInputBar (props) {
  const { value, onEnter, onChange } = props
  return <div>
    <Input
      className="todo-input-bar__input"
      value={value}
      onPressEnter={onEnter}
      onChange={e => onChange(e.target.value)}
    />
  </div>
}

export default React.memo(TodoInputBar)
