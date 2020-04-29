import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Checkbox, Button, Input } from 'antd'
import { TODO_STATUS } from '../../helper/constants'

class TodoListItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentTitle: props.todo.title,
      editable: false
    }
    this.inputRef = React.createRef()
  }

  handleDone = () => {
    const { id, status } = this.props.todo
    const { ACTIVE, DONE } = TODO_STATUS
    this.props.onUpdate(id, { status: status === ACTIVE ? DONE : ACTIVE })
  }

  handleRenameTitle = () => {
    const { id, title } = this.props.todo
    const { currentTitle } = this.state
    if (title !== currentTitle) {
      this.props.onUpdate(id, { title: currentTitle })
    }
    this.resetEditable()
  }

  setEditable = () => {
    if (this.props.todo.status === TODO_STATUS.ACTIVE) {
      this.setState({ editable: true })
    }
  }

  resetEditable = () => {
    this.setState({ editable: false })
  }

  handleInputChange = e => {
    this.setState({
      currentTitle: e.target.value
    })
  }

  componentDidUpdate (prevProps, prevState) {
    // props改变更新当前input内容
    if (prevProps.todo.title !== this.props.todo.title) {
      this.setState({
        currentTitle: this.props.todo.title
      })
    }
    // 点击进入可修改状态时focus
    if (this.state.editable && prevState.editable !== this.state.editable) {
      this.inputRef.current.focus()
    }
  }

  render () {
    const { todo, onDelete, style } = this.props
    const { currentTitle, editable } = this.state
    const { status, id } = todo
    const isDone = status === TODO_STATUS.DONE
    const itemClass = classnames({
      'todo-list__item': true,
      'todo-list__item--done': isDone
    })
    return <li className={itemClass} style={style}>
      <div className="todo-list__item__main" >
        <Checkbox
          className="todo-list__checkbox"
          defaultChecked={isDone}
          onChange={this.handleDone}
        />
        {
          editable
            ? (
              <Input
                ref={this.inputRef}
                className="todo-list__item__input"
                value={currentTitle}
                onBlur={this.handleRenameTitle}
                onPressEnter={this.handleRenameTitle}
                onChange={this.handleInputChange}
              />
            )
            : <span className="todo-list__item__text" onClick={this.setEditable}>{currentTitle}</span>
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
}

TodoListItem.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.string,
    status: PropTypes.number,
    title: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  style: PropTypes.object
}

export default TodoListItem
