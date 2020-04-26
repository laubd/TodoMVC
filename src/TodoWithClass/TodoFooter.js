import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

function TodoFooter (props) {
  const { count, onClear } = props
  return <div className="todo-footer">
    <span style={{fontSize: '14px'}}>{count}个未完成</span>
    <Button type="link" className="button" onClick={onClear}>清除已完成</Button>
  </div>
}

TodoFooter.propTypes = {
  count: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired
}

export default React.memo(TodoFooter)