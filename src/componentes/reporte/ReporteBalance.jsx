import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col, Tabs, Tab } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

export const ReporteBalance= () => {
    const URL_REPORTE = "balance/pdf"
    const [,,,,,,,base] = Peticiones();


    const llamarReporte=(e)=>{
        e.preventDefault()
        // console.log(e.target.anho.value)
        window.open(`${base}${URL_REPORTE}/${e.target.anho.value}`)
    }
    return (
        <>
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
        <Form onSubmit={llamarReporte}>
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Reporte balance</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                  <Form.Group className="mb-3" >
                    <Form.Label>Ingrese año</Form.Label>
                    <Form.Control
                      type="number"
                      id="anho"
                    />
                    </Form.Group >

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" type="submit">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </Form>
        </div>
    );
    </>
)
}
