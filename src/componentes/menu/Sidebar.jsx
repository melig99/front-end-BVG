import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBIcon,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { CgFileDocument, CgUserList, CgCreditCard, CgCalendarDates, CgReadme, CgLock } from "react-icons/cg";

const Sidebar = () => {
    return (
        <div style={{ display: 'flex', overflow: 'scroll initial'}}>
          <CDBSidebar textColor="#fff" backgroundColor="#154360">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <em className="text-decoration-none" style={{ color: 'inherit' }}>Sistema de Gestión</em>
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/" activeClassName="activeClicked">
                  <CDBSidebarMenuItem><CgFileDocument className='m-2 item'/>Documentos</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/home/clientes" activeClassName="activeClicked">
                  <CDBSidebarMenuItem ><CgUserList className='m-2 item'/>Cliente</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="activeClicked">
                  <CDBSidebarMenuItem ><CgCreditCard className='m-2 item'/>Credito</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/analytics" activeClassName="activeClicked">
                  <CDBSidebarMenuItem ><CgCalendarDates className='m-2 item'/>Caja</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                  <CDBSidebarMenuItem ><CgReadme className='m-2 item' />Reportes</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                  <CDBSidebarMenuItem ><CgLock className='m-2 item'/>Seguridad</CDBSidebarMenuItem>
                </NavLink>
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