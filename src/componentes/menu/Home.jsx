import React from 'react'
import { Col, Container,Row } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import MenuSuperior from './MenuSuperior'
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <>
            <Container fluid={true} className="d-flex p-0 m-0">
                <Sidebar/>
                <Container fluid={true} style={{height:"100vh"}}>
                    <Row>
                        <MenuSuperior/>
                    </Row>
                    <Row style={{overflow:"auto",height:"93%", paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px"}} >
                        <Outlet/>
                    </Row>
                </Container>
            </Container>

        </>
    )
}

export default Home
