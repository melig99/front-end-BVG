import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
