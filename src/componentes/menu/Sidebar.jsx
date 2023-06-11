import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { CgFileDocument, CgUserList, CgCreditCard, CgCalendarDates, CgReadme, CgLock } from "react-icons/cg";
import localBD from '../../helpers/localBD';

const Sidebar = () => {
    const {obtenerMenu} = localBD();
    let tempCliente =obtenerMenu();
     console.log(tempCliente)


    return (
        <div style={{ display: 'flex', overflow: 'scroll initial'}}>
          <CDBSidebar textColor="#fff" backgroundColor="#154360">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <em className="text-decoration-none" style={{ color: 'inherit' }}>Sistema de Gestión</em>
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
              {tempCliente.map((agrupador,i)=>{
                   console.log(`navLink -> /home/menu/${agrupador.id}`)
                  return (
                      <NavLink key={`${agrupador.id}`} to={`/home/menu/${agrupador.id}`}  className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
                        <CDBSidebarMenuItem><CgFileDocument className='m-2 item'/>{agrupador.descripcion}</CDBSidebarMenuItem>
                      </NavLink>
                  )
              })}

              </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
                }}
              >
              <em>Book of Valdez Gimenez</em>
              <p><abbr><strong>B-VG</strong></abbr></p>
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
    );
};

export default Sidebar;
/*

<NavLink to="/"  className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
  <CDBSidebarMenuItem><CgFileDocument className='m-2 item'/>Documentos</CDBSidebarMenuItem>
</NavLink>
<NavLink to="/home/menu/1" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
  <CDBSidebarMenuItem ><CgUserList className='m-2 item'/>Cliente</CDBSidebarMenuItem>
</NavLink>
<NavLink to="/home/menu/2" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
  <CDBSidebarMenuItem ><CgCreditCard className='m-2 item'/>Credito</CDBSidebarMenuItem>
</NavLink>
<NavLink to="/home/menu/3" className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
  <CDBSidebarMenuItem ><CgCalendarDates className='m-2 item'/>Caja</CDBSidebarMenuItem>
</NavLink>
<NavLink to="/home/menu/4"  className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
<CDBSidebarMenuItem ><CgLock className='m-2 item'/>Seguridad</CDBSidebarMenuItem>
</NavLink>
<NavLink to="/"  className={(navData) => (navData.isActive ? "activeClicked" : 'none')}>
  <CDBSidebarMenuItem ><CgReadme className='m-2 item' />Reportes</CDBSidebarMenuItem>
</NavLink>

 */
