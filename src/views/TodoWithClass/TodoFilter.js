import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

function TodoFilter (props) {
  const { options, onClick, active } = props
  console.log('filter')
  return (
    <div className="todo-filter-bar">
      {
        options.map(({ label, status }) => {
          const isActive = active === status
          return <Button
            type={isActive ? 'primary' : 'link'}
            key={status}
            className={isActive ? '' : 'todo-filter-bar__item'}
            onClick={() => onClick(status)}
          >
            {label}
          </Button>
        })
      }
    </div>
  )
}

TodoFilter.propTypes = {
  active: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      status: PropTypes.number
    })
  )
}

export default memo(TodoFilter)