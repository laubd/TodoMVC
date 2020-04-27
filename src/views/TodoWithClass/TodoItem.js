import React, { PureComponent } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Checkbox, Button, Input } from 'antd'
import { TODO_STATUS } from '../../constants'

class TodoListItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentTitle: props.option.title,
      editable: false
    }
    this.inputRef = React.createRef()
  }

  handleDone = () => {
    const { id, status } = this.props.option
    const { ACTIVE, DONE } = TODO_STATUS
    this.props.onStatusUpdate(id, status === ACTIVE ? DONE : ACTIVE)
  }

  handleRenameTitle = () => {
    const { id, title } = this.props.option
    const { currentTitle } = this.state
    if (title !== currentTitle) {
      this.props.onUpdate(id, currentTitle)
    }
    this.resetEditable()
  }

  setEditable = () => {
    if (this.props.option.status === TODO_STATUS.ACTIVE) {
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
    if (prevProps.option.title !== this.props.option.title) {
      this.setState({
        currentTitle: this.props.option.title
      })
    }
    // 点击进入可修改状态时focus
    if (this.state.editable && prevState.editable !== this.state.editable) {
      this.inputRef.current.focus()
    }
  }

  render () {
    const { option, onDelete, style } = this.props
    const { currentTitle, editable } = this.state
    const { status, id } = option
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
      <Button type="link" onClick={() => onDelete(id)}>&times;</Button>
    </li>
  }
}

TodoListItem.propTypes = {
  option: PropTypes.exact({
    id: PropTypes.string,
    status: PropTypes.number,
    title: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func,
  style: PropTypes.object
}

export default TodoListItem
