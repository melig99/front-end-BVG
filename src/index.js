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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route index element={<Login />} />
        <Route  path='login' element={<Login/>} />
        <Route  path='home' element={<Home/>} >
          <Route index element={<Principal />} />
          <Route path='menu' element={<Menu/>} />
          <Route  path='clientes' element={<PanelCliente/>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
