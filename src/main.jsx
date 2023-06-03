import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './componentes/menu/Home'
import Login from './componentes/menu/Login'
import Principal from './componentes/menu/Principal'
import Menu from './componentes/menu/Menu'
import {Panel as PanelCliente}  from './componentes/cliente/Panel'
import {Panel as PanelBarrio}  from './componentes/barrio/Panel'
import {Panel as PanelTipoPlazo}  from './componentes/tipoPlazo/Panel'
import {Panel as PanelSolicitudAgente}  from './componentes/solicitudAgente/Panel'
import {Panel as PanelSolicitudAnalista}  from './componentes/solicitudAnalista/Panel'
import {Panel as PanelSolicitudDirectorio}  from './componentes/solicitudDirectorio/Panel'
import {Panel as PanelPerfilCliente} from './componentes/perfilCliente/Panel'
import {Panel as PanelConceptosCaja} from './componentes/conceptosCaja/Panel'
import {Panel as PanelCaja} from './componentes/caja/Panel'
import {Panel as PanelAgrupador} from './componentes/agrupador/Panel'
import {Panel as PanelOpcionMenu} from './componentes/opcionMenu/Panel'
import {Panel as PanelOperacion} from './componentes/operacionesCuotas/Panel'
import {Panel as PanelUsuario} from './componentes/usuario/Panel'
import {Panel as PanelPerfil} from './componentes/perfil/Panel'
import {Panel as PanelDocumento} from './componentes/documento/Panel'
import {ReporteUsuario} from './componentes/reporte/ReporteUsuario'
import {ReporteCliente} from './componentes/reporte/ReporteCliente'
import {ReporteEstadistica} from './componentes/reporte/ReporteEstadistica'
import {ReporteBalance} from './componentes/reporte/ReporteBalance'



ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route index element={<Login />} />
        <Route  path='login' element={<Login/>} />
        <Route  path='home' element={<Home/>} >
          <Route index element={<Principal />} />
          <Route path='menu/:id' element={<Menu/>} />
          <Route  path='cliente' element={<PanelCliente/>} />
          <Route  path='barrio' element={<PanelBarrio/>} />
          <Route  path='tipoPlazo' element={<PanelTipoPlazo/>} />
          <Route  path='solicitudAgente' element={<PanelSolicitudAgente/>} />
          <Route  path='solicitudAnalista' element={<PanelSolicitudAnalista/>} />
          <Route  path='solicitudDirectorio' element={<PanelSolicitudDirectorio/>} />
          <Route  path='perfilCliente' element={<PanelPerfilCliente/>} />
          <Route  path='conceptosCaja' element={<PanelConceptosCaja/>} />
          <Route  path='caja' element={<PanelCaja/>} />
          <Route  path='agrupador' element={<PanelAgrupador/>} />
          <Route  path='opcionMenu' element={<PanelOpcionMenu/>} />
          <Route  path='operacion' element={<PanelOperacion/>} />
          <Route  path='usuario' element={<PanelUsuario/>} />
          <Route  path='perfil' element={<PanelPerfil/>} />
          <Route  path='documento' element={<PanelDocumento/>} />
          <Route  path='reporteUsuario' element={<ReporteUsuario/>} />
          <Route  path='reporteCliente' element={<ReporteCliente/>} />
          <Route  path='reporteEstadistica' element={<ReporteEstadistica/>} />
          <Route  path='reporteBalance' element={<ReporteBalance/>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
