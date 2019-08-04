import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './component/Index'
import PlanEstudio from './component/plan_estudio/index'
import Index2 from './component/plan_estudio/index2'


class Router extends Component {
    render () {
      return (
          <BrowserRouter>
          <div>
              <Switch>
                  <Route path='/NewPlan' component={Index2} />
                  <Route path='/:id' component={PlanEstudio} />
                  <Route exact path='/' component={Index} />
              </Switch>
          </div>
          </BrowserRouter>
      )
    }
}

ReactDOM.render(<Router />, document.getElementById('home'))