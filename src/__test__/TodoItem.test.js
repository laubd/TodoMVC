import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import TodoItem from '../views/TodoWithClass/TodoItem'
import HooksTodoItem from '../views/TodoWithHooks/HooksTodoItem'
import { TODO_STATUS } from '../helper/constants'
afterEach(cleanup)

function createTest (Cpt) {
  describe(`${Cpt.name}.js`, () => {
    let data = {
      id: '0912',
      title: 'test',
      status: TODO_STATUS.ACTIVE
    }

    afterEach(() => {
      data = {
        id: '0912',
        title: 'test',
        status: TODO_STATUS.ACTIVE
      }
    })

    test('should show prop\'s data', () => {
      const { getByText } = render(
        <Cpt todo={data}/>
      )

      expect(getByText('test')).toBeInTheDocument()
    })

    test('onDelete should work', () => {
      let testId
      const { container } = render(
        <Cpt
          todo={data}
          onDelete={id => {
            testId = id
          }}
        />
      )

      const btn = container.querySelector('[data-testid="deleteBtn"]')
      fireEvent.click(btn)
      expect(testId).toBe('0912')
    })

    test('can edit active todo content and blur input confirm change', async () => {
      const onUpdate = jest.fn()
      const { container } = render(
        <Cpt
          todo={data}
          onUpdate={onUpdate}
        />
      )

      // 点击显示input, 隐藏文案
      const $text = container.querySelector('.todo-list__item__text')
      expect($text).toBeInTheDocument()
      fireEvent.click($text)
      expect($text).not.toBeInTheDocument()

      const $input = container.querySelector('.todo-list__item__input')
      expect($input).toBeInTheDocument()
      expect($input.value).toBe(data.title)

      fireEvent.change($input, { target: { value: 'change input' } })
      expect($input.value).toBe('change input')
      // 通过blur更改文案
      fireEvent.blur($input)

      expect(onUpdate).toBeCalledTimes(1)
      expect(onUpdate.mock.calls[0][0]).toBe(data.id)
      expect(onUpdate.mock.calls[0][1].title).toBe('change input')

      expect($input).not.toBeInTheDocument()
      expect(container.querySelector('.todo-list__item__text').textContent).toBe('change input')
    })

    test('onDelete should work', () => {
      let testId
      const { container } = render(
        <Cpt
          todo={data}
          onDelete={id => {
            testId = id
          }}
        />
      )

      const btn = container.querySelector('[data-testid="deleteBtn"]')
      fireEvent.click(btn)
      expect(testId).toBe('0912')
    })

    test('can edit active todo content and press enter confirm change', async () => {
      const onUpdate = jest.fn()
      const { container } = render(
        <Cpt
          todo={data}
          onUpdate={onUpdate}
        />
      )

      // 点击显示input, 隐藏文案
      const $text = container.querySelector('.todo-list__item__text')
      expect($text).toBeInTheDocument()
      fireEvent.click($text)
      expect($text).not.toBeInTheDocument()

      const $input = container.querySelector('.todo-list__item__input')
      expect($input).toBeInTheDocument()
      expect($input.value).toBe(data.title)

      fireEvent.change($input, { target: { value: 'change input2' } })
      expect($input.value).toBe('change input2')
      // 通过enter更改文案
      fireEvent.keyDown($input, { key: 'Enter', keyCode: 13 })

      expect($input).not.toBeInTheDocument()
      expect(container.querySelector('.todo-list__item__text').textContent).toBe('change input2')
      expect(onUpdate).toBeCalledTimes(1)
      expect(onUpdate.mock.calls[0][0]).toBe(data.id)
      expect(onUpdate.mock.calls[0][1].title).toBe('change input2')

    })

    test('can not edit completed todo content', async () => {
      const { container } = render(
        <Cpt
          todo={{
            ...data,
            status: TODO_STATUS.DONE
          }}
        />
      )

      const $text = container.querySelector('.todo-list__item__text')
      expect($text).toBeInTheDocument()
      fireEvent.click($text)
      expect($text).toBeInTheDocument()
      expect(container.querySelector('.todo-list__item__input')).not.toBeInTheDocument()
    })

    test('should trigger update status', async () => {
      const onUpdate = jest.fn()
      const { container } = render(
        <Cpt
          todo={data}
          onUpdate={onUpdate}
        />
      )
      fireEvent.click(container.querySelector('.todo-list__checkbox'))
      expect(onUpdate).toBeCalledTimes(1)
      expect(onUpdate.mock.calls[0][0]).toBe(data.id)
      expect(onUpdate.mock.calls[0][1].status).toBe(TODO_STATUS.DONE)
    })

    test('should show completed css style', async () => {
      render(
        <Cpt
          todo={{
            ...data,
            status: TODO_STATUS.DONE
          }}
        />
      )
      expect(document.querySelector('.todo-list__item--done')).toBeInTheDocument()
    })

  })
}

createTest(TodoItem)
createTest(HooksTodoItem)