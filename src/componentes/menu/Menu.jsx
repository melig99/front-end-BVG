import React, { useState }  from 'react'
import Card from 'react-bootstrap/Card'
import {Col,Container,Row} from 'react-bootstrap';


const Menu = () => {
    const [datos,setDatos] = useState({"datos":[]});

    return (
        <>
            <Container>
                <Row>
                    <Col lg={2}>
                        <Card style={{ width: '10rem' }}>
                            <Card.Img variant="top" src="./componentes/imagen/4.jpeg" />
                            <Card.Body>
                                <Card.Title>Clientes</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg="2">
                        <Card style={{ width: '10rem' }}>
                            <Card.Img variant="top" src="./componentes/imagen/4.jpeg" />
                            <Card.Body>
                                <Card.Title>Perfil Cliente</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Menu