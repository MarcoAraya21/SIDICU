import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './component/Index'


class Router extends Component {
    render () {
      return (
          <BrowserRouter>
          <div>
              <Switch>
                  <Route exact path='/' component={Index} />
              </Switch>
          </div>
          </BrowserRouter>
      )
    }
}

ReactDOM.render(<Router />, document.getElementById('home'))