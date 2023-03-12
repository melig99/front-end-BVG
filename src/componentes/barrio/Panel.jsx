import React,{useState,useEffect} from 'react';
import Tabla from './Tabla';
import {Formulario as FormCliente} from './Formulario';
import Peticiones from '../../helpers/peticiones';
import {Col,Container,Row,Modal,Button} from 'react-bootstrap';

export const Panel = () => {
    const [estadoForm,setEstadoForm] = useState(false);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Container fluid={true} id="acciones">
                            <Row>
                                <h1>Barrios</h1>
                            </Row>
                            <Row>
                                <Col sm={4}>

                                </Col>
                                <Col sm={8} className="d-flex flex-row-reverse">
                                    <Button variant="primary" >Nuevo Barrio</Button>
                                </Col>
                            </Row>
                            <hr/>
                        </Container>
                    </Col>

                </Row>
                <Row>
                    <Container fluid={true}>
                        <Row>
                            <br/>
                            <Tabla />
                        </Row>

                    </Container>
                </Row>

            </Container>
            <Modal show={estadoForm} size="lg" animation={false} onHide={()=>setEstadoForm(!estadoForm)}>
                <Modal.Header closeButton>
                {/* <Modal.Title>Cliente </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <FormCliente almacenDatos = {guardarDatos}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setEstadoForm(!estadoForm)} >Cerrar</Button>
                    <Button variant="success"  >Guardar</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
