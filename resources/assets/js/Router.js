import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './component/Index'
import PlanEstudio from './component/plan_estudio/index'


class Router extends Component {
    render () {
      return (
          <BrowserRouter>
          <div>
              <Switch>
                  <Route exact path='/' component={Index} />
                  <Route path='/:id' component={PlanEstudio} />
              </Switch>
          </div>
          </BrowserRouter>
      )
    }
}

ReactDOM.render(<Router />, document.getElementById('home'))