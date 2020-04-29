import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import TodoFilter from '../views/TodoWithClass/TodoFilter'
import { TODO_STATUS } from '../helper/constants'

afterEach(cleanup)

const options = [
  { label: '全部', status: TODO_STATUS.ALL },
  { label: '已完成', status: TODO_STATUS.DONE },
  { label: '未完成', status: TODO_STATUS.ACTIVE }
]

describe('<TodoFilter/>', () => {
  test('should active the second one', () => {
    const { container } = render(
      <TodoFilter
        options={options}
        active={TODO_STATUS.DONE}
      />
    )
    expect(container.querySelector('.ant-btn-primary').textContent).toEqual('已完成')
  })

  test('should active the third one', () => {
    const { container } = render(
      <TodoFilter
        options={options}
        active={TODO_STATUS.ACTIVE}
      />
    )
    expect(container.querySelector('.ant-btn-primary').textContent).toEqual('未完成')
  })

  test('onClick should work', () => {
    let changeStatus
    const cb = (status) => {
      changeStatus = status
    }
    const { getByText } = render(
      <TodoFilter
        options={options}
        onClick={cb}
      />
    )
    fireEvent.click(getByText('已完成'))
    expect(changeStatus).toEqual(TODO_STATUS.DONE)
  })
})