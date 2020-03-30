import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MisPlanes from './pages/mis_planes'
import PlanEstudio from './component/plan_estudio/index'
import PlanVer from './component/plan_estudio/indexver'
// import CrearPlan from './component/crear_plan/index'
import AsignarPerfil from './pages/asignar_perfil'
import AsignarPlan from './pages/asignar_plan'
import Admin from './component/admin/index'
import Listado from './pages/listado'
import Pendientes from './pages/pendientes'
import Finalizados from './pages/finalizados'
import InformacionBasica from './pages/informacion_basica/index'
// import IndexAsignaturas from './component/asignaturas/index'
import PlanAdm from './component/admin/crear_plan/index'
import Carreras from './component/admin/carreras'
import Escuelas from './component/admin/escuelas'
import Facultades from './component/admin/facultades'
import Grados from './component/admin/grados'

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/Administrador' component={Admin} />
                    {/* <Route path='/ListAsignaturas' component={IndexAsignaturas} /> */}
                    <Route path='/AsignarPerfil' component={AsignarPerfil} />
                    <Route path='/AsignarPlan' component={AsignarPlan} />
                    <Route path='/Listado' component={Listado} />
                    <Route path='/Pendientes' component={Pendientes} />
                    {/* <Route path='/NuevoPlan' component={CrearPlan} /> */}
                    <Route path='/InformacionBasica/:id' component={InformacionBasica} />
                    <Route path='/Plan/Editar/:id' component={PlanEstudio} />
                    <Route path='/Plan/Ver/:id' component={PlanVer} />
                    <Route path='/MisPlanes' component={MisPlanes} />
                    <Route path='/CrearPlanAdm' component={PlanAdm} />
                    <Route path='/Carreras' component={Carreras} />
                    <Route path='/Escuelas' component={Escuelas} />
                    <Route path='/Facultades' component={Facultades} />
                    <Route path='/Grados' component={Grados} />
                    <Route exact path='/home' component={Finalizados} />
                </Switch>
            </div>
        </BrowserRouter>
      )
}

ReactDOM.render(<Router />, document.getElementById('home'))