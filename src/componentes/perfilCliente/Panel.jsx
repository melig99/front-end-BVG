import React, {useState,useEffect}  from 'react'
import Tabla from './Tabla';
import {Formulario} from './Formulario';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Button, Modal, Accordion } from 'react-bootstrap';


export const Panel = () => {
    const [datos,setDatos] = useState({"pagina_actual":0,"cantidad_paginas":0,"datos":[]});
    const [obtenerPanel,obtenerUnicoRegistro,,,] = Peticiones();
    const [open, setOpen] = useState(false);
    const [estadoForm,setEstadoForm] = useState(false);

    const ver = async (id)=>{
        let temp = await obtenerUnicoRegistro('api/perfilCliente',id)
        console.log(temp)

    }

    useEffect(()=>{
        obtenerPanel("api/cliente",setDatos)
    },[]);

  return (
    <>
    
        <Container>
            <Row>
                <Col>
                    <Container fluid={true} id="acciones">
                        <Row>
                            <h1>Perfil Cliente</h1>
                        </Row>
                        <Row>
                            <Button variant="primary" onClick={()=>setEstadoForm(!estadoForm)}>FORMULARIO</Button>
                        </Row>
                        <br/>
                    </Container>
                </Col>

            </Row>
            <Row>
                <Container fluid={true}>

                    <Row>
                        <br/>
                        <Tabla datos={datos} ver = {(id)=> ver}/>
                    </Row>

                </Container>
            </Row>

        </Container>
        <Modal show={estadoForm} size="lg" animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
            <Modal.Header closeButton>
            <Modal.Title>Estatus del cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formulario />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=> {{setEstadoForm(!estadoForm)}}} >Cerrar</Button>
            </Modal.Footer>
        </Modal>
    </>
    
  )
}

