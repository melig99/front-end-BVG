import React from 'react'
import { Outlet } from "react-router-dom";
import MenuSuperior from './MenuSuperior'
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <>
            <MenuSuperior/> 
            <Sidebar/>  
        </>
    )
}

export default Home