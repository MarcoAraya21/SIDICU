import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './component/Index'
import PlanEstudio from './component/plan_estudio/index'
import CrearPlan from './component/crear_plan/index'
import Admin from './component/admin/index'
// import IndexAsignaturas from './component/asignaturas/index'



const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/Administrador' component={Admin} />
                    {/* <Route path='/ListAsignaturas' component={IndexAsignaturas} /> */}
                    <Route path='/NuevoPlan' component={CrearPlan} />
                    <Route path='/Plan/:id' component={PlanEstudio} />
                    <Route exact path='/home' component={Index} />
                </Switch>
            </div>
        </BrowserRouter>
      )
}

ReactDOM.render(<Router />, document.getElementById('home'))