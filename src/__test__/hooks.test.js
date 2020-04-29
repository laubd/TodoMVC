import { renderHook, act } from '@testing-library/react-hooks'
import {
  useBind
} from '../helper/hooks'

describe('useBind hook', () => {
  test('should return default value', () => {
    const { result } = renderHook(() => useBind(1))

    expect(result.current.value).toBe(1)
  })

  test('can set new string value', () => {
    const { result } = renderHook(() => useBind(''))
    act(() => {
      result.current.onChange('value')
    })
    expect(result.current.value).toBe('value')
  })

  test('can set new string value from event', () => {
    const { result } = renderHook(() => useBind(''))
    const event = {
      target: {
        value: 'event value'
      }
    }
    act(() => {
      result.current.onChange(event)
    })
    expect(result.current.value).toBe('event value')
  })
})