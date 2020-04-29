import React, {
  memo,
  useRef,
  useState,
  useEffect
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Input, Button, Checkbox } from 'antd'

import { useBind } from '../../helper/hooks'
import { TODO_STATUS } from '../../helper/constants'

function HooksTodoItem (props) {
  const {
    todo: { id, title, status },
    style,
    onUpdate,
    onDelete
  } = props
  const { ACTIVE, DONE } = TODO_STATUS

  const isDone = status === DONE
  const todoContent = useBind(title)
  const [ editable, setEditable ] = useState(false)
  const inputRef = useRef(null)
  const itemClass = classnames({
    'todo-list__item': true,
    'todo-list__item--done': isDone
  })

  function handleRenameTitle () {
    if (title !== todoContent.value) {
      onUpdate(id, { title: todoContent.value })
    }
    setEditable(false)
  }

  function handleDone () {
    onUpdate(id, { status: status === ACTIVE ? DONE : ACTIVE })
  }

  function editContent () {
    if (status === ACTIVE) setEditable(true)
  }

  useEffect(() => {
    if (editable) inputRef.current.focus()
  }, [editable])

  return <li className={itemClass} style={style}>
    <div className="todo-list__item__main">
      <Checkbox
        className="todo-list__checkbox"
        defaultChecked={isDone}
        onChange={handleDone}
      />
      {
        editable
          ? (
            <Input
              ref={inputRef}
              className="todo-list__item__input"
              onBlur={handleRenameTitle}
              onPressEnter={handleRenameTitle}
              {...todoContent}
            />
          )
          : <span className="todo-list__item__text" onClick={editContent}>{todoContent.value}</span>
      }
    </div>
    <Button
        type="link"
        onClick={() => onDelete(id)}
        data-testid="deleteBtn"
      >
        &times;
      </Button>
  </li>
}

HooksTodoItem.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.string,
    status: PropTypes.number,
    title: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  style: PropTypes.object
}

export default memo(HooksTodoItem)
