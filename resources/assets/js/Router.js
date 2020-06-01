import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MisPlanes from './pages/mis_planes'
import PlanEstudio from './component/plan_estudio/index'
import PlanVer from './component/plan_estudio/indexver'
// import CrearPlan from './component/crear_plan/index'
import AsignarPerfil from './pages/asignar_perfil'
import Admin from './component/admin/index'
import Listado from './pages/listado'
import Finalizados from './pages/finalizados'
import CrearPlan from './pages/crear_plan/index'
import EditarInfoBasica from './pages/editar_plan/index'
// import IndexAsignaturas from './component/asignaturas/index'



const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/Administrador' component={Admin} />
                    {/* <Route path='/ListAsignaturas' component={IndexAsignaturas} /> */}
                    <Route path='/AsignarPerfil' component={AsignarPerfil} />
                    <Route path='/Listado' component={Listado} />
                    {/* <Route path='/NuevoPlan' component={CrearPlan} /> */}
                    <Route path='/CrearPlan' component={CrearPlan} />
                    <Route path='/EditarInfoBasica/:id' component={EditarInfoBasica} />
                    <Route path='/Plan/Editar/:id' component={PlanEstudio} />
                    <Route path='/Plan/Ver/:id' component={PlanVer} />
                    <Route path='/MisPlanes' component={MisPlanes} />
                    <Route exact path='/home' component={Finalizados} />
                </Switch>
            </div>
        </BrowserRouter>
      )
}

ReactDOM.render(<Router />, document.getElementById('home'))