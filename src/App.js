import React, { Component } from 'react'

import Todo from './TodoWithClass/Todo'

import './scss/main.scss'

class App extends Component {
  render () {
    return <main className="container">
      <h1 className="title">TODO MVC</h1>
      <Todo/>
    </main>
  }
}

export default App;
