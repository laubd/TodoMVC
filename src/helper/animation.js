import {
  spring,
  presets
} from 'react-motion'

// 返回react-motion结构
export function todoStyleNormalize (todo) {
  return {
    data: todo,
    key: todo.id,
    style: {
      height: spring(48, presets.gentle),
      opacity: spring(1, presets.gentle),
      marginBottom: spring(10, presets.gentle)
    }
  }
}

export function todoWillEnter() {
  return {
    height: 0,
    opacity: 1,
    marginBottom: 0
  }
}

export function todoWillLeave() {
  return {
    height: spring(0),
    opacity: spring(0),
    marginBottom: spring(0),
    border: 0
  }
}
