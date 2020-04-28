import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers = (
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

const middlewares = [
  thunkMiddleware
]

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
)

export default createStore(rootReducer, enhancer)