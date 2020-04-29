import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import TodoFooter from '../views/TodoWithClass/TodoFooter'

afterEach(() => {
  cleanup()
})

describe('<TodoFooter/>', () => {
  test('should show prop count', () => {
    const { getByText } = render(<TodoFooter count={10} onClear={() => {}} />)
    expect(getByText('10个未完成')).toBeInTheDocument()
  })

  test('should trigger event', () => {
    const callback = jest.fn()
    const { getByText } = render(<TodoFooter count={10} onClear={callback} />)

    fireEvent.click(getByText('清除已完成'))
    expect(callback).toBeCalledTimes(1)
  })
})