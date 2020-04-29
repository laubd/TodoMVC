import React, { Component, Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import './scss/main.scss'

const Todo = lazy(() => import('./views/TodoWithClass/Todo'))
const HooksTodo = lazy(() => import('./views/TodoWithHooks/HooksTodo'))
const ReduxTodo = lazy(() => import('./views/TodoWIthRedux/ReduxTodo'))

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      routes: [
        { label: 'Todo With Class', href: '/'  },
        { label: 'Todo With Hooks', href: '/hooks'  },
        { label: 'Todo With Redux', href: '/redux'  }
      ]
    }
  }
  render () {
    const { routes } = this.state
    return <Router className="container">
      <nav className="nav">
        <ul className="nav__list">
          {routes.map((route) => {
            return <li className="nav__item" key={route.href}>
              <Link to={route.href}>{route.label}</Link>
            </li>
          })}
        </ul>
      </nav>
      <h1 className="title">TODO MVC</h1>

      <Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Todo}/>
          <Route exact path="/hooks" component={HooksTodo}/>
          <Route exact path="/redux" component={ReduxTodo}/>
        </Switch>
      </Suspense>
    </Router>
  }
}

export default App;
