import React from 'react';
import { Row, Form, Container, Button } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';

import Modal from 'react-bootstrap/Modal';

export const ReporteBalance = () => {
    const URL_REPORTE = "balance/pdf"
    const [, , , , , , , base] = Peticiones();


    const llamarReporte = (e) => {
        e.preventDefault()
        // console.log(e.target.anho.value)
        window.open(`${base}${URL_REPORTE}/${e.target.anho.value}`)
    }
    return (
        <>

            <Container className='align-items-center justify-content-center'>
                <br />
                <Row>
                    <div className="text-center" >
                        <h2 style={{ color: "#154360", fontSize: "35px", fontWeight: "bold", marginBottom: "20px" }}>Reporte de balance mensual</h2>
                    </div>
                </Row>
                <Row className="justify-content-center">
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                >
                    <Form onSubmit={llamarReporte}  >
                        <Modal.Dialog >
                            <Modal.Header style={{ backgroundColor: "#eaecee" }}>
                                {/* <Modal.Title>Reporte balance</Modal.Title> */}
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: "#eaecee" }}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Ingrese año<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        id="anho"
                                    />
                                </Form.Group >
                            </Modal.Body>
                            <Modal.Footer style={{ backgroundColor: "#eaecee" }}>
                                <Button variant="primary" type="submit">Generar</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Form>
                </div>
                </Row>
            </Container>

            </>
            )
}
