import React, {useState,useEffect}  from 'react'
import Tabla from './Tabla';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Button, Collapse } from 'react-bootstrap';


export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [obtenerPanel,,,,] = Peticiones();
    const [open, setOpen] = useState(false);

    const ver = async (id)=>{
        console.log("eva el ver")
    }

    useEffect(()=>{
        obtenerPanel("api/cliente",setDatos)
    },[]);


  return (
    <Container>
        <Row>
            <Col>
                <Container fluid={true} id="acciones">
                    <Row>
                        <h1>Perfil Cliente</h1>

                    </Row>

                    <br/>
                </Container>
            </Col>

        </Row>
        <Row>
            <Container fluid={true}>

                <Row>
                    <br/>
                    <Tabla datos={datos} ver = {ver}/>
                </Row>

            </Container>
        </Row>

    </Container>
  )
}

